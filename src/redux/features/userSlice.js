import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from "../../Axios/axios";
import { toast } from "react-toastify";

const initialState = {
  isAuthReady: false,
  userObj: null,
  loading: false,
  Error: null,
};

export const loginUser = createAsyncThunk(
  "user/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await Axios.post("user/login", {
        email,
        password,
      });
      sessionStorage.setItem("userObj", JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      throw rejectWithValue(error.response.data.error);
    }
  }
);
export const signupUser = createAsyncThunk(
  "user/signup",
  async ({ username, email, password }, { rejectWithValue }) => {
    try {
      const response = await Axios.post("user/signup", {
        username,
        email,
        password,
      });
      sessionStorage.setItem("userObj", JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      console.log(error);
      throw rejectWithValue(error.response.data.error);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCachedUser: (state, { payload }) => {
      let cachedUserObj = JSON.parse(sessionStorage.getItem("userObj"));
      state.userObj = cachedUserObj || null;
      state.isAuthReady = true;
    },
    setUser: (state, { payload }) => {
      state.userObj = payload;
    },
    clearUser: (state, { payload }) => {
      state.userObj = null;
      sessionStorage.removeItem("userObj");
      toast.success("Logout sucessful");
    },
    clearAuthError: (state, { payload }) => {
      state.Error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, { payload }) => {
      state.userObj = payload;
      state.loading = false;
      state.Error = null;
      toast.success("Login sucessful");
    });
    builder.addCase(loginUser.pending, (state, { payload }) => {
      state.loading = true;
    });
    builder.addCase(loginUser.rejected, (state, { payload }) => {
      state.Error = payload;
      state.loading = false;
      toast.success("Login Failed");
    });

    builder.addCase(signupUser.fulfilled, (state, { payload }) => {
      state.userObj = payload;
      state.Error = null;
      state.loading = false;
      toast.success("Singnup sucessful");
    });
    builder.addCase(signupUser.rejected, (state, { payload }) => {
      state.Error = payload;
      state.loading = false;
      toast.success("Singnup failed");
    });
    builder.addCase(signupUser.pending, (state, { payload }) => {
      state.loading = true;
    });
  },
});

export const { setCachedUser, setUser, clearUser, clearAuthError } =
  userSlice.actions;
export default userSlice.reducer;
