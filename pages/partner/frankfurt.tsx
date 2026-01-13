import React from 'react';
import PartnerCityLanding from '../../components/PartnerCityLanding';
import { partnerCities } from '../../config/partner-cities';

const PartnerFrankfurt = () => {
  const cityConfig = partnerCities.find(city => city.citySlug === 'frankfurt');
  
  if (!cityConfig) {
    return null;
  }

  return <PartnerCityLanding {...cityConfig} />;
};

export default PartnerFrankfurt;
