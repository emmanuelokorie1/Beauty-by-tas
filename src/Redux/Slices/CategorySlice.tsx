// src/features/categorydataSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '../../services/axiosInstance';

interface DataState {
  categories: any | null;
  products: any | null;
  categoryStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  productStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  categoryError: string | null;
  productError: string | null;
}

// Initial state
const initialState: DataState = {
  categories: null,
  products: null,
  categoryStatus: 'idle',
  productStatus: 'idle',
  categoryError: null,
  productError: null,
};

// Async thunk to fetch category data
export const fetchCategoryData = createAsyncThunk(
  'data/fetchCategoryData',
  async (endpoint: string, thunkAPI) => {
    try {
      const response = await axiosInstance.get(endpoint);
      return response.data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || 'Failed to fetch categories';
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

// Async thunk to fetch products by category
export const fetchProductsData = createAsyncThunk(
  'data/fetchProductsData',
  async (endpoint: string, thunkAPI) => {
    try {
      const response = await axiosInstance.get(endpoint);
      return response.data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || 'Failed to fetch products';
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

const categorydataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle category fetch
      .addCase(fetchCategoryData.pending, (state) => {
        state.categoryStatus = 'loading';
      })
      .addCase(fetchCategoryData.fulfilled, (state, action: PayloadAction<{ categories: Category[] }>) => {
        state.categoryStatus = 'succeeded';
        state.categories = action.payload.categories;
      })
      .addCase(fetchCategoryData.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.categoryStatus = 'failed';
        state.categoryError = action.payload || 'Failed to fetch categories';
      })

      // Handle products fetch
      .addCase(fetchProductsData.pending, (state) => {
        state.productStatus = 'loading';
      })
      .addCase(fetchProductsData.fulfilled, (state, action: PayloadAction<{ products: Product[] }>) => {
        state.productStatus = 'succeeded';
        state.products = action.payload?.data;
      })
      .addCase(fetchProductsData.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.productStatus = 'failed';
        state.productError = action.payload || 'Failed to fetch products';
      });
  },
});

export default categorydataSlice.reducer;
