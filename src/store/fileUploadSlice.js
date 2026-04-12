import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { auth } from "../firebase";

const initialState = {
  loading: false,
  data: null,
  error: null
};

export const uploadFile = createAsyncThunk(
  "file/upload",
  async (file, thunkAPI) => {
    try {
      console.log("Selected file:", file);

      const user = auth.currentUser;
      console.log("Current user:", user);

      if (!user) {
        throw new Error("User not logged in");
      }

      const token = await user.getIdToken();
      console.log("Firebase token:", token);

      const formData = new FormData();
      formData.append("file", file);

      console.log("Uploading to:", "https://aiinterviewpreparation.onrender.com/api/resume/");

      const response = await axios.post(
        "https://aiinterviewpreparation.onrender.com/api/resume/",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      console.log("UPLOAD SUCCESS:", response.data);

      return response.data;

    } catch (error) {
      console.log("UPLOAD ERROR FULL:", error);
      console.log("UPLOAD ERROR MESSAGE:", error.message);
      console.log("UPLOAD ERROR RESPONSE:", error.response);
      console.log("UPLOAD ERROR STATUS:", error?.response?.status);
      console.log("UPLOAD ERROR DATA:", error?.response?.data);
      console.log("UPLOAD ERROR HEADERS:", error?.response?.headers);

      return thunkAPI.rejectWithValue(
        error?.response?.data || error.message
      );
    }
  }
);

const fileUploadSlice = createSlice({
  name: "fileUpload",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadFile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadFile.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(uploadFile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default fileUploadSlice.reducer;