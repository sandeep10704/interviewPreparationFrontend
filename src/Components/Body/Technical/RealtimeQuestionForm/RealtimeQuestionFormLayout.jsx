import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Typography, Button } from "../../../Common";
import { getTechnicalSetById } from "../../../../store/technicalSlice";

const RealtimeQuestionFormLayout = () => {
  const { setId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { selectedSet, loading } = useSelector((state) => state.technical);
  const [answers, setAnswers] = useState({});
  const [activeHint, setActiveHint] = useState(null);

  useEffect(() => {
    if (setId) {
      dispatch(getTechnicalSetById(setId));
    }
  }, [setId, dispatch]);

  const handleAnswerChange = (qIndex, value) => {
    setAnswers(prev => ({ ...prev, [qIndex]: value }));
  };

  if (loading || !selectedSet) {
     return (
        <div className="min-h-screen flex items-center justify-center bg-[#01080E]">
           <div className="w-12 h-12 border-4 border-accent-main/20 border-t-accent-main rounded-full animate-spin"></div>
        </div>
     );
  }

  const questions = selectedSet.questions || [];

  return (
    <div className="w-full min-h-screen bg-[#01080E] px-6 lg:px-20 py-12 space-y-12 animate-fade-in text-left relative overflow-hidden">
      {/* Realtime Scan Decor */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent-main/50 to-transparent animate-scan shadow-[0_0_15px_rgba(50,208,206,0.8)] z-50"></div>
      
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
           {/* Header */}
           <div className="flex flex-col space-y-4">
              <div className="flex items-center gap-4">
                 <button 
                  onClick={() => navigate("/technical")}
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-text-subtle hover:text-white transition-all shadow-lg"
                 >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>
                 </button>
                 <div className="px-3 py-1 rounded-full bg-error/10 border border-error/20 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-error animate-pulse shadow-[0_0_8px_rgba(255,87,87,1)]"></span>
                    <span className="text-[9px] font-black tracking-widest text-error uppercase">Live Evaluation Mode</span>
                 </div>
              </div>
              <Typography variant="h2" className="!text-5xl font-black tracking-tighter">
                 {selectedSet.title || "Neural Interview"}
              </Typography>
           </div>

           {/* Questions */}
           <div className="space-y-8">
              {questions.map((q, index) => (
                 <div 
                    key={index} 
                    className="p-10 rounded-[40px] bg-white/[0.02] border border-white/5 space-y-6 relative overflow-hidden group"
                 >
                    <div className="absolute top-0 left-0 w-1 h-full bg-accent-main opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="flex items-start gap-6">
                       <Typography variant="h3" className="!text-2xl font-bold flex-1">
                          {q.question || q.text || "Loading..."}
                       </Typography>
                       <button 
                          onClick={() => setActiveHint(index)}
                          className="px-4 py-2 rounded-xl bg-accent-main/10 border border-accent-main/20 text-[10px] font-black text-accent-main uppercase tracking-widest hover:bg-accent-main hover:text-black transition-all"
                       >
                          Analyze Query
                       </button>
                    </div>

                    <textarea 
                       className="w-full min-h-[150px] bg-[#01080E] border border-white/5 rounded-3xl p-8 text-white text-lg focus:border-accent-main/30 outline-none transition-all placeholder:opacity-10"
                       placeholder="AI is monitoring your technical depth..."
                       value={answers[index] || ""}
                       onChange={(e) => handleAnswerChange(index, e.target.value)}
                    />
                 </div>
              ))}
           </div>
        </div>

        {/* Realtime Sidebar */}
        <div className="space-y-8">
           <div className="sticky top-12 space-y-8">
              <div className="p-8 rounded-[40px] bg-gradient-to-br from-accent-main/10 to-transparent border border-accent-main/20 backdrop-blur-xl space-y-6">
                 <Typography variant="h4" className="!text-accent-main uppercase tracking-widest text-xs font-black">AI Live Analysis</Typography>
                 <div className="space-y-4">
                    <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-text-subtle">
                       <span>Interview Pace</span>
                       <span className="text-white">Normal</span>
                    </div>
                    <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                       <div className="w-[65%] h-full bg-accent-main shadow-[0_0_10px_#32d0c8]"></div>
                    </div>
                    <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-text-subtle">
                       <span>Technical Complexity</span>
                       <span className="text-white">High</span>
                    </div>
                    <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                       <div className="w-[85%] h-full bg-violet-500 shadow-[0_0_10px_#8b5cf6]"></div>
                    </div>
                 </div>
              </div>

              <div className="p-8 rounded-[40px] bg-white/5 border border-white/10 space-y-6 min-h-[300px]">
                 <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-violet-500/20 flex items-center justify-center text-violet-400">
                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                    </div>
                    <Typography className="text-xs font-black uppercase tracking-[0.2em]">Neural Hint</Typography>
                 </div>
                 
                 {activeHint !== null ? (
                    <div className="space-y-4 animate-slide-up">
                       <Typography className="text-sm border-l-2 border-accent-main pl-4 italic text-text-subtle leading-relaxed">
                          "Consider elaborating on your architecture decisions for Question {activeHint + 1}. The AI is looking for depth in scalability and error handling."
                       </Typography>
                       <Typography className="text-[10px] text-accent-main font-black uppercase tracking-widest">Recommendation generated</Typography>
                    </div>
                 ) : (
                    <div className="flex flex-col items-center justify-center py-10 opacity-30 text-center gap-4">
                       <div className="w-12 h-12 rounded-2xl border-2 border-dashed border-white/20 animate-spin-slow"></div>
                       <Typography className="text-[10px] font-black uppercase tracking-widest">Standby for AI suggestions</Typography>
                    </div>
                 )}
              </div>

              <Button className="w-full !rounded-[24px] py-6 shadow-[0_15px_40px_rgba(50,208,206,0.15)] text-lg">FINAL SUBMISSION</Button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default RealtimeQuestionFormLayout;