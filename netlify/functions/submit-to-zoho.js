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

// === MAPPING FUNCTIONS FÜR PLANER-FUNNEL ===

function mapBalconyType(value) {
  const mapping = {
    'standing': 'Vorstellbalkon',
    'hanging': 'Hängebalkon',
    'leaning': 'Anlehnbalkon',
    'terrace': 'Hochterrasse'
  };
  return mapping[value] || value;
}

function mapFloorHeight(value) {
  const mapping = {
    'ground': 'Erdgeschoss',
    'first': '1. OG',
    'second': '2. OG',
    'third': '3. OG',
    'fourth_plus': '4+ OG'
  };
  return mapping[value] || value;
}

function mapBudget(value) {
  const mapping = {
    'under_10k': 'Unter 10.000€',
    '10_20k': '10.000€ - 20.000€',
    '20_30k': '20.000€ - 30.000€',
    '30_50k': '30.000€ - 50.000€',
    'over_50k': 'Über 50.000€',
    'flexible': 'Flexibel'
  };
  return mapping[value] || value;
}

function mapOwnership(value) {
  const mapping = {
    'owner': 'Eigentümer',
    'tenant': 'Mieter',
    'manager': 'Verwalter',
    'developer': 'Bauträger'
  };
  return mapping[value] || value;
}

function mapTimeframe(value) {
  const mapping = {
    'asap': 'Sofort',
    '3_months': 'Innerhalb 3 Monate',
    '6_months': 'Innerhalb 6 Monate',
    '12_months': 'Innerhalb 12 Monate',
    'flexible': 'Noch offen'
  };
  return mapping[value] || value;
}

function mapWallMaterial(value) {
  const mapping = {
    'masonry': 'Mauerwerk',
    'concrete': 'Beton',
    'wood': 'Holz',
    'steel': 'Stahl'
  };
  return mapping[value] || value;
}

function mapFloorMaterial(value) {
  const mapping = {
    'wood': 'Holz',
    'wpc': 'WPC',
    'tiles': 'Fliesen',
    'concrete': 'Beton'
  };
  return mapping[value] || value;
}

function mapRailingType(value) {
  const mapping = {
    'bars': 'Stab',
    'glass': 'Glas',
    'wood': 'Holz',
    'combined': 'Kombiniert'
  };
  return mapping[value] || value;
}

function mapProjectStatus(value) {
  const mapping = {
    'idea': 'Erste Idee',
    'planning': 'Planung läuft',
    'ready': 'Bereit zum Bauen'
  };
  return mapping[value] || value;
}

function calculateAreaFromSize(sizeObj) {
  if (!sizeObj) return null;

  const width = parseFloat(sizeObj.width);
  const depth = parseFloat(sizeObj.depth);

  if (Number.isNaN(width) || Number.isNaN(depth)) return null;

  return Math.round((width * depth) * 100) / 100;
}

function calculateLeadScore(requestData) {
  let score = 0;

  const contact = requestData.contact || {};
  const funnelData = requestData.funnelData || {};

  if (contact.firstName && contact.lastName && contact.email) {
    score += 20;
  }

  if (contact.phone) {
    score += 10;
  }

  if (funnelData.balconyType || requestData.balconyType) {
    score += 15;
  }

  if (funnelData.size || requestData.calculatedArea || requestData.balconyArea) {
    score += 15;
  }

  if (funnelData.budget || requestData.calculatedPrice?.total || requestData.budget) {
    score += 20;
  }

  if (funnelData.timeframe === 'asap' || requestData.urgency === 'Sofort') {
    score += 20;
  }

  if (funnelData.ownership === 'owner' || requestData.ownershipStatus === 'Eigentümer') {
    score += 10;
  }

  if (funnelData.balconyCount && funnelData.balconyCount > 1) {
    score += 5;
  }

  if (Array.isArray(funnelData.documents) && funnelData.documents.length > 0) {
    score += 5;
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

function calculateLeadCategory(requestData, leadScore) {
  if (requestData.funnelType === 'Partner-Anfrage') {
    return 'Partner-Anfrage';
  }

  if (leadScore >= 70 && (requestData.budget || requestData.calculatedPrice?.total || requestData.funnelData?.budget)) {
    return 'Kaufbereit';
  }

  if (leadScore >= 50 && (requestData.balconyType || requestData.funnelData?.balconyType)) {
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

    const rawFormData = body.formData || {};
    const requestData = { ...body, ...rawFormData };

    // Stelle sicher, dass wichtige Eigenschaften vorhanden sind
    requestData.funnelData = requestData.funnelData || body.funnelData || rawFormData.funnelData || {};
    requestData.calculatedPrice = requestData.calculatedPrice || body.calculatedPrice || rawFormData.calculatedPrice || null;
    requestData.calculatedArea = requestData.calculatedArea || body.calculatedArea || rawFormData.calculatedArea || null;
    if (!requestData.contact && requestData.contactPerson) {
      requestData.contact = requestData.contactPerson;
    }

    const funnelType = requestData.funnelType || requestData.funnel?.type || body.funnelType || rawFormData.funnelType || 'Balkon-Kalkulator';
    requestData.funnelType = funnelType;

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

    const leadScore = typeof leadScoreValue === 'number' ? leadScoreValue : calculateLeadScore(requestData);
    const priorityRank = calculatePriorityRank(leadScore);
    const leadCategory = calculateLeadCategory(requestData, leadScore);

    console.log('Calculated metrics:', { leadScore, priorityRank, leadCategory });

    const contact = requestData.contact || {};
    const funnelData = requestData.funnelData || {};
    const companyName = requestData.company?.name || requestData.companyName || body.company?.name || null;

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

    const widthFromSize = parseFloat(funnelData.size?.width ?? requestData.size?.width ?? requestData.balconyWidth);
    const depthFromSize = parseFloat(funnelData.size?.depth ?? requestData.size?.depth ?? requestData.balconyDepth);

    const customFields = {
      Score_lead: leadScore,
      Rating: leadCategory,
      Lead_Status: priorityRank,
      Balkontyp: mapBalconyType(funnelData.balconyType || requestData.balconyType || null),
      Squaremeter_Projekt:
        calculateAreaFromSize(funnelData.size) ||
        calculateAreaFromSize(requestData.size) ||
        requestData.calculatedArea ||
        requestData.balconyArea ||
        null,
      kalkulierte_Summe_Projekt:
        requestData.calculatedPrice?.total ||
        requestData.calculatedPrice?.finalPrice ||
        requestData.estimatedPrice ||
        null,
      Funnel_Typ: requestData.funnelType || null,
      Balkonbrief_angefordert: Boolean(requestData.contact?.newsletter),
      Balkonbreite: Number.isFinite(widthFromSize) ? widthFromSize : null,
      Balkontiefe: Number.isFinite(depthFromSize) ? depthFromSize : null,
      Bauweise_Balkon:
        mapWallMaterial(funnelData.wallMaterial) ||
        requestData.constructionMethod ||
        null,
      Geschosshoehe:
        mapFloorHeight(funnelData.floor) ||
        requestData.floorHeight ||
        null,
      Dringlichkeit:
        mapTimeframe(funnelData.timeframe) ||
        requestData.urgency ||
        null,
      Budget:
        mapBudget(funnelData.budget) ||
        requestData.budget ||
        requestData.customerBudget ||
        null,
      Immobilientyp: requestData.propertyType || null,
      Eigentumsverhaeltnis:
        mapOwnership(funnelData.ownership) ||
        requestData.ownershipStatus ||
        null,
      Baugenehmigung_erforderlich:
        requestData.permitRequired ||
        requestData.permitNeeded ||
        null,
      Gebaeudetyp: requestData.buildingType || null,
      Datenschutz_akzeptiert: Boolean(requestData.contact?.privacy),
      Boden_Projekt: mapFloorMaterial(funnelData.balconyFloor) || null,
      Anzahl_Balkone: funnelData.balconyCount || requestData.balconyCount || null,
      railing_Projekt: mapRailingType(funnelData.railing) || null,
      Bis_wann_Timeline: mapProjectStatus(funnelData.projectStatus) || null,
      Projektbeschreibung: funnelData.additionalInfo || requestData.additionalInfo || null
    };

    console.log('🔍 Field Mapping Debug:', {
      balconyType: {
        raw: funnelData.balconyType,
        mapped: customFields.Balkontyp
      },
      area: {
        sizeObj: funnelData.size,
        calculated: customFields.Squaremeter_Projekt
      },
      dimensions: {
        width: customFields.Balkonbreite,
        depth: customFields.Balkontiefe
      },
      floor: {
        raw: funnelData.floor,
        mapped: customFields.Geschosshoehe
      },
      budget: {
        raw: funnelData.budget,
        mapped: customFields.Budget
      },
      ownership: {
        raw: funnelData.ownership,
        mapped: customFields.Eigentumsverhaeltnis
      }
    });

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

