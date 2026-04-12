import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import fileUploadReducer from "./fileUploadSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    fileUpload: fileUploadReducer
  }
});