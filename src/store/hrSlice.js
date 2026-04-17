import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://aiinterviewpreparation.onrender.com";

export const getHRSets = createAsyncThunk(
  "hr/getSets",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user?.token || sessionStorage.getItem("token");
      const response = await axios.get(`${API_URL}/hr/sets`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const generateHRQuestions = createAsyncThunk(
  "hr/generateQuestions",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user?.token || sessionStorage.getItem("token");
      const response = await axios.get(`${API_URL}/hr/questions`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

const hrSlice = createSlice({
  name: "hr",
  initialState: {
    sets: [],
    selectedSet: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearHRError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getHRSets.pending, (state) => {
        state.loading = true;
      })
      .addCase(getHRSets.fulfilled, (state, action) => {
        state.loading = false;
        state.sets = action.payload || [];
      })
      .addCase(getHRSets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearHRError } = hrSlice.actions;
export default hrSlice.reducer;
