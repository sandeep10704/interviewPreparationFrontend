import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "../../../Common";
import { getTechnicalSetById } from "../../../../store/technicalSlice";

// Components
import OneQuestionHero from "./Components/OneQuestionHero";
import OneQuestionCard from "./Components/OneQuestionCard";
import SessionReport from "./Components/SessionReport";

const OneQuestionFormLayout = () => {
  const { setId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { selectedSet, loading } = useSelector((state) => state.technical);
  const user = useSelector((state) => state.auth.user);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isVerifying, setIsVerifying] = useState(false);
  const [showFinalFeedback, setShowFinalFeedback] = useState(false);

  useEffect(() => {
    if (setId) {
      dispatch(getTechnicalSetById(setId));
    }
  }, [setId, dispatch]);

  const questions = selectedSet?.questions || [];

  const handleAnswerChange = (value) => {
    setAnswers(prev => ({ ...prev, [currentIndex]: value }));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
       setCurrentIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
       setCurrentIndex(prev => prev - 1);
    }
  };

  const handleVerify = () => {
    setIsVerifying(true);
    // Simulate deep synthesis
    setTimeout(() => {
       setIsVerifying(false);
       setShowFinalFeedback(true);
    }, 3000);
  };

  if (loading || !selectedSet) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#01080E]">
        <div className="w-12 h-12 border-4 border-accent-main/20 border-t-accent-main rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#01080E] flex flex-col p-6 lg:p-12 relative overflow-hidden animate-fade-in text-left font-inter">
      
      {/* Background Neural Pulse */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-accent-main/5 blur-[250px] rounded-full animate-pulse-slow"></div>
      </div>

      <div className="w-full max-w-5xl mx-auto relative z-10 space-y-8 flex-1 flex flex-col pt-10">
         
         <OneQuestionHero 
            currentIndex={currentIndex} 
            totalQuestions={questions.length} 
            onAbort={() => navigate("/technical")} 
         />

         <div className="flex-1 relative rounded-[48px] bg-[#01080E]/40 border border-white/5 backdrop-blur-3xl shadow-3xl flex flex-col overflow-hidden transition-all duration-700">
            
            {/* Progress Top Bar */}
            <div className="h-1 bg-white/5 w-full relative">
               <div 
                  className="h-full bg-accent-main shadow-[0_0_15px_#32d0c8] transition-all duration-1000 ease-out"
                  style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
               ></div>
            </div>

            <div className="flex-1 flex flex-col p-8 lg:p-16">
               {isVerifying ? (
                  <div className="flex-1 flex flex-col items-center justify-center space-y-10 animate-fade-in text-center">
                     <div className="relative">
                        <div className="w-24 h-24 rounded-[32px] border-2 border-accent-main/20 animate-spin-slow"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                           <div className="w-2 h-2 rounded-full bg-accent-main animate-ping"></div>
                        </div>
                     </div>
                     <div className="space-y-4">
                        <Typography variant="h2" className="!mb-0 uppercase tracking-[0.3em] font-black loading-tight">Generating Neural <br />Feedback Core</Typography>
                        <Typography className="text-[10px] text-text-subtle opacity-50 font-black tracking-[0.5em] uppercase">Status: Analyzing Technical Complexity</Typography>
                     </div>
                  </div>
               ) : showFinalFeedback ? (
                  <SessionReport 
                     questions={questions.map((q, i) => ({ ...q, user_answer: answers[i] }))} 
                     onExit={() => navigate("/technical")} 
                  />
               ) : (
                  <OneQuestionCard 
                     question={questions[currentIndex]}
                     index={currentIndex}
                     total={questions.length}
                     answer={answers[currentIndex] || ""}
                     onAnswerChange={handleAnswerChange}
                     onNext={handleNext}
                     onPrev={handlePrev}
                     onVerify={handleVerify}
                     isLast={currentIndex === questions.length - 1}
                     user={user}
                  />
               )}
            </div>
         </div>
      </div>
    </div>
  );
};

export default OneQuestionFormLayout;