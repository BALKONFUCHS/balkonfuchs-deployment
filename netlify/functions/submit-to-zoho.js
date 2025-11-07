const { getAccessToken } = require('./helpers/zoho-auth');

function deriveCityFromZip(zipCode) {
  if (!zipCode) {
    return null;
  }

  const zipMap = {
    '10115': 'Berlin',
    '20095': 'Hamburg',
    '80331': 'München',
    '50667': 'Köln',
    '60311': 'Frankfurt am Main',
  };

  return zipMap[zipCode] || null;
}

function calculateLeadScore(formData) {
  let score = 0;
  const contact = formData.contact || {};

  if (contact.firstName && contact.lastName && contact.email) {
    score += 20;
  }

  if (contact.phone) {
    score += 10;
  }

  if (formData.balconyType) {
    score += 15;
  }

  if (formData.calculatedArea || formData.balconyArea) {
    score += 15;
  }

  if ((formData.calculatedPrice && formData.calculatedPrice.total) || formData.budget) {
    score += 20;
  }

  if (formData.urgency === 'Sofort' || formData.urgency === 'Innerhalb 3 Monate') {
    score += 20;
  }

  if (formData.ownershipStatus === 'Eigentümer') {
    score += 10;
  }

  if (contact.newsletter) {
    score += 5;
  }

  return Math.min(score, 100);
}

function calculatePriorityRank(leadScore) {
  if (leadScore >= 80) return 'P1 - Hot Lead (sofort kontaktieren)';
  if (leadScore >= 60) return 'P2 - Warm Lead (innerhalb 24h)';
  if (leadScore >= 40) return 'P3 - Qualified Lead (diese Woche)';
  return 'P4 - Cold Lead (Follow-up später)';
}

function calculateLeadCategory(formData, leadScore) {
  if (formData.funnelType === 'Partner-Anfrage') {
    return 'Partner-Anfrage';
  }

  if (leadScore >= 70 && (formData.budget || formData.calculatedPrice?.total)) {
    return 'Kaufbereit';
  }

  if (leadScore >= 50 && formData.balconyType) {
    return 'Konkrete Planung';
  }

  return 'Informationssucher';
}

exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  try {
    const body = JSON.parse(event.body || '{}');
    console.log('Received form data:', JSON.stringify(body, null, 2));

    const formData = body.formData || body || {};
    const calculatedPrice = body.calculatedPrice || formData.calculatedPrice || body.priceCalculation || null;
    const calculatedArea = body.calculatedArea || formData.calculatedArea || formData.balconyArea || body.calculatedArea || null;
    const funnelType = body.funnelType || formData.funnelType || body.funnel?.type || 'Balkon-Kalkulator';

    let leadScoreValue = null;
    if (typeof body.leadScore === 'number') {
      leadScoreValue = body.leadScore;
    } else if (body.leadScore && typeof body.leadScore === 'object') {
      leadScoreValue = body.leadScore.totalScore ?? body.leadScore.finalScore ?? null;
    }

    if (leadScoreValue == null) {
      leadScoreValue = body._internalScoring?.leadScore ??
        body._internalScoring?.finalScore ??
        body._partnerScoring?.finalScore ??
        body._kalkulatorScoring?.finalScore ??
        null;
    }

    const leadScore = typeof leadScoreValue === 'number' ? leadScoreValue : calculateLeadScore(formData);
    const priorityRank = calculatePriorityRank(leadScore);
    const leadCategory = calculateLeadCategory({ ...formData, funnelType }, leadScore);

    console.log('Calculated metrics:', { leadScore, priorityRank, leadCategory });

    const contact = formData.contact || formData.contactPerson || {};
    const companyName = formData.company?.name || formData.companyName || body.company?.name || null;

    const standardFields = {
      Salutation: contact.salutation || null,
      First_Name: contact.firstName || null,
      Last_Name: contact.lastName || null,
      Email: contact.email || null,
      Phone: contact.phone || null,
      Zip_Code: contact.zipCode || null,
      City: contact.city || deriveCityFromZip(contact.zipCode) || null,
      Company: companyName || null,
      Lead_Source: funnelType || 'Balkon-Kalkulator',
    };

    const customFields = {
      Score_lead: leadScore || 0,
      Rating: leadCategory || null,
      Lead_Status: priorityRank || null,
      Balkontyp: formData.balconyType || null,
      Squaremeter_Projekt: calculatedArea || null,
      kalkulierte_Summe_Projekt: calculatedPrice?.total || calculatedPrice?.finalPrice || body.estimatedPrice || body.calculation || null,
      Funnel_Typ: funnelType || null,
      Balkonbrief_angefordert: Boolean(contact.newsletter),
      Balkonbreite: formData.size?.width || formData.balconyWidth || null,
      Balkontiefe: formData.size?.depth || formData.balconyDepth || null,
      Bauweise_Balkon: formData.constructionMethod || null,
      Geschosshoehe: formData.floorHeight || null,
      Dringlichkeit: formData.urgency || null,
      Budget: formData.budget || formData.customerBudget || null,
      Immobilientyp: formData.propertyType || null,
      Eigentumsverhaeltnis: formData.ownershipStatus || null,
      Baugenehmigung_erforderlich: formData.permitRequired ?? formData.permitNeeded ?? null,
      Gebaeudetyp: formData.buildingType || null,
      Datenschutz_akzeptiert: Boolean(contact.privacy),
    };

    const leadPayload = {
      data: [
        {
          ...standardFields,
          ...customFields,
        },
      ],
    };

    console.log('Payload for Zoho CRM:', JSON.stringify(leadPayload, null, 2));

    const accessToken = await getAccessToken();
    const apiDomain = process.env.ZOHO_API_DOMAIN || 'https://www.zohoapis.eu';

    const zohoResponse = await fetch(`${apiDomain}/crm/v6/Leads`, {
      method: 'POST',
      headers: {
        Authorization: `Zoho-oauthtoken ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(leadPayload),
    });

    const zohoData = await zohoResponse.json();
    console.log('Zoho CRM response:', JSON.stringify(zohoData, null, 2));

    if (!zohoResponse.ok) {
      throw new Error(`Zoho API error: ${JSON.stringify(zohoData)}`);
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Lead erfolgreich in Zoho CRM erstellt',
        leadId: zohoData.data?.[0]?.details?.id,
        leadScore,
        priorityRank,
        leadCategory,
      }),
    };
  } catch (error) {
    console.error('Error in submit-to-zoho function:', error);

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        error: 'Fehler beim Senden an Zoho CRM',
        details: error.message,
      }),
    };
  }
};

