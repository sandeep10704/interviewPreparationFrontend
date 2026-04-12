import React from 'react';
import HeroSection from './Components/HeroSection';
import CapabilitiesSection from './Components/CapabilitiesSection';
import WhyChooseUsSection from './Components/WhyChooseUsSection';
import ResumeAnalysisSection from './Components/ResumeAnalysisSection';

const HomeLayout = () => {
  return (
    <div className="flex flex-col w-full overflow-hidden bg-background">
      {/* Hero Section */}
      <HeroSection />

      {/* Core Capabilities Section */}
      <CapabilitiesSection />

      {/* Why Choose Us Section */}
      <WhyChooseUsSection />

      {/* Resume Analysis Section */}
      <ResumeAnalysisSection />
    </div>
  );
};

export default HomeLayout;
