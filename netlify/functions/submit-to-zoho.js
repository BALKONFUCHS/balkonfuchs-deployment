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
    '10k': 'Unter 10.000€',
    'bis_10k': 'Unter 10.000€',
    '20_30k': '20.000€ - 30.000€',
    '30_50k': '30.000€ - 50.000€',
    'over_50k': 'Über 50.000€',
    'flexible': 'Flexibel'
  };
  return mapping[value] || value;
}

function mapBudgetToNumeric(value) {
  if (!value) return null;
  const mapping = {
    'under_10k': 9000,
    '10_20k': 15000,
    '10k': 9000,
    'bis_10k': 9000,
    '20_30k': 25000,
    '30_50k': 40000,
    'over_50k': 60000,
    '30k_plus': 40000
  };
  if (mapping.hasOwnProperty(value)) {
    return mapping[value];
  }
  const numeric = parseFloat(String(value).replace(/[^0-9.,]/g, '').replace(',', '.'));
  return Number.isFinite(numeric) ? numeric : null;
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
    '3months': 'Innerhalb 3 Monate',
    '6_months': 'Innerhalb 6 Monate',
    '6months': 'Innerhalb 6 Monate',
    '12_months': 'Innerhalb 12 Monate',
    '12months': 'Innerhalb 12 Monate',
    'flexible': 'Noch offen'
  };
  return mapping[value] || value;
}

function mapWallMaterial(value) {
  const mapping = {
    'masonry': 'Mauerwerk',
    'concrete': 'Beton',
    'hlz': 'Hochlochziegel',
    'wood_frame': 'Holzständer',
    'wood': 'Holz',
    'steel': 'Stahl',
    'unknown': 'Unbekannt'
  };
  return mapping[value] || value;
}

function mapStructureMaterial(value) {
  const mapping = {
    'aluminium': 'Aluminium',
    'aluminum': 'Aluminium',
    'steel': 'Stahl',
    'wood': 'Holz',
    'flexible': 'Egal / Empfehlung gewünscht'
  };
  return mapping[value] || value;
}

function mapFloorMaterial(value) {
  const mapping = {
    'wood': 'Holz',
    'wpc': 'WPC',
    'tiles': 'Fliesen',
    'concrete': 'Beton',
    'aluminum': 'Aluminium'
  };
  return mapping[value] || value;
}

function mapRailingType(value) {
  const mapping = {
    'bars': 'Stab',
    'glass': 'Glas',
    'wood': 'Holz',
    'combined': 'Kombiniert',
    'closed': 'Geschlossen'
  };
  return mapping[value] || value;
}

function mapProjectStatus(value) {
  const mapping = {
    'idea': 'Erste Idee',
    'planning': 'Planung läuft',
    'ready': 'Bereit zum Bauen',
    'feasibility': 'Machbarkeit prüfen'
  };
  return mapping[value] || value;
}

function mapInsulationStatus(value) {
  const mapping = {
    'existing': 'Vorhanden',
    'planned': 'Geplant',
    'none': 'Keine Dämmung'
  };
  return mapping[value] || value;
}

function mapBalconyDoorStatus(value) {
  const mapping = {
    'existing': 'Ja, vorhanden',
    'required': 'Nein – erforderlich',
    'provided': 'Bauseitig'
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

function mapDringlichkeitLabel(value) {
  const mapping = {
    'asap': 'Sofort',
    '3months': 'Innerhalb 3 Monate',
    '3_months': 'Innerhalb 3 Monate',
    '6months': 'Innerhalb 6 Monate',
    '6_months': 'Innerhalb 6 Monate',
    '12months': 'Innerhalb 12 Monate',
    '12_months': 'Innerhalb 12 Monate',
    'flexible': 'Noch offen'
  };
  return mapping[value] || mapTimeframe(value) || value;
}

function mapOfferRegion(value) {
  const mapping = {
    local: 'Regional',
    regional: 'Regional',
    overregional: 'Überregional',
    bundesweit: 'Bundesweit',
    national: 'Bundesweit'
  };
  return mapping[value] || value;
}

function mapGewerbeBalconyTypes(values) {
  if (!Array.isArray(values) || values.length === 0) return null;

  const mapping = {
    anbaubalkon: 'Anbaubalkon',
    vorstellbalkon: 'Vorstellbalkon',
    haengebalkon: 'Hängebalkon',
    franzoesisch: 'Französischer Balkon',
    französisch: 'Französischer Balkon',
    loggia: 'Loggia',
    andere: 'Individuelle Lösung',
    individuell: 'Individuelle Lösung'
  };

  const unique = [...new Set(values)]
    .map(value => {
      if (typeof value !== 'string') return null;
      const trimmed = value.trim();
      if (!trimmed) return null;
      const key = trimmed.toLowerCase();
      return mapping[key] || trimmed;
    })
    .filter(Boolean);

  return unique.length ? unique.join(', ') : null;
}

const MONTH_LABELS = {
  '01': 'Januar',
  '02': 'Februar',
  '03': 'März',
  '04': 'April',
  '05': 'Mai',
  '06': 'Juni',
  '07': 'Juli',
  '08': 'August',
  '09': 'September',
  '10': 'Oktober',
  '11': 'November',
  '12': 'Dezember',
};

function mapMonthLabel(value) {
  const sanitized = sanitizeString(value);
  if (!sanitized) return null;
  const key = sanitized.padStart(2, '0');
  return MONTH_LABELS[key] || sanitized;
}

function formatMonthYear(monthValue, yearValue) {
  const monthLabel = mapMonthLabel(monthValue);
  const yearLabel = sanitizeString(yearValue);
  if (!yearLabel) return null;
  return monthLabel ? `${monthLabel} ${yearLabel}` : `${sanitizeString(monthValue) || ''} ${yearLabel}`.trim() || null;
}

function sanitizeString(value) {
  if (typeof value !== 'string') return value ?? null;
  const trimmed = value.trim();
  return trimmed.length ? trimmed : null;
}

function splitName(fullName) {
  if (typeof fullName !== 'string') {
    return { firstName: null, lastName: null };
  }
  const parts = fullName
    .split(/[,\s]+/)
    .map(part => part.trim())
    .filter(Boolean);

  if (!parts.length) {
    return { firstName: null, lastName: null };
  }

  if (parts.length === 1) {
    return { firstName: parts[0], lastName: null };
  }

  const firstName = parts.shift();
  const lastName = parts.join(' ') || null;

  return { firstName, lastName };
}

function truthy(...values) {
  return values.some(value => {
    if (typeof value === 'string') {
      const normalized = value.trim().toLowerCase();
      return ['true', 'yes', 'ja', '1', 'on'].includes(normalized);
    }
    return Boolean(value);
  });
}

function normalizeFunnelData(funnelWrapper) {
  if (!funnelWrapper || typeof funnelWrapper !== 'object') {
    return {};
  }

  const nested = (typeof funnelWrapper.funnelData === 'object' && funnelWrapper.funnelData !== null)
    ? funnelWrapper.funnelData
    : {};

  const metaKeys = new Set([
    'contact',
    'company',
    'extendedCompany',
    'leadScore',
    'lead_score',
    'leadscore',
    'funnel',
    'funnelType',
    'timestamp',
    'source',
    'estimatedPrice',
    'estimated_price',
  ]);

  const normalized = { ...nested };

  for (const [key, value] of Object.entries(funnelWrapper)) {
    if (key === 'funnelData') continue;
    if (metaKeys.has(key)) continue;
    normalized[key] = value;
  }

  return normalized;
}

function mapFunnelLabel(type, fallbackLabel) {
  if (fallbackLabel && typeof fallbackLabel === 'string') {
    const label = fallbackLabel.trim();
    if (label.length) {
      return label;
    }
  }

  if (!type) {
    return 'Balkon-Kalkulator';
  }

  const normalizedType = String(type).trim().toLowerCase();
  const mapping = {
    planer: 'Planer',
    'balkonbau planer': 'Planer',
    planungsfunnel: 'Planer',
    genehmigung: 'Genehmigungscheck',
    genehmigungscheck: 'Genehmigungscheck',
    kalkulator: 'Balkon-Kalkulator',
    konfigurator: 'Konfigurator',
    express: 'Express-Angebot',
    expressangebot: 'Express-Angebot',
    partner: 'Partner Funnel',
    'partner-anfrage': 'Partner Funnel',
    gewerbe: 'Gewerbeprojekte',
    'gewerbeprojekte funnel': 'Gewerbeprojekte',
    kontakt: 'Kontaktformular',
  };

  return mapping[normalizedType] || type;
}

function formatDemolitionList(values = []) {
  if (!Array.isArray(values) || values.length === 0) return null;

  const mapping = {
    'none': 'Nein',
    'balcony': 'Balkon',
    'railing': 'Geländer',
    'bruestung': 'Brüstung',
    'heater': 'Heizkörper',
    'window': 'Fenster',
    'fence': 'Gartenzaun',
    'tree': 'Baum',
    'shrub': 'Strauch'
  };

  const cleaned = [...new Set(values)].map(item => mapping[item] || item).filter(Boolean);
  return cleaned.length ? cleaned.join(', ') : null;
}

function formatDocumentsList(values = []) {
  if (!Array.isArray(values) || values.length === 0) return null;

  const mapping = {
    'floorplan': 'Grundriss',
    'structural': 'Statik',
    'permit': 'Genehmigung',
    'planning': 'Planungsunterlagen',
    'none': 'Keine Unterlagen'
  };

  const translated = [...new Set(values)].map(item => mapping[item] || item).filter(Boolean);
  return translated.length ? translated.join(', ') : null;
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

    const funnelWrapper = requestData.funnelData || {};

    if (!requestData.contact && funnelWrapper.contact) {
      requestData.contact = funnelWrapper.contact;
    }
    if (!requestData.contact && funnelWrapper.kontakt) {
      requestData.contact = funnelWrapper.kontakt;
    }

    if (!requestData.company && funnelWrapper.company) {
      requestData.company = funnelWrapper.company;
    }
    if (!requestData.company && funnelWrapper.unternehmen) {
      requestData.company = funnelWrapper.unternehmen;
    }
    if (!requestData.extendedCompany && funnelWrapper.extendedCompany) {
      requestData.extendedCompany = funnelWrapper.extendedCompany;
    }

    if (requestData.estimatedPrice == null && funnelWrapper.estimatedPrice != null) {
      requestData.estimatedPrice = funnelWrapper.estimatedPrice;
    }
    if (requestData.estimatedPrice == null && funnelWrapper.estimated_price != null) {
      requestData.estimatedPrice = funnelWrapper.estimated_price;
    }

    if (!requestData.funnel && funnelWrapper.funnel) {
      requestData.funnel = funnelWrapper.funnel;
    }

    const normalizedFunnelData = normalizeFunnelData(funnelWrapper);
    requestData.funnelData = normalizedFunnelData;

    const funnelType = requestData.funnelType ||
      requestData.funnel?.type ||
      body.funnelType ||
      rawFormData.funnelType ||
      funnelWrapper.funnelType ||
      'Balkon-Kalkulator';
    requestData.funnelType = funnelType;
    const normalizedFunnelType = String(funnelType || '').trim().toLowerCase();

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
        requestData.leadScore?.totalScore ??
        requestData.leadScore?.finalScore ??
        requestData.leadScore?.score ??
        funnelWrapper.leadScore?.totalScore ??
        funnelWrapper.leadScore?.finalScore ??
        funnelWrapper.leadScore?.score ??
        funnelWrapper.lead_score?.totalScore ??
        funnelWrapper.lead_score?.finalScore ??
        funnelWrapper.lead_score?.score ??
        null;
    }

    const leadScore = typeof leadScoreValue === 'number' ? leadScoreValue : calculateLeadScore(requestData);
    const priorityRank = calculatePriorityRank(leadScore);
    const leadCategory = calculateLeadCategory(requestData, leadScore);

    console.log('Calculated metrics:', { leadScore, priorityRank, leadCategory });

    const contact = requestData.contact || {};
    const funnelData = requestData.funnelData || {};
    const companyObject = typeof requestData.company === 'string' ? null : requestData.company;
    const companyNameRaw = requestData.companyName ||
      (companyObject && companyObject.name) ||
      (typeof requestData.company === 'string' ? requestData.company : null) ||
      body.company?.name ||
      null;
    const companyName = sanitizeString(companyNameRaw);
    const contactZipRaw = contact.zipCode || requestData.zipCode || funnelData.zipCode || funnelWrapper.zipCode || null;
    const contactZip = sanitizeString(contactZipRaw);
    const companyAddress = sanitizeString(
      contact.address ||
      companyObject?.address ||
      requestData.address ||
      funnelData.companyAddress ||
      funnelWrapper.companyAddress
    );

    const contactCity = sanitizeString(
      contact.city ||
      requestData.city ||
      funnelData.city ||
      funnelWrapper.city
    ) || deriveCityFromZip(contactZip);

    const nameCandidates = [
      contact.fullName,
      contact.name,
      requestData.fullName,
      requestData.contactName,
      requestData.ansprechpartner,
      requestData.extendedCompany?.ansprechpartner,
      funnelWrapper.extendedCompany?.ansprechpartner,
      funnelWrapper.contact?.fullName,
      funnelWrapper.contact?.name,
      requestData.company?.ansprechpartner,
      funnelWrapper.ansprechpartner,
    ];

    let sanitizedFirstName = sanitizeString(contact.firstName);
    let sanitizedLastName = sanitizeString(contact.lastName);

    for (const candidate of nameCandidates) {
      if (sanitizedFirstName && sanitizedLastName) break;
      const { firstName, lastName } = splitName(candidate);
      if (!sanitizedFirstName && firstName) {
        sanitizedFirstName = firstName;
      }
      if (!sanitizedLastName && lastName) {
        sanitizedLastName = lastName;
      }
    }

    const leadSourceLabel = mapFunnelLabel(funnelType, requestData.funnel?.name || requestData.funnelName || funnelWrapper.funnel?.name);
    const newsletterOptIn = truthy(
      contact.newsletter,
      contact.newsletterOptIn,
      requestData.newsletter,
      requestData.subscribeNewsletter,
      requestData.balkonbrief,
      funnelWrapper.balkonbrief,
      funnelWrapper.newsletter,
      funnelWrapper.contact?.newsletter,
      funnelData.newsletter,
      funnelData.balkonbrief
    );

    const privacyAccepted = truthy(
      contact.privacy,
      contact.datenschutz,
      contact.disclaimer,
      contact.agb,
      requestData.datenschutz,
      requestData.privacy,
      requestData.disclaimer,
      requestData.agb,
      funnelWrapper.datenschutz,
      funnelWrapper.privacy,
      funnelWrapper.disclaimer,
      funnelWrapper.agb,
      funnelData.datenschutz,
      funnelData.privacy,
      funnelData.disclaimer,
      funnelData.agb
    );

    if (!sanitizedLastName) {
      console.warn('⚠️ Last name missing, defaulting to "Unbekannt" for Zoho payload.');
      sanitizedLastName = 'Unbekannt';
    }

    const standardFields = {
      Salutation: sanitizeString(contact.salutation),
      First_Name: sanitizedFirstName || null,
      Last_Name: sanitizedLastName,
      Email: sanitizeString(contact.email),
      Phone: sanitizeString(contact.phone),
      Zip_Code: contactZip,
      City: contactCity,
      Street: companyAddress,
      Company: companyName || null,
      Lead_Source: leadSourceLabel || 'Balkon-Kalkulator',
    };

    const widthFromSize = parseFloat(funnelData.size?.width ?? requestData.size?.width ?? requestData.balconyWidth);
    const depthFromSize = parseFloat(funnelData.size?.depth ?? requestData.size?.depth ?? requestData.balconyDepth);
    const finalArea =
      calculateAreaFromSize(funnelData.size) ||
      calculateAreaFromSize(requestData.size) ||
      requestData.calculatedArea ||
      requestData.balconyArea ||
      requestData._planerScoring?.mappedData?.balkongroesse_qm ||
      null;

    const finalPrice =
      requestData.calculatedPrice?.total ||
      requestData.calculatedPrice?.finalPrice ||
      requestData.estimatedPrice ||
      requestData._planerScoring?.estimatedValue ||
      null;

    const budgetRaw = funnelData.budget || requestData.budget || requestData.customerBudget;
    const budgetLabel = mapBudget(budgetRaw) || requestData.budget || requestData.customerBudget || null;
    const budgetNumeric = Number.isFinite(finalPrice) ? finalPrice : mapBudgetToNumeric(budgetRaw);
    const finalAreaText = finalArea != null ? String(finalArea) : null;

    const offerCount = funnelData.offerPreferences?.count ?? requestData.offerPreferences?.count;
    const offerRegion = funnelData.offerPreferences?.region ?? requestData.offerPreferences?.region;
    const documentsRaw = Array.isArray(funnelData.documents)
      ? funnelData.documents
      : Array.isArray(requestData.documents)
        ? requestData.documents
        : [];
    const documentsText = formatDocumentsList(documentsRaw);
    const combinedDescription = [
      funnelData.additionalInfo || requestData.additionalInfo || null,
      funnelData.nachricht || requestData.nachricht || null,
      documentsText ? `Dokumente: ${documentsText}` : null
    ]
      .filter(Boolean)
      .join('\n');
    const demolitionText = formatDemolitionList(funnelData.demolition || requestData.demolition);
    const structureMaterialText = mapStructureMaterial(funnelData.structureMaterial || requestData.structureMaterial);
    const wallMaterialText = mapWallMaterial(funnelData.wallMaterial || requestData.wallMaterial);
    const insulationText = mapInsulationStatus(funnelData.insulation || requestData.insulation);
    const balconyDoorText = mapBalconyDoorStatus(funnelData.balconyDoor || requestData.balconyDoor);
    const gewerbeBalconyTypesText = mapGewerbeBalconyTypes(funnelData.balkontyp || requestData.balkontyp);

    const customFields = {
      Score_lead: leadScore,
      Rating: leadCategory,
      Lead_Status: priorityRank,
      Balkontyp: mapBalconyType(funnelData.balconyType || requestData.balconyType || null),
      Squaremeter_Projekt: finalAreaText,
      kalkulierte_Summe_Projekt: finalPrice,
      Funnel_Typ: leadSourceLabel || requestData.funnelType || null,
      Balkonbrief_angefordert: newsletterOptIn,
      Balkonbreite: Number.isFinite(widthFromSize) ? widthFromSize : null,
      Balkontiefe: Number.isFinite(depthFromSize) ? depthFromSize : null,
      Bauweise_Balkon: structureMaterialText || null,
      Material_Wand: wallMaterialText || null,
      Insulation_Projekt: insulationText || null,
      Balkontuer: balconyDoorText || null,
      Geschosshoehe:
        mapFloorHeight(funnelData.floor) ||
        mapFloorHeight(requestData.floor) ||
        null,
      Dringlichkeit:
        mapDringlichkeitLabel(funnelData.timeframe) ||
        requestData.urgency ||
        null,
      Budget: budgetNumeric,
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
      Datenschutz_akzeptiert: privacyAccepted,
      Boden_Projekt: mapFloorMaterial(funnelData.balconyFloor) || null,
      Anzahl_Balkone: funnelData.balconyCount || requestData.balconyCount || null,
      railing_Projekt: mapRailingType(funnelData.railing) || null,
      Bis_wann_Timeline: mapProjectStatus(funnelData.projectStatus) || null,
      Projektbeschreibung: combinedDescription || null,
      Angebote_von: mapOfferRegion(offerRegion) || null,
      Anzahl_Anbieter: offerCount ? Number.parseInt(offerCount, 10) || null : null,
      Rueckbau: demolitionText,
      Unterlagen: documentsText
    };

    const gewerbeAnzahlEinheiten = sanitizeString(funnelData.anzahlEinheiten || requestData.anzahlEinheiten);
    if (!customFields.Anzahl_Balkone && gewerbeAnzahlEinheiten) {
      customFields.Anzahl_Balkone = gewerbeAnzahlEinheiten;
    }

    if (normalizedFunnelType === 'gewerbe' || normalizedFunnelType === 'gewerbeprojekte funnel') {
      const projektname = sanitizeString(funnelData.projektname || requestData.projektname);
      const projektort = sanitizeString(funnelData.projektort || requestData.projektort);
      const projektadresse = sanitizeString(funnelData.projektadresse || requestData.projektadresse);
      const gebaeudetyp = sanitizeString(funnelData.projekttyp || requestData.projekttyp);
      const zeitrahmenRange = sanitizeString(funnelData.zeitrahmen || requestData.zeitrahmen);
      const budgetRange = sanitizeString(funnelData.budgetrahmen || requestData.budgetrahmen);
      const exaktesBudget = sanitizeString(funnelData.budgetFreitext || requestData.budgetFreitext);
      const startTermin = formatMonthYear(
        funnelData.startMonat || requestData.startMonat,
        funnelData.startJahr || requestData.startJahr
      );
      const endTermin = formatMonthYear(
        funnelData.endMonat || requestData.endMonat,
        funnelData.endJahr || requestData.endJahr
      );
      const ansprechpartner = sanitizeString(
        funnelData.ansprechpartner ||
        requestData.ansprechpartner ||
        requestData.extendedCompany?.ansprechpartner ||
        funnelWrapper.extendedCompany?.ansprechpartner
      );
      const projektleiter = sanitizeString(
        funnelData.projektleiter ||
        requestData.projektleiter ||
        requestData.extendedCompany?.projektleiter ||
        funnelWrapper.extendedCompany?.projektleiter
      );
      const position = sanitizeString(
        funnelData.position ||
        requestData.position ||
        requestData.extendedCompany?.position ||
        funnelWrapper.extendedCompany?.position
      );
      const unternehmensnameFunnel = sanitizeString(
        funnelData.firmenname ||
        requestData.firmenname ||
        requestData.companyName
      );
      const rechtsform = sanitizeString(
        companyObject?.legalForm ||
        funnelData.legalForm ||
        requestData.legalForm ||
        funnelWrapper.legalForm
      );
      const mitarbeiterzahl = sanitizeString(
        companyObject?.employeeCount ||
        funnelData.employeeCount ||
        requestData.employeeCount ||
        funnelWrapper.employeeCount
      );
      const projektMessage = sanitizeString(funnelData.nachricht || requestData.nachricht);
      const projektAdresseText = projektadresse || sanitizeString(companyObject?.address);

      Object.assign(customFields, {
        Projektname: projektname,
        Projektort: projektort,
        Projektadresse: projektAdresseText,
        Gebaeudetyp: gebaeudetyp,
        Anzahl_Wohnungen: gewerbeAnzahlEinheiten,
        Balkontyp_Details: gewerbeBalconyTypesText,
        Budget_Range: budgetRange,
        Exaktes_Budget: exaktesBudget,
        Zeitraum_Range: zeitrahmenRange,
        Exakter_Starttermin: startTermin,
        Exakter_Endtermin: endTermin,
        Unternehmensname: companyName || unternehmensnameFunnel,
        Ansprechpartner: ansprechpartner,
        Projektleiter: projektleiter,
        Position: position,
        Rechtsform: rechtsform,
        Mitarbeiterzahl: mitarbeiterzahl,
        Zusaetzliche_Nachricht_Gewerbe: projektMessage
      });
    }

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
      },
      offers: {
        countRaw: offerCount,
        regionRaw: offerRegion,
        countMapped: customFields.Anzahl_Anbieter,
        regionMapped: customFields.Angebote_von
      },
      structureMaterial: {
        raw: funnelData.structureMaterial,
        mapped: customFields.Bauweise_Balkon
      },
      wallMaterial: {
        raw: funnelData.wallMaterial,
        mapped: customFields.Material_Wand
      },
      insulation: {
        raw: funnelData.insulation,
        mapped: customFields.Insulation_Projekt
      },
      balconyDoor: {
        raw: funnelData.balconyDoor,
        mapped: customFields.Balkontuer
      },
      demolition: demolitionText,
      documents: documentsText,
      gewerbe: (normalizedFunnelType === 'gewerbe' || normalizedFunnelType === 'gewerbeprojekte funnel') ? {
        projektname: customFields.Projektname,
        projektort: customFields.Projektort,
        projektadresse: customFields.Projektadresse,
        anzahlWohnungen: customFields.Anzahl_Wohnungen,
        balkontypDetails: customFields.Balkontyp_Details,
        budgetRange: customFields.Budget_Range,
        starttermin: customFields.Exakter_Starttermin,
        endtermin: customFields.Exakter_Endtermin,
        ansprechpartner: customFields.Ansprechpartner,
        projektleiter: customFields.Projektleiter,
        mitarbeiterzahl: customFields.Mitarbeiterzahl
      } : undefined
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

