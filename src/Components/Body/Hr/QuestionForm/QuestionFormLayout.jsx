import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Typography, Button } from "../../../Common";
import { submitHRAnswers, resetHRSession } from "../../../../store/hrSlice";
import HrQuestionItem from "./Components/HrQuestionItem";

const QuestionFormLayout = () => {
  const { setId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { selectedSet, loading, error } = useSelector((state) => state.hr);
  const [answers, setAnswers] = useState({});

  // Use the questions from the selectedSet (generated in the dashboard)
  // or fall back to an empty list
  const questions = selectedSet?.questions || [];

  const handleAnswerChange = (qIndex, value) => {
    setAnswers(prev => ({ ...prev, [qIndex]: value }));
  };

  const handleSubmit = async () => {
    if (Object.keys(answers).length === 0) return;
    
    // According to OpenAPI, HR answers must be a dictionary { additionalProperties: string }
    const resultAction = await dispatch(submitHRAnswers({
       hr_set_id: setId,
       answers: answers
    }));

    if (submitHRAnswers.fulfilled.match(resultAction)) {
       dispatch(resetHRSession());
       navigate("/hr");
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#01080E] px-6 lg:px-20 py-12 space-y-12 animate-fade-in text-left relative font-inter">
      <div className="max-w-4xl mx-auto space-y-12 relative z-10">
        {/* Header */}
        <div className="flex flex-col space-y-4">
           <div className="flex items-center justify-between">
              <button 
                onClick={() => navigate("/hr")}
                className="text-[10px] font-black text-accent-main uppercase tracking-widest flex items-center gap-2 hover:opacity-70 transition-opacity"
              >
                 <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7"/></svg>
                 Exit to Arena
              </button>
           </div>
           
           <Typography variant="h1" className="!text-5xl font-black tracking-tighter leading-tight">
              Behavioral <span className="text-accent-main">Assessment</span>
           </Typography>
           
           <div className="inline-flex px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-black text-text-subtle uppercase tracking-widest">
              HR Set: {setId?.toUpperCase()}
           </div>
        </div>

        {error && (
           <div className="p-4 rounded-2xl bg-error/10 border border-error/20 text-error text-xs font-bold uppercase tracking-widest text-center">
              System Error: {typeof error === 'string' ? error : "Submission Failure"}
           </div>
        )}

        {/* Questions List */}
        <div className="space-y-10">
           {questions.length > 0 ? (
              questions.map((q, index) => {
                 const questionText = typeof q === 'string' ? q : q.question || q.text;
                 return (
                    <HrQuestionItem
                      key={index}
                      question={{ question: questionText }}
                      index={index}
                      answer={answers[index]}
                      onAnswerChange={(val) => handleAnswerChange(index, val)}
                      disabled={loading}
                    />
                 );
              })
           ) : (
              <div className="py-20 text-center border border-dashed border-white/10 rounded-[48px]">
                 <Typography className="text-text-subtle opacity-40 uppercase tracking-widest font-black text-xs">Awaiting Neural Synthesis...</Typography>
                 <Typography className="text-[10px] text-accent-main mt-4">If questions do not appear, please generate a new session.</Typography>
              </div>
           )}
        </div>

        {/* Action Button */}
        {questions.length > 0 && (
           <div className="flex justify-center pt-8">
              <Button 
                onClick={handleSubmit}
                disabled={loading}
                className="!rounded-3xl px-16 py-6 font-black tracking-widest shadow-2xl transition-all shadow-accent-main/30"
              >
                {loading ? "RECORDING RESPONSES..." : "FINALIZE HR SESSION"}
              </Button>
           </div>
        )}
      </div>
    </div>
  );
};

export default QuestionFormLayout;