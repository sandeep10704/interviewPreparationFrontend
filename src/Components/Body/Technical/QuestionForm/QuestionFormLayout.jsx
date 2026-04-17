import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Typography, Button } from "../../../Common";
import { getTechnicalSetById, submitTechnicalAnswers, resetSelectedSet } from "../../../../store/technicalSlice";
import QuestionItem from "./Components/QuestionItem";

const QuestionFormLayout = () => {
  const { setId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { selectedSet, loading, evaluation, error } = useSelector((state) => state.technical);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    if (setId) {
      dispatch(getTechnicalSetById(setId));
    }
    return () => {
       dispatch(resetSelectedSet());
    };
  }, [setId, dispatch]);

  const handleAnswerChange = (qIndex, value) => {
    setAnswers(prev => ({ ...prev, [qIndex]: value }));
  };

  const handleSubmit = () => {
    if (Object.keys(answers).length === 0) return;
    
    // Map numerical indices to expected answer format if necessary
    // OpenAPI says answers is a dictionary { additionalProperties: string }
    dispatch(submitTechnicalAnswers({
       technical_set_id: setId,
       answers: answers
    }));
  };

  if (loading && !selectedSet) {
     return (
        <div className="w-full min-h-screen bg-[#01080E] flex items-center justify-center">
           <div className="w-12 h-12 border-4 border-accent-main/20 border-t-accent-main rounded-full animate-spin"></div>
        </div>
     );
  }

  const questions = selectedSet?.questions || [];
  const isSubmitted = !!evaluation;

  return (
    <div className="w-full min-h-screen bg-[#01080E] px-6 lg:px-20 py-12 space-y-12 animate-fade-in text-left relative overflow-hidden">
      <div className="max-w-4xl mx-auto space-y-12 relative z-10">
        {/* Header */}
        <div className="flex flex-col space-y-4">
           <div className="flex items-center justify-between">
              <button 
                onClick={() => navigate("/technical")}
                className="text-[10px] font-black text-accent-main uppercase tracking-widest flex items-center gap-2 hover:opacity-70 transition-opacity"
              >
                 <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7"/></svg>
                 Exit to Arena
              </button>
           </div>
           
           <Typography variant="h1" className="!text-5xl font-black tracking-tighter leading-tight">
              {isSubmitted ? "Evaluation" : "Assessment"} <span className="text-accent-main">Phase</span>
           </Typography>
           
           <div className="flex items-center gap-4">
               <div className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-black text-text-subtle uppercase tracking-widest">
                  Technical Set: {setId?.toUpperCase()}
               </div>
               {isSubmitted && (
                  <div className="px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-[10px] font-black text-violet-400 uppercase tracking-widest">
                     Session Evaluated
                  </div>
               )}
           </div>
        </div>

        {error && (
           <div className="p-4 rounded-2xl bg-error/10 border border-error/20 text-error text-xs font-bold uppercase tracking-widest text-center">
              System Error: {typeof error === 'string' ? error : "Authentication or Synthesis Failure"}
           </div>
        )}

        {/* Questions List */}
        <div className="space-y-10 text-left">
           {questions.map((q, index) => {
              const questionContent = typeof q === 'string' ? q : q.question || q.text;
              const feedback = evaluation?.feedback?.[index] || evaluation?.feedback; // Logic depends on backend feedback format
              
              return (
                 <QuestionItem
                   key={index}
                   question={{ question: questionContent, feedback: feedback }}
                   index={index}
                   answer={answers[index]}
                   onAnswerChange={(val) => handleAnswerChange(index, val)}
                   showFeedback={isSubmitted}
                   disabled={loading}
                 />
              );
           })}
        </div>

        {/* Action Button */}
        {!isSubmitted && questions.length > 0 && (
           <div className="flex justify-center pt-8">
              <Button 
                onClick={handleSubmit}
                disabled={loading}
                className="!rounded-3xl px-16 py-6 font-black tracking-widest shadow-2xl transition-all bg-accent-main shadow-accent-main/30"
              >
                {loading ? "SYNTHESIZING FEEDBACK..." : "SUBMIT FOR EVALUATION"}
              </Button>
           </div>
        )}
      </div>
    </div>
  );
};

export default QuestionFormLayout;