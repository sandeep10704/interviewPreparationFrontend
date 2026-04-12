import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { auth } from "../firebase";

const initialState = {
  loading: false,
  data: null,
  error: null
};

// ==============================
// GENERATE CODING QUESTIONS
// ==============================
export const generateCodingQuestions = createAsyncThunk(
  "coding/generate",
  async (_, thunkAPI) => {
    try {
      const user = auth.currentUser;

      if (!user) {
        throw new Error("User not logged in");
      }

      const token = await user.getIdToken();

      const response = await axios.get(
        "https://ai-interview-preparation-three.vercel.app/coding/questions",
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

const codingQuestionSlice = createSlice({
  name: "codingQuestions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(generateCodingQuestions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(generateCodingQuestions.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(generateCodingQuestions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default codingQuestionSlice.reducer;