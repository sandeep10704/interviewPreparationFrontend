import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Typography } from '../../../Common';
import FloatingCard from './FloatingCard';

const HeroSection = () => {
  return (
    <section className="relative pt-20 pb-32 px-6 lg:px-20 overflow-hidden text-left">
      {/* Background Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent-main/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent-main/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 relative z-10">
        <div className="flex-1 space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-bg border border-accent-border text-accent-main text-sm font-medium animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-main opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-main"></span>
            </span>
            AI-Powered Interview Preparation
          </div>
          
          <div className="space-y-4">
            <Typography variant="h1" className="!text-6xl lg:!text-7xl leading-[1.1]">
              Crack Your Next <br />
              Interview with <span className="text-accent-main">Confidence</span>
            </Typography>
            <Typography variant="h3" className="text-accent-main font-semibold tracking-wide">
              Your Career, Powered by AI
            </Typography>
          </div>
          
          <Typography variant="body" className="max-w-xl text-text-subtle">
            Practice smarter with AI-driven mock interviews, real-time coding challenges, and intelligent resume analysis.
            Get personalized feedback, improve your weak areas, and prepare for top companies with confidence.
          </Typography>

          <div className="flex flex-wrap gap-4 pt-4">
            <Link to="/signup">
              <Button size="lg" className="px-8 !rounded-full shadow-lg hover:shadow-accent-main/20">
                Start Practicing Free
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="px-8 !rounded-full">
              Upload Resume
            </Button>
          </div>
        </div>

        <div className="flex-1 relative flex items-center justify-center">
          {/* Visual Element with Floating Cards */}
          <div className="relative w-full aspect-square max-w-[500px] flex items-center justify-center">
            <div className="absolute inset-0 bg-accent-main/10 rounded-full blur-[100px] animate-pulse"></div>
            
            <div className="relative w-[70%] aspect-square rounded-full border border-white/10 overflow-hidden shadow-2xl z-10">
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="AI Interviewer" 
                className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
              />
            </div>

            {/* Card 1 (Top Left) */}
            <FloatingCard 
              className="-left-6 top-[15%]"
              icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>}
              title="AI Resume Analysis"
              subtitle="Strong Match Identified"
            />

            {/* Card 2 (Top Right) */}
            <FloatingCard 
              className="-right-10 top-[35%]"
              animationClass="animate-float-delayed"
              icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>}
              title="Performance Insight"
              subtitle="Above Average"
            />

            {/* Card 3 (Bottom Left) */}
            <FloatingCard 
              className="bottom-[10%] -left-4"
              icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>}
              title="Technical Skills"
              subtitle="Interview Ready"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
