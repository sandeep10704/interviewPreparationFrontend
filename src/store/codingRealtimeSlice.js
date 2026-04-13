import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { auth } from "../firebase";

const initialState = {
  suggestionLoading: false,
  suggestion: null,
  error: null
};

export const getSuggestion = createAsyncThunk(
  "codingRealtime/getSuggestion",
  async (payload, { rejectWithValue }) => {
    try {
      const token = await auth.currentUser?.getIdToken();
      if (!token) throw new Error("User not logged in");

      const response = await axios.post(
        "https://ai-interview-preparation-three.vercel.app/coding/suggestions",
        {
          code: payload.code,
          language: payload.language,
          question: payload.question
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.detail || error.message
      );
    }
  }
);

const codingRealtimeSlice = createSlice({
  name: "codingRealtime",
  initialState,
  reducers: {
    clearSuggestion: (state) => {
      state.suggestion = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSuggestion.pending, (state) => {
        state.suggestionLoading = true;
        state.error = null;
      })
      .addCase(getSuggestion.fulfilled, (state, action) => {
        state.suggestionLoading = false;
        state.suggestion = action.payload;
      })
      .addCase(getSuggestion.rejected, (state, action) => {
        state.suggestionLoading = false;
        state.error = action.payload;
      });
  }
});

export const { clearSuggestion } = codingRealtimeSlice.actions;
export default codingRealtimeSlice.reducer;
