import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { auth } from "../firebase";

const initialState = {
  loading: false,
  data: null,
  selectedSet: null,
  error: null
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
  reducers: {},
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
      })
      .addCase(getCodingSetById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default codingSetSlice.reducer;