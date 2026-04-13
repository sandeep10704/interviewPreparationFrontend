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
      
      <div className="flex items-center gap-3">
        <Button 
          variant="outline" 
          size="md" 
          onClick={onRun}
          className="!rounded-lg !py-2.5 !px-6 flex items-center gap-2 !text-xs font-black bg-white/5 hover:bg-white/10 border-white/10 hover:border-accent-main/50 transition-all active:scale-95 text-text-main group"
        >
          <div className="text-accent-main group-hover:scale-110 transition-transform">
            <PlayIcon />
          </div>
          RUN
        </Button>
        <Button 
          size="md" 
          onClick={onSubmit}
          className="!rounded-lg !py-2.5 !px-8 flex items-center gap-2 !text-xs font-black shadow-[0_0_20px_rgba(50,208,200,0.2)] hover:shadow-[0_0_30px_rgba(50,208,200,0.4)] transition-all active:scale-95 bg-accent-main text-black group"
        >
          <div className="group-hover:translate-x-0.5 transition-transform">
            <SendIcon />
          </div>
          SUBMIT
        </Button>
      </div>
    </div>
  );
};

export default EditorFooter;
