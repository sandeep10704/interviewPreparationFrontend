import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut
} from "firebase/auth";

import { auth, googleProvider } from "../firebase";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isAuthenticated: !!localStorage.getItem("user"),
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
      const user = serializeUser(action.payload);
      state.user = user;
      state.isAuthenticated = !!user;
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
      } else {
        localStorage.removeItem("user");
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginWithGoogle.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginWithGoogle.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.loading = false;
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(loginWithEmail.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        localStorage.removeItem("user");
      });
  }
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;