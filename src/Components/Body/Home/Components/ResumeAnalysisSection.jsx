import React from 'react';
import { Button, Typography } from '../../../Common';

const ResumeAnalysisSection = () => {
  return (
    <section className="py-24 px-6 bg-accent-bg border-y border-accent-border/20 relative">
      <div className="max-w-4xl mx-auto text-center space-y-10 relative z-10">
        <div className="space-y-4">
          <Typography variant="h2">Instant Resume Analysis</Typography>
          <Typography variant="body" className="max-w-2xl mx-auto opacity-80">
            Our AI analyzes your resume to generate personalized interview questions based on your specific skills and experience level.
          </Typography>
        </div>

        <div className="relative group p-12 border-2 border-dashed border-accent-border rounded-3xl hover:border-accent-main hover:bg-accent-main/5 transition-all bg-background/80 cursor-pointer shadow-xl">
          <input type="file" className="absolute inset-0 opacity-0 cursor-pointer z-10" />
          <div className="space-y-4 relative z-0">
            <div className="w-16 h-16 bg-accent-bg rounded-2xl flex items-center justify-center mx-auto text-accent-main group-hover:scale-110 transition-transform">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
            </div>
            <Typography variant="h3">Upload Resume</Typography>
            <Typography variant="bodySmall">Drop your PDF or DOCX here (Max 5MB)</Typography>
            <Button className="!rounded-full px-10">Choose File</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResumeAnalysisSection;
