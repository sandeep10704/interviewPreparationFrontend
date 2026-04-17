import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://aiinterviewpreparation.onrender.com";

export const getTechnicalSets = createAsyncThunk(
  "technical/getSets",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user?.token || sessionStorage.getItem("token");
      const response = await axios.get(`${API_URL}/technical/sets`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const generateTechnicalQuestions = createAsyncThunk(
  "technical/generateQuestions",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user?.token || sessionStorage.getItem("token");
      const response = await axios.get(`${API_URL}/technical/questions`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getTechnicalSetById = createAsyncThunk(
  "technical/getSetById",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user?.token || sessionStorage.getItem("token");
      const response = await axios.get(`${API_URL}/technical/sets/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);
export const evaluateTechnicalAnswers = createAsyncThunk(
  "technical/evaluate",
  async (payload, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user?.token || sessionStorage.getItem("token");
      const response = await axios.post(`${API_URL}/technical/evaluate`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
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
  },
  reducers: {
    clearTechnicalError: (state) => {
      state.error = null;
    },
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
      .addCase(generateTechnicalQuestions.fulfilled, (state) => {
        state.generating = false;
      })
      .addCase(generateTechnicalQuestions.rejected, (state, action) => {
        state.generating = false;
        state.error = action.payload;
      })
      .addCase(getTechnicalSetById.fulfilled, (state, action) => {
        state.selectedSet = action.payload;
      })
      .addCase(evaluateTechnicalAnswers.pending, (state) => {
        state.loading = true;
      })
      .addCase(evaluateTechnicalAnswers.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedSet = action.payload;
      })
      .addCase(evaluateTechnicalAnswers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearTechnicalError } = technicalSlice.actions;
export default technicalSlice.reducer;
