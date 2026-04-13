import { createSlice } from "@reduxjs/toolkit";

const initialData = {
  questions: [
    {
      title: "Indexes of Subarray Sum",
      difficulty: "Medium",
      function_signature:
        "def subarray_sum(arr: List[int], target: int) -> List[int]:",
      problem_statement:
        "Given an array arr[] containing only non-negative integers...",
      constraints:
        "1 <= arr.size() <= 10^6, 0 <= arr[i] <= 10^3, 0 <= target <= 10^9",
      input_format:
        "arr: List[int] - an array of integers, target: int - the required sum",
      output_format: "List[int] - 1-based indices [start, end] or [-1]",
      test_cases: []
    }
  ]
};

const initialState = {
  data: initialData,
  currentIndex: 0,
  code: initialData.questions[0].function_signature + "\n    ",
  language: "python",
  results: [],
  showResults: false,
  isSubmission: false
};

const codingSlice = createSlice({
  name: "coding",
  initialState,
  reducers: {
    setCode: (state, action) => {
      state.code = action.payload;
    },

    setLanguage: (state, action) => {
      state.language = action.payload;
    },

    runCode: (state) => {
      const question = state.data.questions[state.currentIndex];

      state.showResults = true;
      state.isSubmission = false;

      state.results = question.test_cases.slice(0, 3).map((tc, i) => ({
        id: i,
        passed: Math.random() > 0.2,
        userOutput:
          Math.random() > 0.4 ? tc.output : "Error: Output mismatch"
      }));
    },

    submitCode: (state) => {
      const question = state.data.questions[state.currentIndex];

      state.showResults = true;
      state.isSubmission = true;

      state.results = question.test_cases.map((tc, i) => ({
        id: i,
        passed: Math.random() > 0.3,
        userOutput:
          Math.random() > 0.5 ? tc.output : "Error: Output mismatch"
      }));
    },

    nextQuestion: (state) => {
      if (state.currentIndex < state.data.questions.length - 1) {
        state.currentIndex += 1;

        state.code =
          state.data.questions[state.currentIndex].function_signature +
          "\n    ";

        state.results = [];
        state.showResults = false;
        state.isSubmission = false;
      }
    },

    prevQuestion: (state) => {
      if (state.currentIndex > 0) {
        state.currentIndex -= 1;

        state.code =
          state.data.questions[state.currentIndex].function_signature +
          "\n    ";

        state.results = [];
        state.showResults = false;
        state.isSubmission = false;
      }
    }
  }
});

export const {
  setCode,
  setLanguage,
  runCode,
  submitCode,
  nextQuestion,
  prevQuestion
} = codingSlice.actions;

export default codingSlice.reducer;