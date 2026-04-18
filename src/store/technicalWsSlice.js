import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    socket: null,
    connected: false,
    loading: false,
    messages: [],
    error: null
};

const technicalWsSlice = createSlice({
    name: "technicalWs",
    initialState,
    reducers: {

        // CONNECT
        connectSocket: (state, action) => {
            const token = action.payload;

            const ws = new WebSocket(
                `ws://127.0.0.1:8000/technical/ws?token=${token}`
            );

            ws.onopen = () => {
                console.log("✅ WS Connected");
            };

            ws.onmessage = (event) => {
                console.log("📩 Raw Event:", event);

                try {
                    const data = JSON.parse(event.data);
                    console.log("📩 Parsed Message:", data);

                    // ✅ DISPATCH EVENT (FIX)
                    window.dispatchEvent(
                        new CustomEvent("ws_message", { detail: data })
                    );

                } catch (err) {
                    console.error("❌ Parse Error:", err);
                }
            };

            ws.onerror = (err) => {
                console.error("❌ WS Error:", err);
            };

            ws.onclose = () => {
                console.log("🔌 WS Closed");
            };

            state.socket = ws;
        },

        // SEND MESSAGE
        sendMessage: (state, action) => {
            const { technical_set_id, question_no, answer } = action.payload;

            console.log("📤 Preparing to send message...");
            console.log("📡 Socket:", state.socket);
            console.log("🟢 ReadyState:", state.socket?.readyState);

            if (state.socket && state.socket.readyState === 1) {
                const payload = {
                    technical_set_id,
                    question_no,
                    answer
                };

                console.log("📤 Sending Payload:", payload);

                try {
                    state.socket.send(JSON.stringify(payload));
                    state.loading = true;
                } catch (err) {
                    console.error("❌ Send Error:", err);
                    state.error = "Send failed";
                }
            } else {
                console.error("⚠️ Socket not ready");
            }
        }, // ✅🔥 THIS COMMA FIXED YOUR ERROR

        // CLOSE SOCKET
        disconnectSocket: (state) => {
            console.log("🔌 Disconnecting socket...");

            if (state.socket) {
                state.socket.close();
                state.socket = null;
                state.connected = false;
            } else {
                console.log("⚠️ No socket to disconnect");
            }
        },

        clearMessages: (state) => {
            console.log("🧹 Clearing messages");
            state.messages = [];
        }
    }
});

export const {
    connectSocket,
    sendMessage,
    disconnectSocket,
    clearMessages
} = technicalWsSlice.actions;

export default technicalWsSlice.reducer;