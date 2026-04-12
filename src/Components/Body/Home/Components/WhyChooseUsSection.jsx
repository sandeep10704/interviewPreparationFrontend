import React from 'react';
import { Typography } from '../../../Common';
import ValueCard from './ValueCard';

const WhyChooseUsSection = () => {
  const values = [
    {
      title: "AI-Powered Feedback",
      description: "Get instant insights on your performance to understand strengths and areas for improvement.",
      icon: <svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z"></path></svg>
    },
    {
      title: "Personalized Experience",
      description: "Practice sessions adapt based on your progress to help you focus on what matters most.",
      icon: <svg fill="currentColor" viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"></path></svg>
    },
    {
      title: "Real-Time Practice",
      description: "Simulate real interview environments to build confidence and improve time management.",
      icon: <svg fill="currentColor" viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"></path></svg>
    },
    {
      title: "Simple & Accessible",
      description: "A clean and intuitive interface designed for seamless learning.",
      icon: <svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"></path></svg>
    }
  ];

  return (
    <section className="py-32 px-6 lg:px-20 bg-card/30 border-y border-border-main/50">
      <div className="max-w-7xl mx-auto text-center space-y-24">
        <div className="space-y-4">
          <Typography variant="h2" className="!text-5xl">Why Choose Our Platform</Typography>
          <Typography variant="body" className="max-w-2xl mx-auto text-text-subtle">
            Designed to help you prepare smarter, perform better, and achieve your career goals with confidence.
          </Typography>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {values.map((item, index) => (
            <ValueCard 
              key={index}
              {...item}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
