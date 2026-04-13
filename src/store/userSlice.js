import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { auth } from "../firebase";

const initialState = {
  loading: false,
  updating: false,
  user: null,
  error: null
};


// ============================
// GET USER
// ============================
export const getUser = createAsyncThunk(
  "user/get",
  async (_, { rejectWithValue }) => {
    try {

      const user = auth.currentUser;

      if (!user) {
        throw new Error("User not logged in");
      }

      const token = await user.getIdToken();

      const response = await axios.get(
        "https://ai-interview-preparation-three.vercel.app/user",
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
// UPDATE USER
// ============================
export const updateUser = createAsyncThunk(
  "user/update",
  async (payload, { rejectWithValue }) => {
    try {
      const token = await auth.currentUser?.getIdToken();

      if (!token) {
        throw new Error("User not logged in");
      }

      await axios.put(
        "https://ai-interview-preparation-three.vercel.app/user",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      return payload;

    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.detail ||
        error?.response?.data ||
        error.message
      );
    }
  }
);


const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUser: (state) => {
      state.user = null;
    }
  },

  extraReducers: (builder) => {
    builder

      // GET USER
      .addCase(getUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UPDATE USER
      .addCase(updateUser.pending, (state) => {
        state.updating = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.updating = false;
        state.user = {
          ...state.user,
          ...action.payload
        };
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.updating = false;
        state.error = action.payload;
      });
  }
});

export const { clearUser } = userSlice.actions;
export default userSlice.reducer;