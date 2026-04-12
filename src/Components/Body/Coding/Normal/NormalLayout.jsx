import React, { useState } from 'react';
import ProblemDescription from './Components/ProblemDescription';
import CodeEditor from './Components/CodeEditor';
import TestResults from './Components/TestResults';
import NavigationBar from './Components/NavigationBar';

const NormalLayout = () => {
  // Mock data as provided by user
  const data = {
    "questions": [
      {
        "title": "Indexes of Subarray Sum",
        "difficulty": "Medium",
        "function_signature": "def subarray_sum(arr: List[int], target: int) -> List[int]:",
        "problem_statement": "Given an array arr[] containing only non-negative integers, your task is to find a continuous subarray (a contiguous sequence of elements) whose sum equals a specified value target. You need to return the 1-based indices of the leftmost and rightmost elements of this subarray. You need to find the first subarray whose sum is equal to the target.\n\nNote: If no such array is possible then, return [-1].",
        "constraints": "1 <= arr.size() <= 10^6, 0 <= arr[i] <= 10^3, 0 <= target <= 10^9",
        "input_format": "arr: List[int] - an array of integers, target: int - the required sum",
        "output_format": "List[int] - 1-based indices [start, end] or [-1]",
        "test_cases": [
          { "input": "arr[] = [1, 2, 3, 7, 5], target = 12", "output": "[2, 4]", "explanation": "The sum of elements from 2nd to 4th position is 12." },
          { "input": "arr[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], target = 15", "output": "[1, 5]", "explanation": "The sum of elements from 1st to 5th position is 15." },
          { "input": "arr[] = [5, 3, 4], target = 2", "output": "[-1]", "explanation": "There is no subarray with sum 2." },
          { "input": "arr[] = [10, 20, 30, 40], target = 50", "output": "[2, 3]" },
          { "input": "arr[] = [1, 1, 1], target = 2", "output": "[1, 2]" },
          { "input": "arr[] = [0, 0, 0], target = 0", "output": "[1, 1]" },
          { "input": "arr[] = [7, 2, 1], target = 10", "output": "[1, 3]" }
        ]
      },
      {
        "title": "Minimum Cost to Connect All Points",
        "difficulty": "Hard",
        "function_signature": "def min_cost_connect_points(points: List[List[int]], max_distance: int) -> int:",
        "problem_statement": "Given a list of points on a 2D plane and a maximum allowed distance, connect all points such that the total cost is minimized. The cost to connect two points is the Manhattan distance between them.",
        "constraints": "1 <= len(points) <= 500, 0 <= x, y <= 10^4, 0 <= max_distance <= 10^4",
        "input_format": "points: List[List[int]], max_distance: int",
        "output_format": "int - min cost or -1",
        "test_cases": [
          { "input": "([[0,0],[2,2],[3,10],[5,2],[7,0]], 5)", "output": "20" }
        ]
      }
    ]
  };

  const [currentIndex, setCurrentIndex] = useState(0);
  const [code, setCode] = useState(data.questions[currentIndex].function_signature + "\n    ");
  const [language, setLanguage] = useState('python');
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [isSubmission, setIsSubmission] = useState(false);

  const currentQuestion = data.questions[currentIndex];

  const handleRun = () => {
    setShowResults(true);
    setIsSubmission(false);
    // Simulate test results for only the first 3 (public) cases
    const newResults = currentQuestion.test_cases.slice(0, 3).map((tc, i) => ({
      id: i,
      passed: Math.random() > 0.2,
      userOutput: Math.random() > 0.4 ? tc.output : "Error: Output mismatch"
    }));
    setResults(newResults);
  };

  const handleSubmit = () => {
    setShowResults(true);
    setIsSubmission(true);
    // Simulate test results for ALL cases (public + hidden)
    const newResults = currentQuestion.test_cases.map((tc, i) => ({
      id: i,
      passed: Math.random() > 0.3,
      userOutput: Math.random() > 0.5 ? tc.output : "Error: Output mismatch"
    }));
    setResults(newResults);
  };

  const nextQuestion = () => {
    if (currentIndex < data.questions.length - 1) {
      const nextIdx = currentIndex + 1;
      setCurrentIndex(nextIdx);
      setCode(data.questions[nextIdx].function_signature + "\n    ");
      setResults([]);
      setShowResults(false);
      setIsSubmission(false);
    }
  };

  const prevQuestion = () => {
    if (currentIndex > 0) {
      const prevIdx = currentIndex - 1;
      setCurrentIndex(prevIdx);
      setCode(data.questions[prevIdx].function_signature + "\n    ");
      setResults([]);
      setShowResults(false);
      setIsSubmission(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] w-full bg-background overflow-hidden text-left">
      <NavigationBar 
        currentIndex={currentIndex} 
        totalQuestions={data.questions.length} 
        onPrev={prevQuestion} 
        onNext={nextQuestion} 
      />

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Side: Description */}
        <div className="w-[45%] min-w-[350px] border-r border-border-main/20 bg-[#01080E]">
          <ProblemDescription question={currentQuestion} />
        </div>

        {/* Right Side: Editor and Results */}
        <div className="flex-1 flex flex-col bg-[#030E17]">
          <div className={`${showResults ? 'h-[60%]' : 'h-full'} transition-all duration-300 relative`}>
            <CodeEditor 
              code={code} 
              setCode={setCode} 
              language={language}
              setLanguage={setLanguage}
              onRun={handleRun}
              onSubmit={handleSubmit}
            />
          </div>
          
          {showResults && (
            <div className="flex-1 border-t border-border-main/30 bg-[#01080E] relative overflow-hidden animate-slide-up">
              <TestResults 
                testCases={currentQuestion.test_cases} 
                results={results} 
                isSubmission={isSubmission}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NormalLayout;