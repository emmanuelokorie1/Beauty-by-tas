import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../services/axiosInstance";
import { toast } from "sonner";

interface DataState {
  signUp: any | null;
  login: any | null;
  signUpStatus: "idle" | "loading" | "succeeded" | "failed";
  logintatus: "idle" | "loading" | "succeeded" | "failed";
  signUpError: string | null;
  loginError: string | null;
}

// Initial state
const initialState: DataState = {
  signUp: null,
  login: null,
  signUpStatus: "idle",
  logintatus: "idle",
  signUpError: null,
  loginError: null,
};

// Async thunk to post sign-up data
export const PostSignUpData = createAsyncThunk(
  "auth/PostSignUpData",
  async ({ endpoint, data }: { endpoint: string; data: any }, thunkAPI) => {
    try {
      const response = await axiosInstance.post(endpoint, data);
      toast.success(response?.data.message || "Signed up successfully", {
        className: "text-green-500 font-semibold",
      });

      return response.data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.msg ||
        "Failed to sign up user";
      toast.error(errorMessage, {
        className: "text-red-600",
      });
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

// Async thunk to post sign-up data
export const PostLoginData = createAsyncThunk(
  "auth/PostLoginData",
  async ({ endpoint, data }: { endpoint: string; data: any }, thunkAPI) => {
    try {
      const response = await axiosInstance.post(endpoint, data);
      toast.success(response?.data.message || "Logged in successfully", {
        className: "text-green-500 font-semibold",
      });
      sessionStorage.setItem("userDetails", JSON.stringify(response.data));
      window.location.assign('/');
      return response.data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.msg ||
        "Failed to login user";
      toast.error(errorMessage, {
        className: "text-red-600",
      });
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

const authDataSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle sign-up data post
      .addCase(PostSignUpData.pending, (state) => {
        state.signUpStatus = "loading";
      })
      .addCase(
        PostSignUpData.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.signUpStatus = "succeeded";
          state.signUp = action.payload;
        }
      )
      .addCase(
        PostSignUpData.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.signUpStatus = "failed";
          state.signUpError = action.payload || "Failed to post sign-up data";
        }
      )

      // Handle login data post
      .addCase(PostLoginData.pending, (state) => {
        state.logintatus = "loading";
      })
      .addCase(PostLoginData.fulfilled, (state, action: PayloadAction<any>) => {
        state.logintatus = "succeeded";
        state.login = action.payload;
      })
      .addCase(
        PostLoginData.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.logintatus = "failed";
          state.loginError = action.payload || "Failed to post sign-up data";
        }
      );
  },
});

export default authDataSlice.reducer;