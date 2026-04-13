import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { auth } from "../firebase";

const initialState = {
    loading: false,
    result: null,
    error: null
};

// ============================
// RUN PLAYGROUND
// ============================
export const runPlayground = createAsyncThunk(
    "playground/run",
    async (payload, thunkAPI) => {
        try {
            const user = auth.currentUser;
            let headers = {};

            // optional auth
            if (user) {
                const token = await user.getIdToken();
                headers.Authorization = `Bearer ${token}`;
            }

            const response = await axios.post(
                "https://ai-interview-preparation-three.vercel.app/coding/playground",
                {
                    code: payload.code,
                    language: payload.language,
                    stdin: payload.stdin || ""
                },
                { headers }
            );

            return response.data;

        } catch (error) {
            return thunkAPI.rejectWithValue(
                error?.response?.data?.detail ||
                error?.response?.data ||
                error.message
            );
        }
    }
);

const playgroundSlice = createSlice({
    name: "playground",
    initialState,
    reducers: {
        clearPlayground: (state) => {
            state.result = null;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(runPlayground.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(runPlayground.fulfilled, (state, action) => {
                state.loading = false;
                state.result = action.payload;
            })
            .addCase(runPlayground.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const { clearPlayground } = playgroundSlice.actions;
export default playgroundSlice.reducer;