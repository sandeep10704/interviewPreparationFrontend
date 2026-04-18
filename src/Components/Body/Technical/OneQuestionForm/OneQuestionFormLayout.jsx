import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "../../../Common";
import { getTechnicalSetById } from "../../../../store/technicalSlice";
import { connectSocket, sendMessage } from "../../../../store/technicalWsSlice";

// Components
import OneQuestionHero from "./Components/OneQuestionHero";
import OneQuestionCard from "./Components/OneQuestionCard";
import SessionReport from "./Components/SessionReport";
import { submitTechnicalAnswers } from "../../../../store/technicalSlice";


const OneQuestionFormLayout = () => {
   const { setId } = useParams();
   const navigate = useNavigate();
   const dispatch = useDispatch();

   const { selectedSet, loading } = useSelector((state) => state.technical);
   const { messages } = useSelector((state) => state.technicalWs);
   const user = useSelector((state) => state.auth.user);

   const [currentIndex, setCurrentIndex] = useState(0);
   const [answers, setAnswers] = useState({});
   const [isVerifying, setIsVerifying] = useState(false);
   const [feedbacks, setFeedbacks] = useState({});
   const [showFinalFeedback, setShowFinalFeedback] = useState(false);
   const handleSubmitAll = () => {
      const payload = {
         technical_set_id: selectedSet.technical_set_id,
         answers: answers
      };

      console.log("🚀 Submitting All Answers:", payload);

      dispatch(submitTechnicalAnswers(payload))
         .unwrap()
         .then((res) => {
            console.log("✅ Final Evaluation:", res);
            setShowFinalFeedback(true);
            setTimeout(() => {
               navigate("/technical");
            }, 10);// show report
         })
         .catch((err) => {
            console.error("❌ Submit Error:", err);
         });
   };
   // 🔥 Load questions
   useEffect(() => {
      if (setId) {
         dispatch(getTechnicalSetById(setId));
      }
   }, [setId, dispatch]);

   // 🔥 Connect WebSocket
   useEffect(() => {
      if (user?.token) {
         dispatch(connectSocket(user.token));
      }
   }, [user, dispatch]);

   // 🔥 Handle WS response
   useEffect(() => {
      if (messages.length > 0) {
         const latest = messages[messages.length - 1];

         console.log("WS RESPONSE:", latest);

         setFeedbacks((prev) => ({
            ...prev,
            [latest.question_no - 1]: latest
         }));

         setIsVerifying(false);
      }
   }, [messages]);

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

   // 🔥 Send Answer
   const handleVerify = () => {
      setIsVerifying(true);

      dispatch(
         sendMessage({
            technical_set_id: selectedSet.technical_set_id,
            question_no: currentIndex + 1,
            answer: answers[currentIndex]
         })
      );
   };
   useEffect(() => {
      const handler = (event) => {
         const data = event.detail;

         console.log("📥 Received in React:", data);

         setFeedbacks((prev) => ({
            ...prev,
            [data.question_no - 1]: data
         }));

         setIsVerifying(false);
      };

      window.addEventListener("ws_message", handler);

      return () => {
         window.removeEventListener("ws_message", handler);
      };
   }, []);
   if (loading || !selectedSet) {
      return (
         <div className="flex h-screen w-full items-center justify-center bg-[#01080E]">
            <div className="w-12 h-12 border-4 border-accent-main/20 border-t-accent-main rounded-full animate-spin"></div>
         </div>
      );
   }

   return (
      <div className="w-full min-h-screen bg-[#01080E] flex flex-col p-6 lg:p-12 relative overflow-hidden animate-fade-in text-left font-inter">

         {/* Background Neural Pulse (UNCHANGED) */}
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

               {/* Progress Bar */}
               <div className="h-1 bg-white/5 w-full relative">
                  <div
                     className="h-full bg-accent-main shadow-[0_0_15px_#32d0c8] transition-all duration-1000 ease-out"
                     style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
                  ></div>
               </div>

               <div className="flex-1 flex flex-col p-8 lg:p-16">

                  {/* ✅ ALWAYS SHOW CARD (IMPORTANT FIX) */}
                  <OneQuestionCard
                     question={questions[currentIndex]}
                     index={currentIndex}
                     total={questions.length}
                     answer={answers[currentIndex] || ""}
                     feedback={feedbacks[currentIndex]}   // ✅ feedback
                     loading={isVerifying}                // ✅ loader
                     onAnswerChange={handleAnswerChange}
                     onNext={handleNext}
                     onPrev={handlePrev}
                     onVerify={handleVerify}
                     isLast={currentIndex === questions.length - 1}
                     user={user}
                     onSubmitAll={handleSubmitAll}
                  />

               </div>
            </div>
         </div>
      </div>
   );
};

export default OneQuestionFormLayout;