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


// serialize user + token
const serializeUser = async (user) => {
 if (!user) return null;

 const token = await user.getIdToken();

 return {
  uid: user.uid,
  email: user.email,
  displayName: user.displayName,
  photoURL: user.photoURL,
  token
 };
};


// Google Login
export const loginWithGoogle = createAsyncThunk(
 "auth/loginWithGoogle",
 async (_, { rejectWithValue }) => {
  try {
   const res = await signInWithPopup(auth, googleProvider);
   return await serializeUser(res.user);
  } catch (err) {
   return rejectWithValue(err.message);
  }
 }
);


// Email Login
export const loginWithEmail = createAsyncThunk(
 "auth/loginWithEmail",
 async ({ email, password }, { rejectWithValue }) => {
  try {
   const res = await signInWithEmailAndPassword(auth, email, password);
   return await serializeUser(res.user);
  } catch (err) {
   return rejectWithValue(err.message);
  }
 }
);


// Signup
export const signup = createAsyncThunk(
 "auth/signup",
 async ({ email, password }, { rejectWithValue }) => {
  try {
   const res = await createUserWithEmailAndPassword(auth, email, password);
   return await serializeUser(res.user);
  } catch (err) {
   return rejectWithValue(err.message);
  }
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
   state.user = action.payload;
   state.isAuthenticated = !!action.payload;

   if (action.payload) {
    localStorage.setItem("user", JSON.stringify(action.payload));
    sessionStorage.setItem("token", action.payload.token);
   } else {
    localStorage.removeItem("user");
    sessionStorage.removeItem("token");
   }
  }
 },

 extraReducers: (builder) => {
  builder

   // GOOGLE
   .addCase(loginWithGoogle.pending, (state) => {
    state.loading = true;
    state.error = null;
   })

   .addCase(loginWithGoogle.fulfilled, (state, action) => {
    state.loading = false;
    state.user = action.payload;
    state.isAuthenticated = true;

    localStorage.setItem("user", JSON.stringify(action.payload));
    sessionStorage.setItem("token", action.payload.token);
   })

   .addCase(loginWithGoogle.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload;
   })


   // EMAIL
   .addCase(loginWithEmail.pending, (state) => {
    state.loading = true;
   })

   .addCase(loginWithEmail.fulfilled, (state, action) => {
    state.loading = false;
    state.user = action.payload;
    state.isAuthenticated = true;

    localStorage.setItem("user", JSON.stringify(action.payload));
    sessionStorage.setItem("token", action.payload.token);
   })

   .addCase(loginWithEmail.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload;
   })


   // SIGNUP
   .addCase(signup.fulfilled, (state, action) => {
    state.user = action.payload;
    state.isAuthenticated = true;

    localStorage.setItem("user", JSON.stringify(action.payload));
    sessionStorage.setItem("token", action.payload.token);
   })


   // LOGOUT
   .addCase(logout.fulfilled, (state) => {
    state.user = null;
    state.isAuthenticated = false;

    localStorage.removeItem("user");
    sessionStorage.removeItem("token");
   });
 }
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;