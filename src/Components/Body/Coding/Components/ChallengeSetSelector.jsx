import React from "react";
import { Typography, Loading, Modal } from "../../../Common";

const ChallengeSetSelector = ({ isOpen, onClose, mode, setsLoading, codingSets, onSelect }) => {
  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title={`Select Challenge Set`}
      maxWidth="600px"
    >
      <div className="space-y-4">
        {setsLoading && <div className="py-20 flex justify-center"><Loading /></div>}
        <div className="grid grid-cols-1 gap-3 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
          {codingSets?.map((set) => (
            <div
              key={set.coding_set_id}
              onClick={() => onSelect(set)}
              className="group flex items-center justify-between p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-accent-main/30 hover:bg-white/[0.08] transition-all cursor-pointer"
            >
              <div className="flex-1 space-y-1">
                 <Typography variant="h3" className="!mb-0 group-hover:text-accent-main transition-colors">
                   {set.title || set.coding_set_id}
                 </Typography>
                 <Typography className="text-[10px] uppercase font-bold text-text-subtle tracking-widest flex items-center gap-3">
                    <span>{set.question_count || set.num_questions || set.total_questions || set.questions?.length || 0} Problems</span>
                    <span className="w-1 h-1 rounded-full bg-white/20"></span>
                    <span>{set.difficulty || 'Medium'}</span>
                 </Typography>
              </div>
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0">
                 <svg className="w-5 h-5 text-accent-main" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14m-7-7l7 7-7 7" />
                 </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default ChallengeSetSelector;
