import React from "react";
import { Typography, Button, Modal } from "../../../Common";

const GenerationStatusModal = ({
  isOpen,
  onClose,
  genStatus,
  countdown,
  config,
  formatTime
}) => {
  const difficulty = config?.difficulty || "easy";
  const count = config?.count || 1;

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => genStatus !== "generating" && onClose()}
      title="AI Generating Set"
      maxWidth="500px"
    >
      <div className="text-center py-8 space-y-8">

        {/* spinner */}
        <div className="relative inline-flex flex-col items-center">
          <div className="w-24 h-24 rounded-full border-4 border-white/10 border-t-accent-main animate-spin"></div>

          <div className="absolute top-1/2 left-1/2 
          -translate-x-1/2 -translate-y-1/2 
          text-xl font-mono font-black text-white">
            {formatTime(countdown)}
          </div>
        </div>

        {/* animated dots */}
        <div className="space-y-4">
          <div className="inline-flex gap-1.5 justify-center">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-accent-main animate-bounce"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>

          <Typography variant="h3" className="!mb-0">
            Neural engine at work
          </Typography>

          <Typography variant="body" className="text-text-subtle italic">
            Generating{" "}
            <span className="text-accent-main font-black">
              {count}
            </span>{" "}
            <span className="uppercase font-black text-accent-main">
              {difficulty}
            </span>{" "}
            challenge{count > 1 ? "s" : ""}
          </Typography>
        </div>

        {/* info box */}
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-left">
          <Typography className="text-xs text-text-subtle">
            AI is creating interview-level problems with:
          </Typography>

          <div className="mt-2 space-y-1 text-xs text-text-subtle">
            <div>• Optimal algorithm required</div>
            <div>• Edge case heavy inputs</div>
            <div>• Real interview difficulty</div>
            <div>• Deterministic test cases</div>
          </div>
        </div>

        {/* buttons */}
        <div className="flex gap-4 pt-4">
          <Button
            className="flex-1 !rounded-2xl h-14 !text-sm 
            flex items-center justify-center gap-2 
            bg-accent-main text-black font-black 
            animate-pulse shadow-[0_0_20px_rgba(50,208,200,0.3)]"
          >
            <div className="w-2 h-2 rounded-full bg-black animate-ping"></div>
            Generating...
          </Button>

          <Button
            variant="outline"
            className="flex-1 !rounded-2xl h-14 !text-sm 
            border-white/10 text-white/60 hover:text-white"
            onClick={onClose}
          >
            Close
          </Button>
        </div>

      </div>
    </Modal>
  );
};

export default GenerationStatusModal;