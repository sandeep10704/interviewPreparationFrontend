import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { auth } from "../firebase";

const initialState = {
  runLoading: false,
  submitLoading: false,
  runResult: null,
  submitResult: null,
  error: null
};

// ============================
// RUN CODE
// ============================
export const runCode = createAsyncThunk(
  "coding/run",
  async (payload, { rejectWithValue }) => {
    try {
      const token = await auth.currentUser?.getIdToken();

      if (!token) {
        throw new Error("User not logged in");
      }

      const response = await axios.post(
        "https://ai-interview-preparation-three.vercel.app/coding/run",
        {
          coding_set_id: payload.coding_set_id,
          question_no: payload.question_no,
          code: payload.code,
          language: payload.language
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      return response.data;

    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.detail ||
        error?.response?.data ||
        error.message
      );
    }
  }
);

// ============================
// SUBMIT CODE
// ============================
export const submitCode = createAsyncThunk(
  "coding/submit",
  async (payload, { rejectWithValue }) => {
    try {
      const token = await auth.currentUser?.getIdToken();

      if (!token) {
        throw new Error("User not logged in");
      }

      const response = await axios.post(
        "https://ai-interview-preparation-three.vercel.app/coding/submit",
        {
          coding_set_id: payload.coding_set_id,
          question_index: payload.question_index,
          code: payload.code,
          language: payload.language
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      return response.data;

    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.detail ||
        error?.response?.data ||
        error.message
      );
    }
  }
);

const codingExecutionSlice = createSlice({
  name: "codingExecution",
  initialState,
  reducers: {
    clearResults: (state) => {
      state.runResult = null;
      state.submitResult = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder

      // RUN
      .addCase(runCode.pending, (state) => {
        state.runLoading = true;
        state.runResult = null;
        state.error = null;
      })
      .addCase(runCode.fulfilled, (state, action) => {
        state.runLoading = false;
        state.runResult = action.payload;
      })
      .addCase(runCode.rejected, (state, action) => {
        state.runLoading = false;
        state.error = action.payload;
      })

      // SUBMIT
      .addCase(submitCode.pending, (state) => {
        state.submitLoading = true;
        state.submitResult = null;
        state.error = null;
      })
      .addCase(submitCode.fulfilled, (state, action) => {
        state.submitLoading = false;
        state.submitResult = action.payload;
      })
      .addCase(submitCode.rejected, (state, action) => {
        state.submitLoading = false;
        state.error = action.payload;
      });
  }
});

export const { clearResults } = codingExecutionSlice.actions;

export default codingExecutionSlice.reducer;