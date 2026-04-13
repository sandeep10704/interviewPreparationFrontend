import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

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

const NormalLayout = () => {
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

  useEffect(() => {
    if (setId) {
      dispatch(getCodingSetById(setId));
    }
  }, [setId, dispatch]);

  useEffect(() => {
    dispatch(clearResults());
  }, [currentIndex, dispatch]);

  const currentQuestion =
    selectedSet?.questions?.[currentIndex];

  const code = codesByQuestion[currentIndex] || "";

  const { results, isSubmission } = useMemo(() => {

    if (submitResult) {
      const cases =
        submitResult.results ||
        submitResult.cases ||
        submitResult.data ||
        [];

      return {
        results: cases.map((r, i) => ({
          id: i,
          passed: r.passed ?? r.status === "passed",
          userOutput: r.output ?? r.stdout ?? r.userOutput
        })),
        isSubmission: true
      };
    }

    if (runResult) {
      const cases =
        runResult.results ||
        runResult.cases ||
        runResult.data ||
        [];

      return {
        results: cases.map((r, i) => ({
          id: i,
          passed: r.passed ?? r.status === "passed",
          userOutput: r.output ?? r.stdout ?? r.userOutput
        })),
        isSubmission: false
      };
    }

    return { results: [], isSubmission: false };

  }, [runResult, submitResult]);

  const showResults =
    (runResult && results.length > 0) ||
    (submitResult && results.length > 0);

  if (!currentQuestion) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] w-full bg-background overflow-hidden text-left">

      <NavigationBar
        currentIndex={currentIndex}
        totalQuestions={selectedSet?.questions?.length}
        onPrev={() => dispatch(prevQuestion())}
        onNext={() => dispatch(nextQuestion())}
      />

      <div className="flex flex-1 overflow-hidden">

        {/* LEFT PANEL */}
        <div className="w-[45%] min-w-[350px] border-r border-border-main/20 bg-[#01080E]">
          <ProblemDescription question={currentQuestion} />
        </div>

        {/* RIGHT PANEL */}
        <div className="flex-1 flex flex-col bg-[#030E17] relative">

          {/* EDITOR */}
          <div className="flex-1 relative">
            <CodeEditor
              code={code}
              setCode={(val) => dispatch(setCode(val))}
              language={language}
              setLanguage={(val) =>
                dispatch(setLanguage(val))
              }

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

              runLoading={runLoading}
              submitLoading={submitLoading}
            />
          </div>

          {/* RESULTS OVERLAY */}
          {showResults && (
            <div className="absolute bottom-0 left-0 right-0 h-[45%] border-t border-border-main/30 bg-[#01080E]">
              <TestResults
                testCases={currentQuestion.test_cases}
                results={results}
                isSubmission={isSubmission}
                loading={runLoading || submitLoading}
              />
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default NormalLayout;