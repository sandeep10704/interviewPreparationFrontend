import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import fileUploadReducer from "./fileUploadSlice";
import codingSetReducer from "./codingSetSlice";
import codingExecutionReducer from "./codingExecutionSlice";
import codingQuestionReducer from "./codingQuestionSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    fileUpload: fileUploadReducer,
    codingSets: codingSetReducer,
    codingExecution: codingExecutionReducer,
    codingQuestions: codingQuestionReducer
  }
});