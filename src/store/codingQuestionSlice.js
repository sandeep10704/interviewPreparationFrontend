import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { auth } from "../firebase";

const initialState = {
  generating: false,
  generatedSetId: null,
  error: null,
  status: "idle"
};

export const generateQuestions = createAsyncThunk(
  "codingQuestions/generate",
  async (params, thunkAPI) => {
    try {
      const user = auth.currentUser;
      let headers = {};

      if (user) {
        const token = await user.getIdToken();
        headers.Authorization = `Bearer ${token}`;
      }

      const response = await axios.post(
        "https://ai-interview-preparation-three.vercel.app/coding/questions",
        {
          count: params.count || 2,
          level: params.level || ["medium"]
        },
        { headers }
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.detail || error.message
      );
    }
  }
);

const codingQuestionSlice = createSlice({
  name: "codingQuestions",
  initialState,
  reducers: {
    resetGeneration: (state) => {
      state.generating = false;
      state.generatedSetId = null;
      state.error = null;
      state.status = "idle";
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(generateQuestions.pending, (state) => {
        state.generating = true;
        state.status = "generating";
        state.error = null;
      })
      .addCase(generateQuestions.fulfilled, (state, action) => {
        state.generating = false;
        state.status = "completed";
        state.generatedSetId = action.payload.coding_set_id;
      })
      .addCase(generateQuestions.rejected, (state, action) => {
        state.generating = false;
        state.status = "error";
        state.error = action.payload;
      });
  }
});

export const { resetGeneration } = codingQuestionSlice.actions;
export default codingQuestionSlice.reducer;