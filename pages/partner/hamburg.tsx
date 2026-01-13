import React from 'react';
import PartnerCityLanding from '../../components/PartnerCityLanding';
import { partnerCities } from '../../config/partner-cities';

const PartnerHamburg = () => {
  const cityConfig = partnerCities.find(city => city.citySlug === 'hamburg');
  
  if (!cityConfig) {
    return null;
  }

  return <PartnerCityLanding {...cityConfig} />;
};

export default PartnerHamburg;
