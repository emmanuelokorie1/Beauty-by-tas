// src/features/categorydataSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '../../services/axiosInstance';

// Define the type for the state
interface CategoryDataState {
  data: any | null; // You can replace `any` with a specific type if you know the structure of your data
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// Initial state
const initialState: CategoryDataState = {
  data: null,
  status: 'idle',
  error: null,
};

// Async thunk to fetch data
export const fetchCategoryData = createAsyncThunk(
  'data/fetchCategoryData',
  async (endpoint: string, thunkAPI) => {
    try {
      const response = await axiosInstance.get(endpoint);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const categorydataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategoryData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategoryData.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchCategoryData.rejected, (state, action: PayloadAction<string>) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default categorydataSlice.reducer;
