import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const speakSarvam = createAsyncThunk(
    "sarvam/speak",
    async (text, { rejectWithValue }) => {
        try {
            console.log("🎤 Sarvam request:", text);

            const response = await axios.post(
                "https://api.sarvam.ai/text-to-speech",
                {
                    text,
                    target_language_code: "en-IN",
                    speaker: "anushka",
                    model: "bulbul:v2",
                    output_audio_codec: "wav"
                },
                {
                    headers: {
                        "api-subscription-key": `${import.meta.env.VITE_SARVAM_API_KEY}`,
                        "Content-Type": "application/json"
                    }
                }
            );

            console.log("✅ raw response", response.data);

            // base64 audio

            const base64Audio = response.data.audios[0];

            console.log("base64 exists:", !!base64Audio);

            const audioUrl = `data:audio/wav;base64,${base64Audio}`;

            return {
                audio: audioUrl,
                text
            };

        } catch (e) {
            console.error("❌ Sarvam error:", e);
            return rejectWithValue("Sarvam failed");
        }
    }
);

const sarvamSlice = createSlice({
    name: "sarvam",
    initialState: {
        isPlaying: false,
        text: "",
        audioUrl: null,
        error: null
    },
    reducers: {
        stopVoice: (state) => {
            state.isPlaying = false;
            state.text = "";
            state.audioUrl = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(speakSarvam.pending, (state) => {
                console.log("⏳ loading");
                state.isPlaying = true;
            })

            .addCase(speakSarvam.fulfilled, (state, action) => {
                console.log("🎧 success");

                state.audioUrl = action.payload.audio;
                state.text = action.payload.text;
                state.isPlaying = true;
            })

            .addCase(speakSarvam.rejected, (state) => {
                console.log("💥 failed");
                state.isPlaying = false;
            });

    }
});

export const { stopVoice } = sarvamSlice.actions;
export default sarvamSlice.reducer;