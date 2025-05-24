import React from 'react';
import HeroSection from '../components/home/HeroSection';
import FeaturesSection from '../components/home/FeaturesSection';
import CtaSection from '../components/home/CtaSection';

const HomePage: React.FC = () => {
  // Update document title when component mounts
  React.useEffect(() => {
    document.title = 'Clashsense | Smart Banking for the Digital Generation';
  }, []);

  return (
    <div>
      <HeroSection />
      <FeaturesSection />
      <CtaSection />
    </div>
  );
};

export default HomePage;