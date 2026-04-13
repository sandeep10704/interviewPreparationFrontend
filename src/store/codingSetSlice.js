import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { auth } from "../firebase";

const initialState = {
  loading: false,
  data: null,
  selectedSet: null,
  error: null,

  // editor state
  currentIndex: 0,
  codesByQuestion: {},
  language: "python",

  // results
  results: [],
  showResults: false,
  isSubmission: false
};

// ===============================
// GET ALL CODING SETS
// ===============================
export const getCodingSets = createAsyncThunk(
  "codingSets/getAll",
  async (_, thunkAPI) => {
    try {
      const user = auth.currentUser;

      if (!user) {
        throw new Error("User not logged in");
      }

      const token = await user.getIdToken();

      const response = await axios.get(
        "https://ai-interview-preparation-three.vercel.app/coding/sets",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.detail ||
          error?.response?.data ||
          error.message
      );
    }
  }
);

// ===============================
// GET SINGLE CODING SET
// ===============================
export const getCodingSetById = createAsyncThunk(
  "codingSets/getById",
  async (codingSetId, thunkAPI) => {
    try {
      const user = auth.currentUser;

      if (!user) {
        throw new Error("User not logged in");
      }

      const token = await user.getIdToken();

      const response = await axios.get(
        `https://ai-interview-preparation-three.vercel.app/coding/sets/${codingSetId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.detail ||
          error?.response?.data ||
          error.message
      );
    }
  }
);

const codingSetSlice = createSlice({
  name: "codingSets",
  initialState,
  reducers: {
    // ===============================
    // SET CODE (SAVE PER QUESTION)
    // ===============================
    setCode: (state, action) => {
      const index = state.currentIndex;
      state.codesByQuestion[index] = action.payload;
    },

    setLanguage: (state, action) => {
      state.language = action.payload;
    },

    // ===============================
    // NEXT QUESTION
    // ===============================
    nextQuestion: (state) => {
      const total = state.selectedSet?.questions?.length || 0;

      if (state.currentIndex < total - 1) {
        state.currentIndex += 1;

        state.results = [];
        state.showResults = false;
        state.isSubmission = false;
      }
    },

    // ===============================
    // PREVIOUS QUESTION
    // ===============================
    prevQuestion: (state) => {
      if (state.currentIndex > 0) {
        state.currentIndex -= 1;

        state.results = [];
        state.showResults = false;
        state.isSubmission = false;
      }
    },

    // ===============================
    // RUN CODE
    // ===============================
    runCode: (state) => {
      const question =
        state.selectedSet?.questions?.[state.currentIndex];

      if (!question) return;

      state.showResults = true;
      state.isSubmission = false;

      state.results = question.test_cases
        ?.slice(0, 3)
        .map((tc, i) => ({
          id: i,
          passed: Math.random() > 0.2,
          userOutput:
            Math.random() > 0.4
              ? tc.output
              : "Error: Output mismatch"
        }));
    },

    // ===============================
    // SUBMIT CODE
    // ===============================
    submitCode: (state) => {
      const question =
        state.selectedSet?.questions?.[state.currentIndex];

      if (!question) return;

      state.showResults = true;
      state.isSubmission = true;

      state.results = question.test_cases?.map((tc, i) => ({
        id: i,
        passed: Math.random() > 0.3,
        userOutput:
          Math.random() > 0.5
            ? tc.output
            : "Error: Output mismatch"
      }));
    }
  },

  extraReducers: (builder) => {
    builder

      // =====================
      // GET ALL SETS
      // =====================
      .addCase(getCodingSets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCodingSets.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getCodingSets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // =====================
      // GET SET BY ID
      // =====================
      .addCase(getCodingSetById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCodingSetById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedSet = action.payload;

        state.currentIndex = 0;

        const questions = action.payload?.questions || [];

        state.codesByQuestion = {};

        // initialize code for each question
        questions.forEach((q, index) => {
          state.codesByQuestion[index] =
            q.function_signature + "\n    ";
        });

        state.results = [];
        state.showResults = false;
        state.isSubmission = false;
      })
      .addCase(getCodingSetById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const {
  setCode,
  setLanguage,
  nextQuestion,
  prevQuestion,
  runCode,
  submitCode
} = codingSetSlice.actions;

export default codingSetSlice.reducer;