import React from 'react';
import { Button, Typography } from '../../../../Common';
import { PlayIcon, SendIcon } from './Icons';

const EditorFooter = ({ onRun, onSubmit }) => {
  return (
    <div className="px-4 py-2 border-t border-border-main/50 flex items-center justify-between bg-[#01080E]/30">
      <div className="flex items-center gap-3">
        <Typography variant="bodySmall" className="text-text-subtle font-mono text-[9px] font-bold tracking-widest flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
          READY
        </Typography>
      </div>
      
      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onRun}
          className="!rounded-md !py-1 !px-3 flex items-center gap-2 !text-[10px] font-bold bg-white/5 hover:bg-white/10 border-white/5 hover:border-white/10 transition-all active:scale-95"
        >
          <PlayIcon />
          RUN
        </Button>
        <Button 
          size="sm" 
          onClick={onSubmit}
          className="!rounded-md !py-1 !px-4 flex items-center gap-2 !text-[10px] font-bold shadow-lg shadow-accent-main/10 hover:shadow-accent-main/20 transition-all active:scale-95"
        >
          <SendIcon />
          SUBMIT
        </Button>
      </div>
    </div>
  );
};

export default EditorFooter;
