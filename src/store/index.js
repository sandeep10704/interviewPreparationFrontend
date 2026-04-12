import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import fileUploadReducer from "./fileUploadSlice";
import codingSetReducer from "./codingSetSlice";
import codingExecutionReducer from "./codingExecutionSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    fileUpload: fileUploadReducer,
    codingSets: codingSetReducer,
    codingExecution: codingExecutionReducer,
  }
});