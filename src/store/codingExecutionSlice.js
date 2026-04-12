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
  async (payload, thunkAPI) => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("User not logged in");

      const token = await user.getIdToken();

      const response = await axios.post(
        "https://ai-interview-preparation-three.vercel.app/coding/run",
        {
          coding_set_id: payload.coding_set_id,
          question_no: payload.question_no,
          code: payload.code
        },
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

// ============================
// SUBMIT CODE
// ============================
export const submitCode = createAsyncThunk(
  "coding/submit",
  async (payload, thunkAPI) => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("User not logged in");

      const token = await user.getIdToken();

      const response = await axios.post(
        "https://ai-interview-preparation-three.vercel.app/coding/submit",
        {
          coding_set_id: payload.coding_set_id,
          question_index: payload.question_index,
          code: payload.code
        },
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

const codingExecutionSlice = createSlice({
  name: "codingExecution",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // RUN
      .addCase(runCode.pending, (state) => {
        state.runLoading = true;
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

export default codingExecutionSlice.reducer;