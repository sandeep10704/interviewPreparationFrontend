import React from "react";
import { Typography, Button, Modal } from "../../../Common";

const GenerationConfigModal = ({ isOpen, onClose, config, setConfig, onStart }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Challenge Configuration"
      maxWidth="500px"
    >
      <div className="space-y-8 py-4">
         {/* Difficulty Selection */}
         <div className="space-y-4">
            <Typography className="text-[10px] font-black tracking-wider text-text-subtle uppercase">Target Difficulty</Typography>
            <div className="grid grid-cols-3 gap-3">
               {['easy', 'medium', 'hard'].map((d) => (
                  <button
                     key={d}
                     type="button"
                     onClick={() => setConfig(prev => ({...prev, difficulty: d}))}
                     className={`py-3 rounded-xl border transition-all text-[11px] font-black uppercase tracking-widest ${
                        config.difficulty === d 
                        ? 'bg-accent-main border-accent-main text-black scale-105 shadow-lg shadow-accent-main/20' 
                        : 'bg-white/5 border-white/10 text-text-subtle hover:border-white/20'
                     }`}
                  >
                     {d}
                  </button>
               ))}
            </div>
         </div>

         {/* Question Count Selection */}
         <div className="space-y-4">
            <Typography className="text-[10px] font-black tracking-wider text-text-subtle uppercase">Number of Questions</Typography>
            <div className="grid grid-cols-5 gap-2">
               {[1, 2, 3, 5, 10].map((n) => (
                  <button
                     key={n}
                     type="button"
                     onClick={() => setConfig(prev => ({...prev, count: n}))}
                     className={`py-3 rounded-xl border transition-all text-sm font-black ${
                        config.count === n 
                        ? 'bg-accent-main border-accent-main text-black scale-105 shadow-lg shadow-accent-main/20' 
                        : 'bg-white/5 border-white/10 text-text-subtle hover:border-white/20'
                     }`}
                  >
                     {n}
                  </button>
               ))}
            </div>
            <Typography className="text-[10px] text-text-subtle italic text-center">
               More questions will take longer to generate accurately.
            </Typography>
         </div>

         <Button 
            className="w-full !rounded-2xl h-16 !text-lg !font-black !bg-accent-main !text-black shadow-xl"
            onClick={onStart}
         >
            START AI ENGINE
         </Button>
      </div>
    </Modal>
  );
};

export default GenerationConfigModal;
