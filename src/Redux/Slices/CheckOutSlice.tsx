import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../services/axiosInstance";
import { toast } from "sonner";

interface DataState {
  checkOut: any | null;
  checkOutStatus: "idle" | "loading" | "succeeded" | "failed";
  checkOutError: string | null;
}

// Initial state
const initialState: DataState = {
  checkOut: null,
  checkOutStatus: "idle",
  checkOutError: null,
};

// Async thunk to post sign-up data
export const PostCheckOut = createAsyncThunk<
  any, // Return type
  { endpoint: string; data: any }, // Argument type
  { rejectValue: string } // Reject value type
>("checkout/PostCheckOut", async ({ endpoint, data }, thunkAPI) => {
  try {
    const response = await axiosInstance.post(endpoint, data);
    toast.success(response?.data.message || "Signed up successfully", {
      className: "text-green-500 font-semibold",
    });
     window.location.assign(response.data?.data?.authorization_url)
     
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
});

const CheckOutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle sign-up data post
      .addCase(PostCheckOut.pending, (state) => {
        state.checkOutStatus = "loading";
      })
      .addCase(PostCheckOut.fulfilled, (state, action: PayloadAction<any>) => {
        state.checkOutStatus = "succeeded";
        state.checkOut = action.payload;
      })
      .addCase(
        PostCheckOut.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.checkOutStatus = "failed";
          state.checkOutError = action.payload || "Failed to post sign-up data";
        }
      );
  },
});

export default CheckOutSlice.reducer;
