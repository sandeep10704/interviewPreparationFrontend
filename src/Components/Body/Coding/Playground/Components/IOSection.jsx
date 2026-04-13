import React, { useState, useEffect } from 'react';
import { Typography, Loading } from '../../../../Common';

const IOSection = ({ stdin, setStdin, result, loading }) => {
  const [activeTab, setActiveTab] = useState('input');

  // Auto-switch to output when results come in
  useEffect(() => {
    if (result) {
      setActiveTab('output');
    }
  }, [result]);

  return (
    <div className="flex flex-col h-full bg-[#01080E] overflow-hidden">
      {/* Tab Header */}
      <div className="flex items-center px-4 h-10 border-b border-white/5 bg-[#030E17]/40">
        <div className="flex items-center gap-1 h-full">
          <button 
            onClick={() => setActiveTab('input')}
            className={`h-full px-4 flex items-center gap-2 border-b-2 transition-all ${
              activeTab === 'input' 
                ? 'border-accent-main text-accent-main bg-accent-main/5' 
                : 'border-transparent text-text-subtle hover:text-text-main grayscale opacity-60'
            }`}
          >
            <Typography className="text-[10px] font-black tracking-widest uppercase">Input</Typography>
          </button>
          <button 
            onClick={() => setActiveTab('output')}
            className={`h-full px-4 flex items-center gap-2 border-b-2 transition-all ${
              activeTab === 'output' 
                ? 'border-accent-main text-accent-main bg-accent-main/5' 
                : 'border-transparent text-text-subtle hover:text-text-main grayscale opacity-60'
            }`}
          >
            <div className="flex items-center gap-2">
              <Typography className="text-[10px] font-black tracking-widest uppercase">Output</Typography>
              {result && !loading && (
                 <div className="w-1.5 h-1.5 rounded-full bg-accent-main"></div>
              )}
            </div>
          </button>
        </div>

        {/* Console Stats */}
        <div className="ml-auto flex items-center gap-4 pr-2">
           {loading && (
              <div className="flex items-center gap-2 text-accent-main italic">
                 <div className="w-2 h-2 border-[1.5px] border-accent-main/20 border-t-accent-main rounded-full animate-spin"></div>
                 <span className="text-[8px] font-bold tracking-tighter uppercase animate-pulse">Running...</span>
              </div>
           )}
           {result?.time && !loading && (
              <span className="text-[9px] font-mono text-text-subtle opacity-40">{(result.time * 1000).toFixed(0)} ms</span>
           )}
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-hidden relative">
        {activeTab === 'input' ? (
          <textarea
            value={stdin}
            onChange={(e) => setStdin(e.target.value)}
            placeholder="System.in > Enter your test case inputs here..."
            className="w-full h-full bg-transparent p-6 text-[11px] font-mono text-text-main outline-none placeholder:text-text-subtle/20 resize-none selection:bg-accent-main/20 focus:bg-white/[0.01] transition-all"
          />
        ) : (
          <div className="w-full h-full overflow-y-auto p-6 custom-scrollbar bg-[#030E17]/30">
            {loading ? (
               <div className="flex flex-col items-center justify-center h-full gap-4 opacity-40">
                  <Loading size="sm" />
                  <Typography className="text-[10px] font-black tracking-[0.2em] uppercase text-center animate-pulse">Requesting instance output...</Typography>
               </div>
            ) : result ? (
               <div className="space-y-6 animate-in slide-in-from-bottom-2 duration-300">
                  {result.stdout && (
                    <div className="space-y-2">
                       <Typography className="text-[9px] font-black text-accent-main/50 uppercase tracking-widest">stdout</Typography>
                       <pre className="text-[11px] font-mono text-text-main leading-relaxed break-all whitespace-pre-wrap selection:bg-accent-main/30">{result.stdout}</pre>
                    </div>
                  )}
                  {result.stderr && (
                    <div className="space-y-2">
                       <Typography className="text-[9px] font-black text-error/50 uppercase tracking-widest">stderr</Typography>
                       <pre className="text-[11px] font-mono text-error leading-relaxed break-all whitespace-pre-wrap selection:bg-error/30">{result.stderr}</pre>
                    </div>
                  )}
                  {!result.stdout && !result.stderr && (
                     <div className="flex flex-col items-center justify-center h-full py-10 opacity-30 italic">
                        <Typography className="text-xs font-mono">Process finished with exit code 0</Typography>
                     </div>
                  )}
               </div>
            ) : (
               <div className="h-full flex flex-col items-center justify-center opacity-10 grayscale group">
                  <svg className="w-12 h-12 mb-4 group-hover:scale-110 transition-transform duration-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                     <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                  </svg>
                  <Typography className="text-[10px] font-black tracking-[0.3em] uppercase text-center max-w-[200px] leading-relaxed">Console ready for execution signal</Typography>
               </div>
            )}
          </div>
        )}
      </div>

      {/* Console Footer Decor */}
      <div className="h-6 border-t border-white/5 bg-[#01080E] px-4 flex items-center">
         <div className="flex items-center gap-3">
            <span className="text-[8px] font-bold text-text-subtle/40 uppercase tracking-tighter">Terminal V1.0</span>
            <span className="w-1 h-1 rounded-full bg-white/5"></span>
            <span className="text-[8px] font-bold text-text-subtle/40 uppercase tracking-tighter cursor-help hover:text-accent-main transition-colors">Documentation</span>
         </div>
      </div>
    </div>
  );
};

export default IOSection;
