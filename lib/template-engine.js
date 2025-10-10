/**
 * Balkonfuchs Landing Page Template Engine
 * Handles dynamic content rendering for city-specific landing pages
 */

// Template configuration
const TEMPLATE_CONFIG = {
  genehmigung: {
    name: 'Balkon-Genehmigung',
    slug: 'genehmigung',
    icon: '📋',
    color: 'template-genehmigung',
    description: 'Rechtssicherheit für Ihr Balkonprojekt',
    benefits: 'Behörden-Check, Rechtssicherheit, Kostenfrei prüfen'
  },
  kalkulator: {
    name: 'Balkon-Kalkulator',
    slug: 'kalkulator', 
    icon: '💰',
    color: 'template-kalkulator',
    description: 'Kostenkalkulation für Ihren Balkon',
    benefits: 'Präzise Kostenberechnung, Preisvergleich, Kostenvoranschlag'
  },
  planer: {
    name: 'Balkon-Planer',
    slug: 'planer',
    icon: '📐',
    color: 'template-planer', 
    description: 'Professionelle Balkonplanung',
    benefits: '3D-Planung, Baueingabe, Statik, Design'
  },
  express: {
    name: 'Express-Balkon',
    slug: 'express',
    icon: '⚡',
    color: 'template-express',
    description: 'Schnelle Balkonlösung',
    benefits: 'Schnelle Umsetzung, Vorfabriziert, Alles inklusive'
  },
  bauzeit: {
    name: 'Bauzeit-Planung',
    slug: 'bauzeit',
    icon: '📅',
    color: 'template-bauzeit',
    description: 'Optimale Bauzeitplanung',
    benefits: 'Terminplanung, Zeitlinien, Wetterplanung'
  },
  partner: {
    name: 'Partner werden',
    slug: 'partner',
    icon: '🤝',
    color: 'template-partner',
    description: 'Balkonfuchs Partner werden',
    benefits: 'Partnerprogramm, Provision, Marketing-Support'
  }
};

// Template variable mapping
const TEMPLATE_VARIABLES = {
  // Basic variables (always available)
  CITY_NAME: 'city.name',
  CITY_SLUG: 'city.slug',
  STATE_NAME: 'city.state',
  POSTAL_CODE: 'city.postalCode',
  SUCCESS_COUNT: 'city.successCount',
  
  // Template-specific variables
  TEMPLATE_TITLE: 'template.name',
  TEMPLATE_SUBTITLE: 'template.description',
  TEMPLATE_DESCRIPTION: 'template.description',
  TEMPLATE_BENEFITS: 'template.benefits',
  
  // Genehmigung-specific
  CITY_REGULATIONS: 'city.genehmigung.regulations',
  CITY_AUTHORITIES: 'city.genehmigung.authorities',
  PROCESSING_TIME: 'city.genehmigung.processingTime',
  REQUIRES_PERMIT: 'city.genehmigung.requiresPermit',
  SPECIAL_REQUIREMENTS: 'city.genehmigung.specialRequirements',
  
  // Kalkulator-specific
  AVERAGE_PRICE: 'city.kalkulator.averagePrice',
  PRICE_RANGE: 'city.kalkulator.priceRange',
  LOCAL_FACTORS: 'city.kalkulator.localFactors',
  MATERIAL_COSTS: 'city.kalkulator.materialCosts',
  LABOR_COSTS: 'city.kalkulator.laborCosts',
  SPECIAL_COSTS: 'city.kalkulator.specialCosts',
  RENT_INCREASE: 'city.kalkulator.rentIncrease',
  
  // Planer-specific
  PLANNING_TIME: 'city.planer.planningTime',
  LOCAL_EXPERTISE: 'city.planer.localExpertise',
  PLANNING_DOCUMENTS: 'city.planer.planningDocuments',
  ZONING_PLAN: 'city.planer.zoningPlan',
  HERITAGE_PROTECTION: 'city.planer.heritageProtection',
  LOCAL_REGULATIONS: 'city.planer.localRegulations',
  
  // Express-specific
  CONSTRUCTION_TIME: 'city.express.constructionTime',
  AVAILABILITY: 'city.express.availability',
  EXPRESS_PRICE: 'city.express.expressPrice',
  LOCAL_CREW: 'city.express.localCrew',
  MATERIAL_WAREHOUSE: 'city.express.materialWarehouse',
  APPOINTMENT_AVAILABILITY: 'city.express.appointmentAvailability',
  EXPRESS_SURCHARGE: 'city.express.expressSurcharge',
  
  // Bauzeit-specific
  AVERAGE_CONSTRUCTION_TIME: 'city.bauzeit.averageConstructionTime',
  PLANNING_LEAD_TIME: 'city.bauzeit.planningLeadTime',
  PERMIT_TIME: 'city.bauzeit.permitTime',
  CONSTRUCTION_WINDOW: 'city.bauzeit.constructionWindow',
  WEATHER_CONDITIONS: 'city.bauzeit.weatherConditions',
  PERMIT_TIMES: 'city.bauzeit.permitTimes',
  LOCAL_CREWS: 'city.bauzeit.localCrews',
  
  // Partner-specific
  PARTNER_BONUS: 'city.partner.partnerBonus',
  EARNING_POTENTIAL: 'city.partner.earningPotential',
  SUPPORT_PACKAGE: 'city.partner.supportPackage',
  EXCLUSIVE_AREA: 'city.partner.exclusiveArea',
  LOCAL_LEADS: 'city.partner.localLeads',
  PARTNER_TRAINING: 'city.partner.partnerTraining',
  TECHNICAL_SUPPORT: 'city.partner.technicalSupport',
  
  // Common variables
  LOCAL_PARTNERS: 'city.localPartners'
};

/**
 * Get nested object value by path
 * @param {Object} obj - The object to search
 * @param {string} path - The path to the value (e.g., 'city.name')
 * @returns {*} The value at the path or fallback
 */
function getNestedValue(obj, path, fallback = '') {
  return path.split('.').reduce((current, key) => {
    return (current && current[key] !== undefined) ? current[key] : fallback;
  }, obj);
}

/**
 * Render template with variables
 * @param {string} templateHtml - The HTML template
 * @param {Object} cityData - City-specific data
 * @param {string} templateType - The template type (genehmigung, kalkulator, etc.)
 * @returns {string} Rendered HTML
 */
function renderTemplate(templateHtml, cityData, templateType) {
  let rendered = templateHtml;
  
  // Get template configuration
  const templateConfig = TEMPLATE_CONFIG[templateType];
  if (!templateConfig) {
    throw new Error(`Unknown template type: ${templateType}`);
  }
  
  // Prepare data object with template config
  const data = {
    city: cityData,
    template: templateConfig
  };
  
  // Replace all template variables
  for (const [variable, path] of Object.entries(TEMPLATE_VARIABLES)) {
    const value = getNestedValue(data, path);
    const regex = new RegExp(`{{${variable}}}`, 'g');
    rendered = rendered.replace(regex, value);
  }
  
  return rendered;
}

/**
 * Generate URL for template and city
 * @param {string} templateType - The template type
 * @param {string} citySlug - The city slug
 * @returns {string} The URL
 */
function generateTemplateUrl(templateType, citySlug) {
  const config = TEMPLATE_CONFIG[templateType];
  if (!config) {
    throw new Error(`Unknown template type: ${templateType}`);
  }
  return `/${config.slug}/${citySlug}/`;
}

/**
 * Get template configuration
 * @param {string} templateType - The template type
 * @returns {Object} Template configuration
 */
function getTemplateConfig(templateType) {
  return TEMPLATE_CONFIG[templateType];
}

/**
 * Get all available template types
 * @returns {Array} Array of template types
 */
function getAvailableTemplates() {
  return Object.keys(TEMPLATE_CONFIG);
}

/**
 * Validate template type
 * @param {string} templateType - The template type to validate
 * @returns {boolean} Whether the template type is valid
 */
function isValidTemplateType(templateType) {
  return templateType in TEMPLATE_CONFIG;
}

module.exports = {
  renderTemplate,
  generateTemplateUrl,
  getTemplateConfig,
  getAvailableTemplates,
  isValidTemplateType,
  TEMPLATE_CONFIG,
  TEMPLATE_VARIABLES
};




