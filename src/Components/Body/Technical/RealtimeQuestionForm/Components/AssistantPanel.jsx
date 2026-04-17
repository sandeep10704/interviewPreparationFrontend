import React from "react";
import { Typography } from "../../../../Common";

const AssistantPanel = ({ activeTab, setActiveTab, showSidePanel, onClose, aiChat, currentInput, setCurrentInput, handleSendMessage }) => {
  if (!showSidePanel) return null;

  return (
    <div className="w-96 bg-[#01080E]/40 backdrop-blur-3xl border border-white/10 rounded-[32px] flex flex-col overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] h-full transition-all animate-slide-in-right">
       <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
          <div className="flex items-center gap-6">
             {["AI Assistant", "Chat"].map(tab => (
                <button 
                   key={tab}
                   onClick={() => setActiveTab(tab)}
                   className={`text-[10px] font-black uppercase tracking-[0.2em] transition-all relative py-1 ${activeTab === tab ? "text-accent-main" : "text-text-subtle opacity-40 hover:opacity-100"}`}
                >
                   {tab}
                   {activeTab === tab && <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-accent-main shadow-[0_0_5px_#32d0c8]"></div>}
                </button>
             ))}
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/5 text-text-subtle transition-colors">
             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
       </div>

       {/* Chat Content */}
       <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
          {aiChat.map((msg, idx) => (
             <div key={idx} className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"} gap-2`}>
                <Typography className="text-[9px] font-black text-text-subtle/50 uppercase tracking-widest">{msg.role === "ai" ? "Neural Intelligence" : "Your Query"}</Typography>
                <div className={`max-w-[90%] p-4 rounded-2xl text-[13px] leading-relaxed transition-all transform hover:scale-[1.02] ${msg.role === "user" ? "bg-accent-main/10 border border-accent-main/20 text-white shadow-[0_5px_15px_rgba(50,208,206,0.05)]" : "bg-white/5 border border-white/5 text-text-subtle"}`}>
                   {msg.text}
                </div>
             </div>
          ))}
       </div>

       {/* Chat Input */}
       <div className="p-6 border-t border-white/10 bg-white/[0.01]">
          <div className="relative group">
             <input 
                type="text" 
                className="w-full bg-black/40 border border-white/10 rounded-2xl pl-6 pr-14 py-4 text-[13px] text-white placeholder:text-text-subtle/30 focus:border-accent-main/40 outline-none transition-all shadow-inner font-inter"
                placeholder="Message neural host..."
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
             />
             <button 
                onClick={handleSendMessage}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-accent-main text-black flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-[0_0_15px_rgba(50,208,206,0.4)]"
             >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 19l9-7-9-7V11h-9v2h9v5z"/></svg>
             </button>
          </div>
       </div>
    </div>
  );
};

export default AssistantPanel;
