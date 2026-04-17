import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Typography, Button } from "../../../Common";
import HrQuestionItem from "./Components/HrQuestionItem";

const QuestionFormLayout = () => {
  const { setId } = useParams();
  const navigate = useNavigate();
  
  const [answers, setAnswers] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Static Mock Questions for UI demonstration
  const mockQuestions = [
    { id: "q1", question: "Describe a situation where you had to resolve a conflict within a team. What were your specific actions?" },
    { id: "q2", question: "Tell me about a time you failed to meet a deadline. What did you learn from the experience?" },
    { id: "q3", question: "Why do you want to work for our organization specifically?" }
  ];

  const handleAnswerChange = (qId, value) => {
    setAnswers(prev => ({ ...prev, [qId]: value }));
  };

  const handleSubmit = () => {
    if (Object.keys(answers).length === 0) return;
    setIsSubmitting(true);
    
    // Simulate Submission
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Behavioral responses recorded successfully.");
      navigate("/hr");
    }, 1500);
  };

  return (
    <div className="w-full min-h-screen bg-[#01080E] px-6 lg:px-20 py-12 space-y-12 animate-fade-in text-left relative font-inter">
      <div className="max-w-4xl mx-auto space-y-12">
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
              HR Set: {setId.toUpperCase()}
           </div>
        </div>

        {/* Questions List */}
        <div className="space-y-10">
           {mockQuestions.map((q, index) => (
              <HrQuestionItem
                key={q.id}
                question={q}
                index={index}
                answer={answers[q.id]}
                onAnswerChange={(val) => handleAnswerChange(q.id, val)}
                disabled={isSubmitting}
              />
           ))}
        </div>

        {/* Action Button */}
        <div className="flex justify-center pt-8">
            <Button 
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="!rounded-3xl px-16 py-6 font-black tracking-widest shadow-2xl transition-all shadow-accent-main/30"
            >
              {isSubmitting ? "RECORDING RESPONSES..." : "FINALIZE HR SESSION"}
            </Button>
        </div>
      </div>
    </div>
  );
};

export default QuestionFormLayout;