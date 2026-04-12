import React from 'react';

const ExampleCard = ({ example }) => {
  if (!example) return null;

  return (
    <div className="p-5 rounded-lg bg-white/5 border border-white/10 space-y-3 font-mono text-[13px] group hover:border-accent-main/30 transition-colors">
      <div className="flex gap-2">
        <span className="font-bold text-accent-main min-w-[60px]">Input:</span>
        <span className="text-text-subtle break-all">{example.input}</span>
      </div>
      <div className="flex gap-2">
        <span className="font-bold text-accent-main min-w-[60px]">Output:</span>
        <span className="text-text-subtle break-all">{example.output}</span>
      </div>
      {example.explanation && (
        <div className="flex gap-2 border-t border-white/5 pt-2 mt-2">
          <span className="font-bold text-accent-main min-w-[60px]">Explanation:</span>
          <span className="text-text-subtle italic opacity-80">{example.explanation}</span>
        </div>
      )}
    </div>
  );
};

export default ExampleCard;
