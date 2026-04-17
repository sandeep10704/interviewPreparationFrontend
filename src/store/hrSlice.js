import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://aiinterviewpreparation.onrender.com";

const getAuthHeaders = (thunkAPI) => {
  const state = thunkAPI.getState();
  const token = state.auth.user?.token || sessionStorage.getItem("token") || JSON.parse(localStorage.getItem("user") || "{}")?.token;
  
  if (!token || token === "null" || token === "undefined") {
    console.error("Auth Error: Authentication token is missing or malformed.");
    return { headers: {} };
  }
  
  return { headers: { Authorization: `Bearer ${token}` } };
};

export const generateHRQuestions = createAsyncThunk(
  "hr/generateQuestions",
  async (payload, thunkAPI) => {
    try {
      console.log("API Request: Initiating Behavioral Synthesis...", payload);
      const response = await axios.post(`${API_URL}/hr/questions`, payload, getAuthHeaders(thunkAPI));
      console.log("API Response: Behavioral sets synthesized:", response.data);
      return response.data;
    } catch (error) {
      console.error("API Error: HR Synthesis failed:", error.response?.data || error.message);
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const submitHRAnswers = createAsyncThunk(
  "hr/submitAnswers",
  async (payload, thunkAPI) => {
    try {
      console.log("API Request: Recording behavioral responses...", payload);
      const response = await axios.post(`${API_URL}/hr/answers`, payload, getAuthHeaders(thunkAPI));
      console.log("API Response: Behavioral recording success:", response.data);
      return response.data;
    } catch (error) {
      console.error("API Error: HR Submission failed:", error.response?.data || error.message);
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getHRFeedback = createAsyncThunk(
  "hr/getFeedback",
  async (sessionId, thunkAPI) => {
    try {
      console.log(`API Request: Fetching feedback for cross-session ID ${sessionId}...`);
      const response = await axios.get(`${API_URL}/feedback/${sessionId}`, getAuthHeaders(thunkAPI));
      console.log(`API Response: Global feedback localized:`, response.data);
      return response.data;
    } catch (error) {
      console.error(`API Error: Feedback retrieval for ${sessionId} failed:`, error.response?.data || error.message);
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

const hrSlice = createSlice({
  name: "hr",
  initialState: {
    selectedSet: null,
    evaluation: null,
    loading: false,
    generating: false,
    error: null,
  },
  reducers: {
    clearHRError: (state) => {
      state.error = null;
    },
    resetHRSession: (state) => {
      state.selectedSet = null;
      state.evaluation = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(generateHRQuestions.pending, (state) => {
        state.generating = true;
      })
      .addCase(generateHRQuestions.fulfilled, (state, action) => {
        state.generating = false;
        state.selectedSet = action.payload;
      })
      .addCase(generateHRQuestions.rejected, (state, action) => {
        state.generating = false;
        state.error = action.payload;
      })
      .addCase(submitHRAnswers.pending, (state) => {
        state.loading = true;
      })
      .addCase(submitHRAnswers.fulfilled, (state, action) => {
        state.loading = false;
        state.evaluation = action.payload;
      })
      .addCase(submitHRAnswers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getHRFeedback.fulfilled, (state, action) => {
        state.evaluation = action.payload;
      });
  },
});

export const { clearHRError, resetHRSession } = hrSlice.actions;
export default hrSlice.reducer;
