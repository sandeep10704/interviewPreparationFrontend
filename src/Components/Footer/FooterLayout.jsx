import React from 'react';
import { Typography } from '../Common';

const FooterLayout = () => {
  return (
    <footer className="bg-background border-t border-border-main py-8 px-6 lg:px-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
        <Typography variant="bodySmall">
          © {new Date().getFullYear()} InterviewAI. All rights reserved.
        </Typography>
        <div className="flex gap-6">
          <a href="#" className="text-xs text-text-subtle hover:text-accent-main transition-colors">Privacy</a>
          <a href="#" className="text-xs text-text-subtle hover:text-accent-main transition-colors">Terms</a>
          <a href="#" className="text-xs text-text-subtle hover:text-accent-main transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default FooterLayout;
