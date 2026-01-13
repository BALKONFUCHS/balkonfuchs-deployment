import React from 'react';
import PartnerCityLanding from '../../components/PartnerCityLanding';
import { partnerCities } from '../../config/partner-cities';

const PartnerKoeln = () => {
  const cityConfig = partnerCities.find(city => city.citySlug === 'koeln');
  
  if (!cityConfig) {
    return null;
  }

  return <PartnerCityLanding {...cityConfig} />;
};

export default PartnerKoeln;
