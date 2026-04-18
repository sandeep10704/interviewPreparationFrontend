import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import fileUploadReducer from "./fileUploadSlice";
import codingSetReducer from "./codingSetSlice";
import codingExecutionReducer from "./codingExecutionSlice";
import codingQuestionReducer from "./codingQuestionSlice";
import playgroundReducer from "./playgroundSlice";
import codingReducer from "./codingSlice";
import codingRealtimeReducer from "./codingRealtimeSlice";
import userReducer from "./userSlice";
import sarvamReducer from "./sarvamSlice";
import codingWSReducer from "./codingWSSlice";
import technicalReducer from "./technicalSlice";
import hrReducer from "./hrSlice";
import technicalWsReducer from "./technicalWsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    fileUpload: fileUploadReducer,
    codingSets: codingSetReducer,
    codingExecution: codingExecutionReducer,
    codingQuestions: codingQuestionReducer,
    codingRealtime: codingRealtimeReducer,
    playground: playgroundReducer,
    coding: codingReducer,
    user: userReducer,
    sarvam: sarvamReducer,
    codingWS: codingWSReducer,
    technical: technicalReducer,
    hr: hrReducer,
    technicalWs: technicalWsReducer
  }
});