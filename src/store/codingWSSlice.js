import { createSlice } from "@reduxjs/toolkit";
import { speakSarvam, stopVoice } from "./sarvamSlice";

let ws = null;
let typingInterval = null;

const sendSafe = (payload) => {
  if (!ws || ws.readyState !== 1) {
    console.log("⛔ WS not ready", payload);
    return;
  }

  ws.send(JSON.stringify(payload));
};

/* 🔥 helper for ALL AI messages */
const pushAIMessage = (dispatch, text) => {
  if (!text) return;

  // clean text (remove markdown + limit size)
  const cleanText = text.replace(/[*#`]/g, "").slice(0, 500);

  dispatch(addMessage({
    role: "ai",
    text
  }));

  // 🔥 stop previous voice (avoid overlap)
  dispatch(stopVoice());

  // 🔥 auto speak
  dispatch(speakSarvam(cleanText));
};

const codingWSSlice = createSlice({
  name: "codingWS",

  initialState: {
    connected: false,
    messages: [],
    hint: null,
    testResult: null
  },

  reducers: {
    wsConnected: (state) => {
      state.connected = true;
    },

    wsDisconnected: (state) => {
      state.connected = false;
    },

    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },

    setHint: (state, action) => {
      state.hint = action.payload;
    },

    setTestResult: (state, action) => {
      state.testResult = action.payload;
    }
  }
});

export const {
  wsConnected,
  wsDisconnected,
  addMessage,
  setHint,
  setTestResult
} = codingWSSlice.actions;

export default codingWSSlice.reducer;


/* CONNECT */
export const connectCodingWS = (token) => (dispatch) => {

  if (!token) return;

  if (ws && ws.readyState !== WebSocket.CLOSED) {
    console.log("⚠️ WS already exists");
    return;
  }

  console.log("🔌 CONNECT WS");

  ws = new WebSocket(
    `wss://aiinterviewpreparation.onrender.com/coding/ws?token=${token}`
  );

  ws.onopen = () => {
    console.log("✅ WS OPEN");
    dispatch(wsConnected());
  };

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);

    /* 🔥 ALL messages handled here */

    if (data.type === "explanation") {
      pushAIMessage(dispatch, data.message);
    }

    if (data.type === "hint") {
      dispatch(setHint(data.hint));
      pushAIMessage(dispatch, data.hint);

      if (data.test_result) {
        dispatch(setTestResult(data.test_result));
      }
    }

    if (data.type === "error") {
      pushAIMessage(dispatch, data.message);
    }
  };

  ws.onclose = () => {
    ws = null;
    dispatch(wsDisconnected());
  };

  ws.onerror = (e) => {
    console.log("🚨 WS ERROR", e);
  };
};


/* START */
export const startCoding =
({ coding_set_id, question_no }) => () => {

  sendSafe({
    type: "start",
    coding_set_id,
    question_no
  });
};


/* TYPING */
export const startTyping =
({ coding_set_id, question_no, getCode }) => () => {

  if (typingInterval) clearInterval(typingInterval);

  typingInterval = setInterval(() => {
    sendSafe({
      type: "typing",
      coding_set_id,
      question_no,
      code: getCode()
    });
  }, 5 * 60 * 1000);
};


/* SUGGEST */
export const suggestHint =
({ coding_set_id, question_no, code }) => () => {

  sendSafe({
    type: "suggest",
    coding_set_id,
    question_no,
    code
  });
};


/* RUN */
export const runCode =
({ coding_set_id, question_no, code }) => () => {

  sendSafe({
    type: "run",
    coding_set_id,
    question_no,
    code
  });
};


/* DISCONNECT */
export const disconnectCodingWS = () => () => {

  if (typingInterval) {
    clearInterval(typingInterval);
    typingInterval = null;
  }

  if (ws) {
    ws.close();
    ws = null;
  }
};