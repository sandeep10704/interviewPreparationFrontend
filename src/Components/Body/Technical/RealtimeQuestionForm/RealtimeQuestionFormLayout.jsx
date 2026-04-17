import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTechnicalSetById } from "../../../../store/technicalSlice";

// Modular Components
import InterviewerTile from "./Components/InterviewerTile";
import CandidateTile from "./Components/CandidateTile";
import AssistantPanel from "./Components/AssistantPanel";
import ControlBar from "./Components/ControlBar";
import QuestionWorkspace from "./Components/QuestionWorkspace";

const RealtimeQuestionFormLayout = () => {
  const { setId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { selectedSet, loading } = useSelector((state) => state.technical);
  const user = useSelector((state) => state.auth.user);

  const [answers, setAnswers] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("AI Assistant");
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCamOn, setIsCamOn] = useState(true);
  const [showSidePanel, setShowSidePanel] = useState(true);
  const [aiChat, setAiChat] = useState([
    { role: "ai", text: "Neural session initialized. Proceed with your architectural explanation." }
  ]);
  const [currentInput, setCurrentInput] = useState("");

  useEffect(() => {
    if (setId) {
      dispatch(getTechnicalSetById(setId));
    }
  }, [setId, dispatch]);

  const handleSendMessage = () => {
    if (!currentInput.trim()) return;
    setAiChat(prev => [...prev, { role: "user", text: currentInput }]);
    setCurrentInput("");
    setTimeout(() => {
      setAiChat(prev => [...prev, { role: "ai", text: "Optimizing analysis path... suggest focusing on RAG scalability for the current prompt." }]);
    }, 1000);
  };

  const handleAnswerChange = (idx, val) => {
    setAnswers(prev => ({ ...prev, [idx]: val }));
  };

  if (loading || !selectedSet) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#01080E]">
        <div className="w-12 h-12 border-4 border-accent-main/20 border-t-accent-main rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[9999] bg-[#01080E] text-left flex flex-col font-inter overflow-hidden">
      
      {/* Upper Main Arena */}
      <div className="flex-1 flex overflow-hidden p-6 gap-6 min-h-0">
        
        {/* Stage Area */}
        <div className="flex-1 flex flex-col gap-6 min-h-0 overflow-hidden">
          
          {/* Top Video Grid */}
          <div className="h-1/2 min-h-[300px] grid grid-cols-1 md:grid-cols-2 gap-6">
             <InterviewerTile />
             <CandidateTile user={user} isCamOn={isCamOn} isMicOn={isMicOn} />
          </div>

          {/* Bottom Interactive Workspace */}
          <div className="flex-1 min-h-[250px] overflow-hidden">
             <QuestionWorkspace 
                questions={selectedSet.questions || []}
                currentIndex={currentIndex}
                answers={answers}
                onAnswerChange={handleAnswerChange}
             />
          </div>
        </div>

        {/* Side Intelligent Layer */}
        <AssistantPanel 
           activeTab={activeTab}
           setActiveTab={setActiveTab}
           showSidePanel={showSidePanel}
           onClose={() => setShowSidePanel(false)}
           aiChat={aiChat}
           currentInput={currentInput}
           setCurrentInput={setCurrentInput}
           handleSendMessage={handleSendMessage}
        />
      </div>

      {/* Control Navigation Center */}
      <ControlBar 
         isMicOn={isMicOn}
         toggleMic={() => setIsMicOn(!isMicOn)}
         isCamOn={isCamOn}
         toggleCam={() => setIsCamOn(!isCamOn)}
         onDisconnect={() => navigate("/technical")}
         showSidePanel={showSidePanel}
         toggleSidePanel={() => setShowSidePanel(!showSidePanel)}
         sessionId={setId}
      />
    </div>
  );
};

export default RealtimeQuestionFormLayout;