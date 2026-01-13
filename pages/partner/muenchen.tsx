import React from 'react';
import PartnerCityLanding from '../../components/PartnerCityLanding';
import { partnerCities } from '../../config/partner-cities';

const PartnerMuenchen = () => {
  const cityConfig = partnerCities.find(city => city.citySlug === 'muenchen');
  
  if (!cityConfig) {
    return null;
  }

  return <PartnerCityLanding {...cityConfig} />;
};

export default PartnerMuenchen;
