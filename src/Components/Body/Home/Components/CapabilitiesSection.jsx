import React from 'react';
import { Typography } from '../../../Common';
import FeatureCard from './FeatureCard';

const CapabilitiesSection = () => {
  const capabilities = [
    {
      title: "HR Interview Practice",
      description: "Practice common interview questions and receive instant feedback to improve your communication, clarity, and confidence.",
      linkTo: "/hr",
      linkText: "Start Practice",
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
    },
    {
      title: "Technical Interview Practice",
      description: "Work through a variety of problem-solving questions designed to strengthen your logical thinking and interview readiness.",
      linkTo: "/technical",
      linkText: "Start Practice",
      isPrimary: true,
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
    },
    {
      title: "Interactive Coding",
      description: "Write, run, and test your code in a seamless environment built to simulate real interview scenarios.",
      linkTo: "/coding",
      linkText: "Open Playground",
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
    }
  ];

  return (
    <section className="py-32 px-6 lg:px-20 max-w-7xl mx-auto text-center">
      <div className="mb-20 space-y-4">
        <Typography variant="h2" className="!text-5xl">Everything You Need to Succeed</Typography>
        <Typography variant="body" className="max-w-2xl mx-auto text-text-subtle">
          Build confidence, improve performance, and prepare effectively with an all-in-one interview practice platform.
        </Typography>
      </div>

      <div className="grid md:grid-cols-3 gap-8 text-left">
        {capabilities.map((item, index) => (
          <FeatureCard 
            key={index}
            {...item}
          />
        ))}
      </div>
    </section>
  );
};

export default CapabilitiesSection;
