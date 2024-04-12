import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../Axios/axios";

const initialState = {
  isAuthReady: false,
  userObj: null,
};

export const loginUser = createAsyncThunk("user/login", async () => {});
export const signupUser = createAsyncThunk(
  "user/signup",
  async ({ username, email, password }) => {
    try {
      const response = await axios.post("user/signup", {
        username,
        email,
        password,
      });
      return response.data;
    } catch (error) {
      console.error("Error during signup:", error);
      // Handle the error appropriately, e.g., display an error message to the user
      throw error; // Re-throw the error to propagate it if needed
    }
  }
);
export const logoutUser = createAsyncThunk("user/logourt", async () => {});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, { payload }) => {});
    builder.addCase(loginUser.pending, (state, { payload }) => {});
    builder.addCase(signupUser.fulfilled, (state, { payload }) => {
      state.userObj = payload;
    });
    builder.addCase(signupUser.pending, (state, { payload }) => {
      console.log("signup loading...");
    });
  },
});

export const {} = userSlice.actions;
export default userSlice.reducer;
// export const getCompletedTodos = (state) => state.todoReducer.completed;
// export const getPendingTodos = (state) => state.todoReducer.pending;
