import { useEffect, useMemo, useState, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Modal, Typography } from "../../../Common";

import ProblemDescription from "./Components/ProblemDescription";
import CodeEditor from "./Components/CodeEditor";
import TestResults from "./Components/TestResults";
import NavigationBar from "./Components/NavigationBar";

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
  const { setId } = useParams();

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

  // FIX 1: Removed duplicate declarations — only one set of these three:
  const [resultsHeight, setResultsHeight] = useState(40);
  const [isResizing, setIsResizing] = useState(false);
  const containerRef = useRef(null);

  const startResizing = () => setIsResizing(true);
  const stopResizing = () => setIsResizing(false);

  // FIX 3: onResize moved inside the effect to avoid stale closure on isResizing
  useEffect(() => {
    if (!isResizing) return;

    const onResize = (e) => {
      if (!containerRef.current) return;

      const containerHeight = containerRef.current.offsetHeight;
      const offsetTop = containerRef.current.getBoundingClientRect().top;
      const mousePos = e.clientY - offsetTop;
      const newHeight = ((containerHeight - mousePos) / containerHeight) * 100;

      if (newHeight > 20 && newHeight < 80) {
        setResultsHeight(newHeight);
      }
    };

    window.addEventListener("mousemove", onResize);
    window.addEventListener("mouseup", stopResizing);

    return () => {
      window.removeEventListener("mousemove", onResize);
      window.removeEventListener("mouseup", stopResizing);
    };
  }, [isResizing]);

  useEffect(() => {
    if (setId) {
      dispatch(getCodingSetById(setId));
    }
  }, [setId, dispatch]);

  useEffect(() => {
    dispatch(clearResults());
    dispatch(clearSuggestion());
  }, [currentIndex, dispatch]);

  const currentQuestion = selectedSet?.questions?.[currentIndex];
  const code = codesByQuestion[currentIndex] || "";

  // FIX 4: Use a ref so getCode always returns the latest code value
  const codeRef = useRef(code);
  useEffect(() => {
    codeRef.current = code;
  }, [code]);

  // FIX 2: Removed backtick fences — plain JS inside useEffect bodies
  /* CONNECT WS */
  /* CONNECT WS */
  useEffect(() => {
    if (!token || !setId) return;

    dispatch(connectCodingWS(token));

  }, [token, setId]);

//   useEffect(() => {
//   return () => {
//     dispatch(disconnectCodingWS());
//   };
// }, []);

  /* START AFTER CONNECT */
  useEffect(() => {
    if (!connected || !currentQuestion) return;

    dispatch(startCoding({
      coding_set_id: setId,
      question_no: currentIndex
    }));

    dispatch(startTyping({
      coding_set_id: setId,
      question_no: currentIndex,
      getCode: () => codeRef.current   // FIX 4: always reads latest code
    }));
  }, [connected, currentIndex, currentQuestion, dispatch]);

  const handleGetSuggestion = () => {
    dispatch(getSuggestion({
      code,
      language,
      question:
        currentQuestion?.description ||
        currentQuestion?.title
    }));
  };

  // FIX 2: Removed backtick fences from useMemo body
  const { results, isSubmission } = useMemo(() => {
    const rawResult = submitResult || runResult;
    if (!rawResult) {
      return { results: [], isSubmission: false };
    }

    const cases =
      rawResult.results ||
      rawResult.cases ||
      rawResult.data ||
      [];

    return {
      results: cases.map((r, i) => ({
        id: i,
        passed: r.passed ?? r.status === "passed",
        userOutput:
          r.output ??
          r.stdout ??
          r.userOutput
      })),
      isSubmission: !!submitResult
    };
  }, [runResult, submitResult]);

  const showResults = results.length > 0;

  if (!currentQuestion) {
    return (
      <div className="p-20 text-center">
        <Typography>Loading session...</Typography>
      </div>
    );
  }

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

        <div
          ref={containerRef}
          className={`flex-1 flex flex-col bg-[#030E17] relative ${isResizing ? "cursor-row-resize" : ""}`}
        >

          <div
            className="shrink-0 min-h-0 relative overflow-hidden"
            style={{
              height: showResults ? `${100 - resultsHeight}%` : "100%"
            }}
          >
            <CodeEditor
              code={code}
              setCode={(val) => dispatch(setCode(val))}
              language={language}
              setLanguage={(val) => dispatch(setLanguage(val))}
              onRun={() =>
                dispatch(
                  runCode({
                    coding_set_id: setId,
                    question_no: currentIndex,
                    code,
                    language
                  })
                )
              }
              onSubmit={() =>
                dispatch(
                  submitCode({
                    coding_set_id: setId,
                    question_index: currentIndex,
                    code,
                    language
                  })
                )
              }
              onSuggest={handleGetSuggestion}
              runLoading={runLoading}
              submitLoading={submitLoading}
              suggestionLoading={suggestionLoading}
              isRealtime={true}
            />
          </div>

          {showResults && (
            <>
              {/* Drag handle */}
              <div
                className="h-1 cursor-row-resize bg-border-main/30 hover:bg-border-main/60 transition-colors"
                onMouseDown={startResizing}
              />
              <div
                className="flex-1 flex flex-col bg-[#01080E]"
                style={{ height: `${resultsHeight}%` }}
              >
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

      <Modal
        isOpen={!!suggestion}
        onClose={() => dispatch(clearSuggestion())}
        title="AI Code Suggestion"
        maxWidth="600px"
      >
        <Typography className="whitespace-pre-wrap">
          {suggestion?.hint || JSON.stringify(suggestion, null, 2)}
        </Typography>
      </Modal>

    </div>
  );
};

export default RealtimeLayout;