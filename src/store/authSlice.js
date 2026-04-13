import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut
} from "firebase/auth";

import { auth, googleProvider } from "../firebase";

const initialState = {
  user: null,
  loading: false,
  error: null
};

// helper (VERY IMPORTANT)
const serializeUser = (user) => {
  if (!user) return null;

  return {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL
  };
};

// Google Login
export const loginWithGoogle = createAsyncThunk(
  "auth/google",
  async () => {
    const res = await signInWithPopup(auth, googleProvider);
    return serializeUser(res.user);
  }
);

// Email Login
export const loginWithEmail = createAsyncThunk(
  "auth/login",
  async ({ email, password }) => {
    const res = await signInWithEmailAndPassword(auth, email, password);
    return serializeUser(res.user);
  }
);

// Signup
export const signup = createAsyncThunk(
  "auth/signup",
  async ({ email, password }) => {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    return serializeUser(res.user);
  }
);

// Logout
export const logout = createAsyncThunk(
  "auth/logout",
  async () => {
    await signOut(auth);
    return null;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = serializeUser(action.payload);
    }
  },
  extraReducers: (builder) => {
    builder

      .addCase(loginWithGoogle.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginWithGoogle.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })

      .addCase(loginWithEmail.fulfilled, (state, action) => {
        state.user = action.payload;
      })

      .addCase(signup.fulfilled, (state, action) => {
        state.user = action.payload;
      })

      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      });
  }
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;