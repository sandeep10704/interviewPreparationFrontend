import React, { useState } from 'react';
import { Typography, TermsModal } from '../Common';

const FooterLayout = () => {
  const [isTermsOpen, setIsTermsOpen] = useState(false);

  return (
    <footer className="bg-background border-t border-border-main py-8 px-6 lg:px-20 relative overflow-hidden">
      {/* Subtle glow effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-px bg-gradient-to-r from-transparent via-accent-main/20 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left relative z-10">
        <Typography variant="bodySmall" className="opacity-60 font-medium font-sans">
          © {new Date().getFullYear()} InterviewAI. All rights reserved.
        </Typography>
        
        <div className="flex items-center gap-8">
          <button 
            type="button"
            className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-subtle hover:text-accent-main transition-all duration-300"
          >
            Privacy
          </button>
          <button 
            type="button"
            onClick={() => setIsTermsOpen(true)}
            className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-subtle hover:text-accent-main transition-all duration-300"
          >
            Terms
          </button>
          <button 
            type="button"
            className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-subtle hover:text-accent-main transition-all duration-300"
          >
            Contact
          </button>
        </div>
      </div>

      {/* Popups */}
      <TermsModal 
        isOpen={isTermsOpen} 
        onClose={() => setIsTermsOpen(false)} 
      />
    </footer>
  );
};

export default FooterLayout;
