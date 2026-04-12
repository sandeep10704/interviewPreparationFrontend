import React from 'react';
import HeroSection from './HeroSection';
import CapabilitiesSection from './CapabilitiesSection';
import WhyChooseUsSection from './WhyChooseUsSection';
import ResumeAnalysisSection from './ResumeAnalysisSection';

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
