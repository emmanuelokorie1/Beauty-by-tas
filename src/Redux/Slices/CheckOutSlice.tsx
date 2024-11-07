import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../services/axiosInstance";
import { toast } from "sonner";

// Define the type for the response data if known
interface CheckoutResponse {
  message: string;
  data?: {
    authorization_url: string;
  };
}

interface CheckoutData {
  email: string;
  name: string;
  address: string;
  state: string;
  city: string;
  country: string;
  orders: { productId: string; quantity: number }[];
}

interface DataState {
  checkOut: CheckoutResponse | null;
  checkOutStatus: "idle" | "loading" | "succeeded" | "failed";
  checkOutError: string | null;
}

const initialState: DataState = {
  checkOut: null,
  checkOutStatus: "idle",
  checkOutError: null,
};

export const PostCheckOut = createAsyncThunk<
  CheckoutResponse, // The return type
  { endpoint: string; data: CheckoutData }, // The argument type
  { rejectValue: string } // The reject value type
>("checkout/PostCheckOut", async ({ endpoint, data }, thunkAPI) => {
  try {
    const response = await axiosInstance.post<CheckoutResponse>(endpoint, data);
    toast.success(response?.data.message || "Checkout initiated successfully", {
      className: "text-green-500 font-semibold",
    });
    window.location.assign(response.data?.data?.authorization_url || "");

    return response.data;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message ||
      error.response?.data?.msg ||
      "Failed to post checkout data";
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
      .addCase(PostCheckOut.pending, (state) => {
        state.checkOutStatus = "loading";
      })
      .addCase(PostCheckOut.fulfilled, (state, action: PayloadAction<CheckoutResponse>) => {
        state.checkOutStatus = "succeeded";
        state.checkOut = action.payload;
      })
      .addCase(PostCheckOut.rejected, (state, action: PayloadAction<string>) => {
        state.checkOutStatus = "failed";
        state.checkOutError = action.payload || "Failed to post checkout data";
      });
  },
});

export default CheckOutSlice.reducer;
