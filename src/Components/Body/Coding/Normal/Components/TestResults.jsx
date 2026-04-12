import React, { useState, useEffect } from 'react';
import { Typography } from '../../../../Common';
import { CheckIcon, CloseIcon, LockIcon } from './Icons';
import Tag from './Tag';
import TestCaseTabs from './TestCaseTabs';
import TestCaseDetails from './TestCaseDetails';

const TestResults = ({ testCases = [], results = [], isSubmission = false }) => {
  const [activeTab, setActiveTab] = useState(0);

  // If in run mode, we only care about the first 3
  // If in submission mode, we show summary of all
  const visibleTestCases = testCases.slice(0, 3);
  const hiddenTestCases = testCases.slice(3);
  const hiddenResults = isSubmission ? results.slice(3) : [];
  
  const totalPassed = results.filter(r => r.passed).length;
  const totalFailed = results.filter(r => !r.passed).length;

  useEffect(() => {
    // Reset to first tab if activeTab is beyond visible range (though it shouldn't be)
    if (activeTab >= visibleTestCases.length) {
      setActiveTab(0);
    }
  }, [testCases, activeTab]);

  return (
    <div className="flex flex-col h-full bg-[#01080E] p-5 space-y-5 overflow-y-auto custom-scrollbar text-left">
      <div className="flex items-center justify-between shrink-0">
        <div>
           <Typography variant="h3" className="!text-[13px] font-bold uppercase tracking-widest text-text-main inline-block mr-2">
            {isSubmission ? "Submission Result" : "Test Results"}
          </Typography>
          {isSubmission && (
            <Tag variant={totalFailed === 0 ? 'success' : 'error'} className="ml-2">
              {totalFailed === 0 ? "Accepted" : "Wrong Answer"}
            </Tag>
          )}
        </div>
        
        <div className="flex gap-2">
          <Tag variant="success">{totalPassed} Passed</Tag>
          {isSubmission && totalFailed > 0 && (
            <Tag variant="error">{totalFailed} Failed</Tag>
          )}
        </div>
      </div>

      <TestCaseTabs 
        visibleTestCases={visibleTestCases} 
        results={results} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isSubmission={isSubmission} 
        hiddenResults={hiddenResults} 
      />

      {/* Case Details */}
      <div className="flex-1 min-h-0 overflow-y-auto pt-2 custom-scrollbar pb-6">
        <TestCaseDetails 
          key={activeTab}
          activeCase={visibleTestCases[activeTab]} 
          result={results.find(r => r.id === activeTab)} 
        />
      </div>
    </div>
  );
};

export default TestResults;
