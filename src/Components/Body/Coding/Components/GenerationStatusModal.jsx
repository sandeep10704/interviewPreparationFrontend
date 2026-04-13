import React from "react";
import { Typography, Button, Modal } from "../../../Common";

const GenerationStatusModal = ({ isOpen, onClose, genStatus, countdown, config, formatTime }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={() => genStatus !== 'generating' && onClose()}
      title="AI Generating Set"
      maxWidth="500px"
    >
      <div className="text-center py-8 space-y-8">
         <div className="relative inline-flex flex-col items-center">
            <div className="w-24 h-24 rounded-full border-4 border-white/10 border-t-accent-main animate-spin"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xl font-mono font-black text-white">
               {formatTime(countdown)}
            </div>
         </div>
         
         <div className="space-y-4">
            <div className="inline-flex gap-1.5 justify-center">
               {[1, 2, 3].map(i => (
                  <div key={i} className="w-1.5 h-1.5 rounded-full bg-accent-main animate-bounce" style={{ animationDelay: `${i*0.2}s` }}></div>
               ))}
            </div>
            <Typography variant="h3" className="!mb-0">Neural engine at work</Typography>
            <Typography variant="body" className="text-text-subtle italic">
               {config.count} {config.difficulty} challenges being synthesized...
            </Typography>
         </div>

         <div className="flex flex-col gap-3 pt-6">
            <div className="flex gap-4">
               <Button 
                 className="flex-1 !rounded-2xl h-14 !text-sm flex items-center justify-center gap-2 group bg-accent-main text-black font-black animate-pulse shadow-[0_0_20px_rgba(50,208,200,0.3)]"
                 onClick={() => {/* Wait - handled by useEffect */}}
               >
                  <div className="w-2 h-2 rounded-full bg-black animate-ping"></div>
                  <span>Waiting...</span>
               </Button>
               <Button 
                 variant="outline" 
                 className="flex-1 !rounded-2xl h-14 !text-sm flex items-center justify-center gap-2 group border-white/10 text-white/60 hover:text-white"
                 onClick={onClose}
               >
                  <span>Close</span>
               </Button>
            </div>
         </div>
      </div>
    </Modal>
  );
};

export default GenerationStatusModal;
