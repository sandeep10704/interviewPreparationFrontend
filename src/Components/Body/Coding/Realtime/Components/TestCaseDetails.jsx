import React from 'react';
import { Typography } from '../../../../Common';

const TestCaseDetails = ({ activeCase, result }) => {
  if (!activeCase) return null;

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="space-y-1.5">
        <Typography variant="h4" className="text-[9px] font-bold uppercase tracking-[0.2em] text-text-subtle/60">Input</Typography>
        <div className="p-3 rounded bg-black/40 border border-white/5 font-mono text-[11px] text-text-main tracking-tight leading-relaxed select-all">
          {activeCase.input}
        </div>
      </div>
      
      <div className="space-y-1.5">
        <Typography variant="h4" className="text-[9px] font-bold uppercase tracking-[0.2em] text-text-subtle/60">Expected Output</Typography>
        <div className="p-3 rounded bg-black/40 border border-white/5 font-mono text-[11px] text-accent-main/80 tracking-tight leading-relaxed">
          {activeCase.output}
        </div>
      </div>

      {result && (
        <div className="space-y-1.5 animate-slide-up">
          <Typography variant="h4" className="text-[9px] font-bold uppercase tracking-[0.2em] text-text-subtle/60">Your Output</Typography>
          <div className={`p-3 rounded border font-mono text-[11px] tracking-tight leading-relaxed ${
            result.passed 
              ? 'bg-green-500/5 border-green-500/20 text-green-400 shadow-[0_0_15px_rgba(34,197,94,0.05)]' 
              : 'bg-red-500/5 border-red-500/10 text-red-300'
          }`}>
            {result.userOutput || 'No output detected'}
          </div>
        </div>
      )}
    </div>
  );
};

export default TestCaseDetails;
