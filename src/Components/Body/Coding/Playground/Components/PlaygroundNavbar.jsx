import React from 'react';
import { Typography, Button } from '../../../../Common';

const PlaygroundNavbar = ({ onRun, loading }) => {
  return (
    <div className="h-14 border-b border-border-main/20 bg-[#01080E] px-6 flex items-center justify-between shrink-0">
      <div className="flex items-center gap-4">
        <div className="w-8 h-8 rounded-lg bg-accent-main/10 flex items-center justify-center border border-accent-main/20">
          <svg className="w-4 h-4 text-accent-main" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6-1.6 1.6a1 1 0 0 0 1.4 1.4l2.3-2.3a1 1 0 0 0 0-1.4l-2.3-2.3a1 1 0 0 0-1.4 0zM9.3 17.7a1 1 0 0 0 0-1.4l-1.6-1.6 1.6-1.6a1 1 0 0 0-1.4-1.4l-2.3 2.3a1 1 0 0 0 0 1.4l2.3 2.3a1 1 0 0 0 1.4 0zM10.3 18.5l3.4-13a1 1 0 0 0-1.9-.5l-3.4 13a1 1 0 0 0 1.9.5z" />
          </svg>
        </div>
        <div>
          <Typography variant="h3" className="!text-[14px] font-black tracking-widest uppercase">
            Coding <span className="text-accent-main">Playground</span>
          </Typography>
          <div className="flex items-center gap-2 -mt-1">
             <span className="text-[8px] font-bold text-text-subtle tracking-tighter uppercase">Experimental Lab</span>
             <span className="w-1 h-1 rounded-full bg-border-main/40"></span>
             <span className="text-[8px] font-bold text-accent-main tracking-tighter uppercase">Live Session</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button 
          disabled={loading}
          onClick={onRun}
          className="!rounded-lg !py-1.5 !px-6 flex items-center gap-2 !text-[11px] font-black shadow-[0_4px_20px_-5px_rgba(50,208,200,0.4)] hover:shadow-accent-main/30 transition-all uppercase tracking-widest bg-accent-main text-black group"
        >
          {loading ? (
             <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin"></div>
          ) : (
            <>
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
              <span>RUN</span>
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default PlaygroundNavbar;
