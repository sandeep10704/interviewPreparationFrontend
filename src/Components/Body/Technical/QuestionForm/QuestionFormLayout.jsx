import React, { useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { Typography, Button } from "../../../Common";
import QuestionItem from "./Components/QuestionItem";

const QuestionFormLayout = () => {
  const { setId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const viewFeedbackOnly = searchParams.get("view") === "feedback";

  const [answers, setAnswers] = useState({});
  const [isEvaluationRunning, setIsEvaluationRunning] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(viewFeedbackOnly);

  // Static Mock Questions for UI demonstration
  const mockQuestions = [
    { 
      id: "q1", 
      question: "Explicate the concept of closures in JavaScript and provide a practical use case.",
      feedback: "Your explanation of lexical scope is excellent! Closures are fundamental for data privacy (private variables) and functional patterns like currying."
    },
    { 
      id: "q2", 
      question: "Compare and contrast SQL and NoSQL databases in terms of horizontal scalability.",
      feedback: "Correct! While SQL is traditionally vertical, modern sharding allows horizontal growth. NoSQL, however, is designed for native horizontal partitioning."
    },
    { 
      id: "q3", 
      question: "How does the 'this' keyword behave differently in arrow functions vs regular functions?",
      feedback: "Perfect description of lexical binding. Arrow functions inherit 'this' from their parent scope, making them ideal for modern class components and callbacks."
    }
  ];

  const handleAnswerChange = (qId, value) => {
    setAnswers(prev => ({ ...prev, [qId]: value }));
  };

  const handleSubmit = () => {
    if (Object.keys(answers).length === 0) return;
    setIsEvaluationRunning(true);
    
    // Simulate Synthesis Delay
    setTimeout(() => {
      setIsEvaluationRunning(false);
      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 2000);
  };

  return (
    <div className="w-full min-h-screen bg-[#01080E] px-6 lg:px-20 py-12 space-y-12 animate-fade-in text-left relative">
      <div className="max-w-4xl mx-auto space-y-12">
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
                  Technical Set: {setId.toUpperCase()}
               </div>
               {isSubmitted && (
                  <div className="px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-[10px] font-black text-violet-400 uppercase tracking-widest">
                     Session Archived
                  </div>
               )}
           </div>
        </div>

        {/* Questions List */}
        <div className="space-y-10 text-left">
           {mockQuestions.map((q, index) => (
              <QuestionItem
                key={q.id}
                question={q}
                index={index}
                answer={answers[q.id]}
                onAnswerChange={(val) => handleAnswerChange(q.id, val)}
                showFeedback={isSubmitted}
                disabled={isEvaluationRunning}
              />
           ))}
        </div>

        {/* Action Button */}
        {!isSubmitted && (
           <div className="flex justify-center pt-8">
              <Button 
                onClick={handleSubmit}
                disabled={isEvaluationRunning}
                className={`!rounded-3xl px-16 py-6 font-black tracking-widest shadow-2xl transition-all bg-accent-main shadow-accent-main/30`}
              >
                {isEvaluationRunning ? "SYNTHESIZING FEEDBACK..." : "SUBMIT FOR EVALUATION"}
              </Button>
           </div>
        )}
      </div>
    </div>
  );
};

export default QuestionFormLayout;