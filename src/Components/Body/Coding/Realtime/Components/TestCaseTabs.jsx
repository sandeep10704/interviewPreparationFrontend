import React from 'react';
import { CheckIcon, CloseIcon } from './Icons';

const TestCaseTabs = ({ visibleTestCases, results, activeTab, setActiveTab, isSubmission, hiddenResults }) => {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 shrink-0 scrollbar-hide">
      {visibleTestCases.map((tc, index) => {
        const status = results.find(r => r.id === index);
        return (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded border transition-all whitespace-nowrap active:scale-95 ${
              activeTab === index 
                ? 'bg-accent-main/10 border-accent-main/50 text-accent-main shadow-lg shadow-accent-main/5' 
                : 'bg-white/5 border-white/5 text-text-subtle hover:border-white/20'
            }`}
          >
            {status ? (
              status.passed ? <CheckIcon /> : <CloseIcon />
            ) : (
              <div className="w-3.5 h-3.5 rounded-full border border-current opacity-20"></div>
            )}
            <span className="text-[10px] font-bold uppercase tracking-widest">Case {index + 1}</span>
          </button>
        );
      })}
      
      {/* Hidden cases status pills only in submission mode */}
      {isSubmission && hiddenResults.map((hr, index) => (
        <div
          key={index + 3}
          className={`flex items-center justify-center min-w-[32px] h-8 rounded border transition-all ${
            hr.passed ? 'bg-green-500/5 border-green-500/20' : 'bg-red-500/5 border-red-500/20'
          }`}
          title={`Hidden Case ${index + 4}`}
        >
          {hr.passed ? <CheckIcon /> : <CloseIcon />}
        </div>
      ))}
    </div>
  );
};

export default TestCaseTabs;
