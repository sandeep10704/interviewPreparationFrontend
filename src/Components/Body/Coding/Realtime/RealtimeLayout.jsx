import { useEffect, useMemo, useState, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Modal, Typography } from "../../../Common";

import ProblemDescription from "./Components/ProblemDescription";
import CodeEditor from "./Components/CodeEditor";
import TestResults from "./Components/TestResults";
import NavigationBar from "./Components/NavigationBar";

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
  const { setId } = useParams();

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
     suggestion,
     error: suggestionError
  } = useSelector((state) => state.codingRealtime);

  // Resizing logic
  const [resultsHeight, setResultsHeight] = useState(40);
  const [isResizing, setIsResizing] = useState(false);
  const containerRef = useRef(null);

  const startResizing = useCallback(() => setIsResizing(true), []);
  const stopResizing = useCallback(() => setIsResizing(false), []);

  const onResize = useCallback((e) => {
    if (!isResizing || !containerRef.current) return;
    const containerHeight = containerRef.current.offsetHeight;
    const offsetTop = containerRef.current.getBoundingClientRect().top;
    const mousePos = e.clientY - offsetTop;
    const newHeight = ((containerHeight - mousePos) / containerHeight) * 100;
    if (newHeight > 20 && newHeight < 80) setResultsHeight(newHeight);
  }, [isResizing]);

  useEffect(() => {
    if (isResizing) {
      window.addEventListener('mousemove', onResize);
      window.addEventListener('mouseup', stopResizing);
    } else {
      window.removeEventListener('mousemove', onResize);
      window.removeEventListener('mouseup', stopResizing);
    }
    return () => {
      window.removeEventListener('mousemove', onResize);
      window.removeEventListener('mouseup', stopResizing);
    };
  }, [isResizing, onResize, stopResizing]);

  useEffect(() => {
    if (setId) dispatch(getCodingSetById(setId));
  }, [setId, dispatch]);

  useEffect(() => {
    dispatch(clearResults());
    dispatch(clearSuggestion());
  }, [currentIndex, dispatch]);

  const currentQuestion = selectedSet?.questions?.[currentIndex];
  const code = codesByQuestion[currentIndex] || "";

  const handleGetSuggestion = () => {
     dispatch(getSuggestion({
        code,
        language,
        question: currentQuestion?.description || currentQuestion?.title
     }));
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

  const showResults = results.length > 0;

  if (!currentQuestion) return <div className="p-20 text-center"><Typography>Loading session...</Typography></div>;

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] w-full bg-background overflow-hidden text-left relative">
      <NavigationBar
        currentIndex={currentIndex}
        totalQuestions={selectedSet?.questions?.length}
        onPrev={() => dispatch(prevQuestion())}
        onNext={() => dispatch(nextQuestion())}
        mode="Realtime"
      />

      <div className="flex flex-1 overflow-hidden">
        <div className="w-[45%] min-w-[350px] border-r border-border-main/20 bg-[#01080E]">
          <ProblemDescription question={currentQuestion} />
        </div>

        <div ref={containerRef} className={`flex-1 flex flex-col bg-[#030E17] relative ${isResizing ? 'cursor-row-resize' : ''}`}>
          {isResizing && <div className="absolute inset-0 z-[100] cursor-row-resize bg-transparent" />}

          <div 
            className="shrink-0 min-h-0 relative overflow-hidden transition-height duration-0" 
            style={{ height: showResults ? `${100 - resultsHeight}%` : '100%' }}
          >
            <CodeEditor
              code={code}
              setCode={(val) => dispatch(setCode(val))}
              language={language}
              setLanguage={(val) => dispatch(setLanguage(val))}
              onRun={() => dispatch(runCode({ coding_set_id: setId, question_no: currentIndex, code, language }))}
              onSubmit={() => dispatch(submitCode({ coding_set_id: setId, question_index: currentIndex, code, language }))}
              onSuggest={handleGetSuggestion}
              runLoading={runLoading}
              submitLoading={submitLoading}
              suggestionLoading={suggestionLoading}
              isRealtime={true}
            />
          </div>

          {showResults && (
            <div className="flex-1 flex flex-col border-t border-border-main/30 bg-[#01080E] relative min-h-0" style={{ height: `${resultsHeight}%` }}>
              <div className="absolute -top-1.5 left-0 right-0 h-3 cursor-row-resize z-[110] group flex items-center justify-center" onMouseDown={startResizing}>
                <div className="w-full h-[1px] bg-border-main/20 group-hover:bg-accent-main/50 transition-colors"></div>
                <div className="absolute w-12 h-1 rounded-full bg-border-main/40 group-hover:bg-accent-main group-hover:w-16 transition-all shadow-[0_0_10px_rgba(50,208,200,0.4)]"></div>
              </div>
              <div className="flex-1 overflow-hidden">
                <TestResults testCases={currentQuestion.test_cases} results={results} isSubmission={isSubmission} loading={runLoading || submitLoading} />
              </div>
            </div>
          )}
        </div>
      </div>

      <Modal isOpen={!!suggestion} onClose={() => dispatch(clearSuggestion())} title="AI Code Suggestion" maxWidth="600px">
         <div className="space-y-4">
            <Typography variant="body" className="text-text-main leading-relaxed whitespace-pre-wrap font-mono text-sm bg-white/5 p-6 rounded-2xl border border-white/10">
               {suggestion?.hint || suggestion?.text || suggestion?.data || JSON.stringify(suggestion, null, 2)}
            </Typography>
            <div className="flex justify-end">
               <button onClick={() => dispatch(clearSuggestion())} className="px-6 py-2 rounded-xl bg-accent-main text-black font-black hover:scale-105 transition-all">Got it</button>
            </div>
         </div>
      </Modal>
    </div>
  );
};

export default RealtimeLayout;