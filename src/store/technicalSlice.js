import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://aiinterviewpreparation.onrender.com";

// Generalized token retriever
const getAuthHeaders = (thunkAPI) => {
  const state = thunkAPI.getState();
  const token = state.auth.user?.token || sessionStorage.getItem("token") || JSON.parse(localStorage.getItem("user") || "{}")?.token;
  
  if (!token || token === "null" || token === "undefined") {
    console.error("Auth Error: Authentication token is missing or malformed.");
    return { headers: {} };
  }
  
  return { headers: { Authorization: `Bearer ${token}` } };
};

export const getTechnicalSets = createAsyncThunk(
  "technical/getSets",
  async (_, thunkAPI) => {
    try {
      console.log("API Request: Fetching all technical sets...");
      const response = await axios.get(`${API_URL}/technical/sets`, getAuthHeaders(thunkAPI));
      console.log("API Response: Technical sets retrieved:", response.data);
      return response.data;
    } catch (error) {
      console.error("API Error: Fetch sets failed:", error.response?.data || error.message);
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const generateTechnicalQuestions = createAsyncThunk(
  "technical/generateQuestions",
  async (_, thunkAPI) => {
    try {
      console.log("API Request: Starting Technical Synthesis [GET /technical/questions]...");
      const response = await axios.get(`${API_URL}/technical/questions`, getAuthHeaders(thunkAPI));
      console.log("API Response: Synthesis Success:", response.data);
      return response.data;
    } catch (error) {
      console.error("API Error: Synthesis failed:", error.response?.data || error.message);
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getTechnicalSetById = createAsyncThunk(
  "technical/getSetById",
  async (id, thunkAPI) => {
    try {
      console.log(`API Request: Opening session ${id}...`);
      const response = await axios.get(`${API_URL}/technical/sets/${id}`, getAuthHeaders(thunkAPI));
      console.log(`API Response: Session ${id} localized:`, response.data);
      return response.data;
    } catch (error) {
      console.error(`API Error: Fetch session ${id} failed:`, error.response?.data || error.message);
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const submitTechnicalAnswers = createAsyncThunk(
  "technical/submitAnswers",
  async (payload, thunkAPI) => {
    try {
      console.log("API Request: Submitting technical results...", payload);
      const response = await axios.post(`${API_URL}/technical/answers`, payload, getAuthHeaders(thunkAPI));
      console.log("API Response: Evaluation finalized:", response.data);
      return response.data;
    } catch (error) {
      console.error("API Error: Evaluation failed:", error.response?.data || error.message);
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

const technicalSlice = createSlice({
  name: "technical",
  initialState: {
    sets: [],
    selectedSet: null,
    loading: false,
    generating: false,
    error: null,
    evaluation: null,
  },
  reducers: {
    clearTechnicalError: (state) => {
      state.error = null;
    },
    resetSelectedSet: (state) => {
      state.selectedSet = null;
      state.evaluation = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTechnicalSets.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTechnicalSets.fulfilled, (state, action) => {
        state.loading = false;
        state.sets = action.payload || [];
      })
      .addCase(getTechnicalSets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(generateTechnicalQuestions.pending, (state) => {
        state.generating = true;
      })
      .addCase(generateTechnicalQuestions.fulfilled, (state, action) => {
        state.generating = false;
        state.selectedSet = action.payload; // Usually returns the new set and id
      })
      .addCase(generateTechnicalQuestions.rejected, (state, action) => {
        state.generating = false;
        state.error = action.payload;
      })
      .addCase(getTechnicalSetById.fulfilled, (state, action) => {
        state.selectedSet = action.payload;
      })
      .addCase(submitTechnicalAnswers.pending, (state) => {
        state.loading = true;
      })
      .addCase(submitTechnicalAnswers.fulfilled, (state, action) => {
        state.loading = false;
        state.evaluation = action.payload;
      })
      .addCase(submitTechnicalAnswers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearTechnicalError, resetSelectedSet } = technicalSlice.actions;
export default technicalSlice.reducer;
