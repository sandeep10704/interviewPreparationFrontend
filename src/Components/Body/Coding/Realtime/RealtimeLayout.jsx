import { useEffect, useMemo, useState, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { Modal, Typography, Button } from "../../../Common";

import ProblemDescription from "./Components/ProblemDescription";
import CodeEditor from "./Components/CodeEditor";
import TestResults from "./Components/TestResults";

import {
  connectCodingWS,
  startCoding,
  startTyping,
  disconnectCodingWS
} from "../../../../store/codingWSSlice";

import {
  getCodingSetById,
  setCode,
  setLanguage,
  nextQuestion,
  prevQuestion
} from "../../../../store/codingSetSlice";

import {
  runCode,
  submitCode,
  clearResults
} from "../../../../store/codingExecutionSlice";

import { getSuggestion, clearSuggestion } from "../../../../store/codingRealtimeSlice";

const RealtimeLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { setId } = useParams();

  const user = useSelector(state => state.auth.user);
  const token = useSelector(state => state.auth.user?.token) || sessionStorage.getItem("token");
  const connected = useSelector((state) => state.codingWS.connected);

  const {
    selectedSet,
    currentIndex,
    codesByQuestion,
    language
  } = useSelector((state) => state.codingSets);

  const {
    runLoading,
    submitLoading,
    runResult,
    submitResult
  } = useSelector((state) => state.codingExecution);

  const {
    suggestionLoading,
    suggestion
  } = useSelector((state) => state.codingRealtime);

  const [resultsHeight, setResultsHeight] = useState(30);
  const [isResizing, setIsResizing] = useState(false);
  const [showSidePanel, setShowSidePanel] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCamOn, setIsCamOn] = useState(true);
  const [aiChat, setAiChat] = useState([
    { role: "ai", text: "Neural session connected. I am monitoring your code logic in real-time." }
  ]);
  const [currentInput, setCurrentInput] = useState("");
  const containerRef = useRef(null);

  const startResizing = () => setIsResizing(true);
  const stopResizing = () => setIsResizing(false);

  useEffect(() => {
    if (!isResizing) return;
    const onResize = (e) => {
      if (!containerRef.current) return;
      const containerHeight = containerRef.current.offsetHeight;
      const offsetTop = containerRef.current.getBoundingClientRect().top;
      const mousePos = e.clientY - offsetTop;
      const newHeight = ((containerHeight - mousePos) / containerHeight) * 100;
      if (newHeight > 20 && newHeight < 80) setResultsHeight(newHeight);
    };
    window.addEventListener("mousemove", onResize);
    window.addEventListener("mouseup", stopResizing);
    return () => {
      window.removeEventListener("mousemove", onResize);
      window.removeEventListener("mouseup", stopResizing);
    };
  }, [isResizing]);

  useEffect(() => {
    if (setId) dispatch(getCodingSetById(setId));
  }, [setId, dispatch]);

  useEffect(() => {
    dispatch(clearResults());
    dispatch(clearSuggestion());
  }, [currentIndex, dispatch]);

  const currentQuestion = selectedSet?.questions?.[currentIndex];
  const code = codesByQuestion[currentIndex] || "";
  const codeRef = useRef(code);

  useEffect(() => {
    codeRef.current = code;
  }, [code]);

  useEffect(() => {
    if (!token || !setId) return;
    dispatch(connectCodingWS(token));
  }, [token, setId, dispatch]);

  useEffect(() => {
    if (!connected || !currentQuestion) return;
    dispatch(startCoding({ coding_set_id: setId, question_no: currentIndex }));
    dispatch(startTyping({
       coding_set_id: setId,
       question_no: currentIndex,
       getCode: () => codeRef.current
    }));
  }, [connected, currentIndex, currentQuestion, dispatch, setId]);

  const handleSendMessage = () => {
    if (!currentInput.trim()) return;
    setAiChat(prev => [...prev, { role: "user", text: currentInput }]);
    setCurrentInput("");
    // Simulate AI response
    setTimeout(() => {
       setAiChat(prev => [...prev, { role: "ai", text: "Analyzing your implementation... consider optimizing the space complexity of this approach." }]);
    }, 1000);
  };

  const { results, isSubmission } = useMemo(() => {
    const rawResult = submitResult || runResult;
    if (!rawResult) return { results: [], isSubmission: false };
    const cases = rawResult.results || rawResult.cases || rawResult.data || [];
    return {
      results: cases.map((r, i) => ({
        id: i,
        passed: r.passed ?? r.status === "passed",
        userOutput: r.output ?? r.stdout ?? r.userOutput
      })),
      isSubmission: !!submitResult
    };
  }, [runResult, submitResult]);

  if (!currentQuestion) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#01080E]">
        <div className="w-12 h-12 border-4 border-accent-main/20 border-t-accent-main rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[9999] bg-[#01080E] flex flex-col overflow-hidden text-left font-inter">
      
      {/* Upper Workspace */}
      <div className="flex-1 flex overflow-hidden p-4 gap-4 pb-24">
        
        {/* Main Coding Area */}
        <div className="flex-1 flex flex-col rounded-3xl overflow-hidden border border-white/10 bg-white/5 shadow-2xl">
           <div className="flex h-full min-h-0">
              {/* Problem Spec */}
              <div className="w-1/3 min-w-[300px] border-r border-white/10 overflow-hidden flex flex-col">
                 <div className="px-6 py-4 bg-white/[0.02] border-b border-white/10">
                    <Typography className="text-[10px] font-black tracking-widest text-accent-main uppercase">Problem Specification</Typography>
                 </div>
                 <div className="flex-1 overflow-y-auto custom-scrollbar">
                    <ProblemDescription question={currentQuestion} />
                 </div>
              </div>

              {/* Editor Stage */}
              <div ref={containerRef} className="flex-1 flex flex-col min-w-0 bg-[#030E17]">
                 <div className="shrink-0 min-h-0 relative" style={{ height: results.length > 0 ? `${100 - resultsHeight}%` : "100%" }}>
                    <CodeEditor 
                       code={code}
                       setCode={(val) => dispatch(setCode(val))}
                       language={language}
                       setLanguage={(val) => dispatch(setLanguage(val))}
                       onRun={() => dispatch(runCode({ coding_set_id: setId, question_no: currentIndex, code, language }))}
                       onSubmit={() => dispatch(submitCode({ coding_set_id: setId, question_index: currentIndex, code, language }))}
                       onSuggest={() => dispatch(getSuggestion({ code, language, question: currentQuestion.title }))}
                       runLoading={runLoading}
                       submitLoading={submitLoading}
                       suggestionLoading={suggestionLoading}
                       isRealtime={true}
                    />
                 </div>
                 {results.length > 0 && (
                    <>
                       <div className="h-1 cursor-row-resize bg-accent-main/20 hover:bg-accent-main/60 transition-all" onMouseDown={startResizing} />
                       <div className="flex-1 bg-[#01080E] overflow-hidden" style={{ height: `${resultsHeight}%` }}>
                          <TestResults 
                             testCases={currentQuestion.test_cases}
                             results={results}
                             isSubmission={isSubmission}
                             loading={runLoading || submitLoading}
                          />
                       </div>
                    </>
                 )}
              </div>
           </div>
        </div>

        {/* Meet Sidebar (AI Assistant & Camera Toggles) */}
        {showSidePanel && (
           <div className="w-96 flex flex-col gap-4">
              {/* Video Grid (Small) */}
              <div className="grid grid-cols-1 gap-4">
                 <div className="h-48 rounded-2xl bg-white/5 border border-white/10 relative overflow-hidden group shadow-lg">
                    <div className="absolute inset-0 flex items-center justify-center animate-pulse">
                        <div className="w-12 h-12 rounded-full bg-accent-main/20 flex items-center justify-center">
                            <Typography className="text-accent-main font-black text-xs">AI</Typography>
                        </div>
                    </div>
                    <div className="absolute bottom-3 left-3 px-2 py-0.5 rounded bg-black/40 backdrop-blur-md text-[8px] font-black text-white border border-white/10 uppercase tracking-widest">Interviewer (Host)</div>
                 </div>
                 <div className="h-48 rounded-2xl bg-white/5 border border-white/10 relative overflow-hidden group shadow-lg">
                    {isCamOn ? (
                       <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                          <Typography className="text-2xl font-black opacity-10 uppercase">{user?.displayName?.[0]}</Typography>
                       </div>
                    ) : (
                       <div className="absolute inset-0 bg-black flex items-center justify-center">
                          <Typography className="text-[10px] font-black uppercase text-text-subtle tracking-widest">Camera Off</Typography>
                       </div>
                    )}
                    <div className="absolute bottom-3 left-3 px-2 py-0.5 rounded bg-black/40 backdrop-blur-md text-[8px] font-black text-white border border-white/10 uppercase tracking-widest">You</div>
                    <div className="absolute top-3 right-3">
                       <div className={`w-2 h-2 rounded-full ${isMicOn ? "bg-accent-main" : "bg-error"} shadow-[0_0_8px_currentColor]`}></div>
                    </div>
                 </div>
              </div>

              {/* AI Assistant Chat */}
              <div className="flex-1 bg-white/5 border border-white/10 rounded-3xl flex flex-col overflow-hidden shadow-2xl">
                 <div className="p-5 bg-white/[0.02] border-b border-white/10 flex items-center justify-between">
                    <Typography className="text-[10px] font-black tracking-widest text-accent-main uppercase">Neural AI Assistant</Typography>
                    <button onClick={() => setShowSidePanel(false)} className="text-text-subtle hover:text-white transition-opacity">
                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
                    </button>
                 </div>
                 <div className="flex-1 overflow-y-auto p-5 space-y-4 custom-scrollbar">
                    {aiChat.map((msg, idx) => (
                       <div key={idx} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} gap-1.5`}>
                          <div className={`max-w-[85%] p-3.5 rounded-2xl text-[12px] leading-relaxed ${msg.role === 'user' ? 'bg-accent-main text-black font-semibold' : 'bg-white/5 border border-white/5 text-text-subtle'}`}>
                             {msg.text}
                          </div>
                       </div>
                    ))}
                 </div>
                 <div className="p-4 bg-white/[0.02] border-t border-white/10 flex gap-2">
                    <input 
                       type="text" 
                       className="flex-1 bg-black/40 border border-white/5 rounded-xl px-4 py-2.5 text-xs text-white placeholder:opacity-30 outline-none focus:border-accent-main/30 transition-all font-inter"
                       placeholder="Message interviewer..."
                       value={currentInput}
                       onChange={(e) => setCurrentInput(e.target.value)}
                       onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    />
                    <button 
                       onClick={handleSendMessage}
                       className="w-10 h-10 rounded-xl bg-accent-main flex items-center justify-center text-black hover:scale-105 transition-transform"
                    >
                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 19l9-7-9-7V11h-9v2h9v5z"/></svg>
                    </button>
                 </div>
              </div>
           </div>
        )}
      </div>

      {/* Floating Control Bar (The "Meet" Bottom Bar) */}
      <div className="h-24 absolute bottom-0 left-0 w-full bg-[#01080E] flex items-center justify-between px-10 z-[60]">
         <div className="hidden lg:flex items-center gap-6">
            <Typography className="text-sm font-black text-white">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Typography>
            <Typography className="text-[10px] font-black text-text-subtle uppercase tracking-widest">{selectedSet?.title || "Real-time Technical Interview"}</Typography>
         </div>

         <div className="flex items-center gap-4 bg-white/5 px-8 py-3 rounded-full border border-white/5 shadow-2xl">
            <button 
               onClick={() => setIsMicOn(!isMicOn)}
               className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${isMicOn ? "bg-white/10 text-white hover:bg-white/20" : "bg-error text-white shadow-lg shadow-error/30"}`}
            >
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"/></svg>
            </button>
            <button 
               onClick={() => setIsCamOn(!isCamOn)}
               className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${isCamOn ? "bg-white/10 text-white hover:bg-white/20" : "bg-error text-white shadow-lg shadow-error/30"}`}
            >
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
            </button>
            <button className="w-12 h-12 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all flex items-center justify-center">
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"/></svg>
            </button>
            <div className="w-px h-6 bg-white/10"></div>
            <button 
               onClick={() => navigate("/technical")}
               className="px-8 h-12 rounded-full bg-error hover:bg-red-600 text-white text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-xl shadow-error/20 transition-all"
            >
               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
               End Session
            </button>
         </div>

         <div className="hidden lg:flex items-center gap-6">
            <button onClick={() => setShowSidePanel(!showSidePanel)} className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${showSidePanel ? "bg-accent-main/10 text-accent-main" : "text-text-subtle hover:bg-white/5"}`}>
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            </button>
            <div className="flex items-center gap-2 text-white/40">
               <Typography className="text-[10px] font-black uppercase tracking-widest">Questions Remaining</Typography>
               <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-xs text-white">{(selectedSet?.questions?.length || 0) - currentIndex}</div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default RealtimeLayout;