import React from "react";
import { Typography, Button, Modal } from "../../../Common";

const GenerationConfigModal = ({ isOpen, onClose, config, setConfig, onStart }) => {
  const levels = config.level || [];

  const handleAddLevel = (level) => {
    setConfig(prev => ({
      ...prev,
      level: [...(prev.level || []), level]
    }));
  };

  const handleRemoveLast = () => {
    setConfig(prev => ({
      ...prev,
      level: prev.level?.slice(0, -1) || []
    }));
  };

  const handleClear = () => {
    setConfig(prev => ({
      ...prev,
      level: []
    }));
  };

  const count = (l) => levels.filter(x => x === l).length;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Challenge Configuration"
      maxWidth="520px"
    >
      <div className="space-y-8 py-4">

        {/* description */}
        <div className="p-4 rounded-2xl bg-accent-main/5 border border-accent-main/10">
          <Typography className="text-xs text-text-subtle leading-relaxed">
            Tap difficulty buttons to build your challenge set.  
            Each tap adds one question.  
            Example: <span className="text-accent-main font-bold">Medium + Medium + Hard</span>  
            will generate 3 questions.
          </Typography>
        </div>

        {/* buttons */}
        <div className="space-y-4">
          <Typography className="text-[10px] font-black tracking-wider text-text-subtle uppercase">
            Tap to Add Questions
          </Typography>

          <div className="grid grid-cols-3 gap-3">
            {["easy", "medium", "hard"].map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => handleAddLevel(d)}
                className="relative py-4 rounded-xl border transition-all 
                text-[11px] font-black uppercase tracking-widest
                bg-white/5 border-white/10 text-text-subtle 
                hover:border-accent-main/40 hover:scale-105 
                hover:shadow-lg hover:shadow-accent-main/20
                active:scale-95 duration-200 group"
              >
                {d}

                {count(d) > 0 && (
                  <span className="absolute -top-2 -right-2 
                  w-6 h-6 rounded-full bg-accent-main 
                  text-black text-xs flex items-center justify-center
                  animate-scale-in">
                    {count(d)}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* selected sequence */}
        <div className="space-y-3">
          <Typography className="text-[10px] font-black tracking-wider text-text-subtle uppercase">
            Selected Order
          </Typography>

          <div className="min-h-[60px] p-3 rounded-2xl bg-white/5 border border-white/10 flex flex-wrap gap-2">
            {levels.length === 0 && (
              <Typography className="text-xs text-text-subtle italic">
                No questions selected yet...
              </Typography>
            )}

            {levels.map((l, i) => (
              <div
                key={i}
                className="px-3 py-1.5 rounded-lg 
                bg-accent-main text-black 
                text-xs font-black uppercase
                animate-fade-in-up shadow-md"
              >
                {l}
              </div>
            ))}
          </div>
        </div>

        {/* controls */}
        {levels.length > 0 && (
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1 !rounded-xl"
              onClick={handleRemoveLast}
            >
              Undo
            </Button>

            <Button
              variant="outline"
              className="flex-1 !rounded-xl"
              onClick={handleClear}
            >
              Clear
            </Button>
          </div>
        )}

        {/* total */}
        <div className="text-center">
          <Typography className="text-xs text-text-subtle">
            Total Questions: 
            <span className="text-accent-main font-black ml-1">
              {levels.length}
            </span>
          </Typography>
        </div>

        {/* start */}
        <Button
          className="w-full !rounded-2xl h-16 !text-lg !font-black 
          !bg-accent-main !text-black shadow-xl 
          hover:scale-[1.02] active:scale-[0.98] transition-all"
          onClick={onStart}
          disabled={levels.length === 0}
        >
          GENERATE {levels.length || ""} CHALLENGES
        </Button>

      </div>
    </Modal>
  );
};

export default GenerationConfigModal;