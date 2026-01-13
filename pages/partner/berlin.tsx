import React from 'react';
import PartnerCityLanding from '../../components/PartnerCityLanding';
import { partnerCities } from '../../config/partner-cities';

const PartnerBerlin = () => {
  const cityConfig = partnerCities.find(city => city.citySlug === 'berlin');
  
  if (!cityConfig) {
    return null;
  }

  return <PartnerCityLanding {...cityConfig} />;
};

export default PartnerBerlin;
