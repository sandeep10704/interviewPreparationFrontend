import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Typography } from "../../../Common";
import OneQuestionHero from "./Components/OneQuestionHero";
import OneQuestionCard from "./Components/OneQuestionCard";
import SessionReport from "./Components/SessionReport";

const OneQuestionFormLayout = () => {
  const { setId } = useParams();
  const navigate = useNavigate();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isVerifying, setIsVerifying] = useState(false);
  const [showFinalFeedback, setShowFinalFeedback] = useState(false);

  const mockQuestions = [
    { 
      question: "Explicate the concept of closures in JavaScript and provide a practical use case.", 
      feedback: "Your explanation of lexical scope was solid. However, try to emphasize the 'encapsulation' aspect more. A common practical use case is data privacy or function factories." 
    },
    { 
      question: "Compare and contrast SQL and NoSQL databases in terms of horizontal scalability.", 
      feedback: "Correct identification of CAP theorem constraints. Remember that while SQL can scale horizontally (sharding), NoSQL is natively designed for it via partitioning." 
    },
    { 
      question: "How does the 'this' keyword behave differently in arrow functions vs regular functions?", 
      feedback: "Great point about lexical binding! Arrow functions don't have their own 'this'. This makes them perfect for callbacks where context preservation is critical." 
    }
  ];

  const handleAnswerChange = (value) => {
    setAnswers(prev => ({ ...prev, [currentIndex]: value }));
  };

  const handleNext = () => {
    if (currentIndex < mockQuestions.length - 1) setCurrentIndex(prev => prev + 1);
  };

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(prev => prev - 1);
  };

  const handleVerify = () => {
    setIsVerifying(true);
    setTimeout(() => {
       setIsVerifying(false);
       setShowFinalFeedback(true);
    }, 2500);
  };

  return (
    <div className="w-full min-h-screen bg-[#01080E] flex items-center justify-center p-6 lg:p-20 relative overflow-hidden animate-fade-in text-left">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none opacity-20">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-accent-main/5 blur-[200px] rounded-full animate-pulse"></div>
      </div>

      <div className="w-full max-w-4xl relative z-10 space-y-10">
         <OneQuestionHero 
            currentIndex={currentIndex} 
            totalQuestions={mockQuestions.length} 
            onAbort={() => navigate("/technical")} 
         />

         <div className="relative p-12 lg:p-16 rounded-[60px] bg-gradient-to-b from-white/[0.05] to-transparent border border-white/10 backdrop-blur-2xl shadow-3xl min-h-[550px] flex flex-col justify-between overflow-hidden">
            {isVerifying ? (
               <div className="flex-1 flex flex-col items-center justify-center space-y-8 animate-pulse text-center">
                  <div className="w-20 h-20 rounded-3xl border-2 border-dashed border-accent-main animate-spin-slow"></div>
                  <Typography variant="h2" className="!mb-0 uppercase tracking-widest leading-tight">Neural Synthesis <br />In Progress...</Typography>
                  <Typography className="text-xs text-text-subtle opacity-50 font-mono tracking-widest">ANALYZING TECHNICAL DEPTH</Typography>
               </div>
            ) : showFinalFeedback ? (
               <SessionReport 
                  questions={mockQuestions} 
                  onExit={() => navigate("/technical")} 
               />
            ) : (
               <OneQuestionCard 
                  question={mockQuestions[currentIndex]}
                  index={currentIndex}
                  answer={answers[currentIndex]}
                  onAnswerChange={handleAnswerChange}
                  onNext={handleNext}
                  onPrev={handlePrev}
                  onVerify={handleVerify}
                  isLast={currentIndex === mockQuestions.length - 1}
               />
            )}
         </div>
      </div>
    </div>
  );
};

export default OneQuestionFormLayout;