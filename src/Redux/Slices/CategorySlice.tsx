import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '../../services/axiosInstance';
import { CategoryType, ProductType } from '../../types/commonTypes';

interface DataState {
  categories: CategoryType[] | null;
  products: ProductType[] | null;
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
export const fetchCategoryData = createAsyncThunk<
  { categories: CategoryType[] }, // Return type
  string, // Argument type (endpoint)
  { rejectValue: string } // Reject value type
>(
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
export const fetchProductsData = createAsyncThunk<
  { products: ProductType[] }, // Return type
  string, // Argument type (endpoint)
  { rejectValue: string } // Reject value type
>(
  'data/fetchProductsData',
  async (endpoint: string, thunkAPI) => {
    try {
      const response = await axiosInstance.get(endpoint);
      console.log(response?.data?.data);
      
      return { products: response.data?.data || [] };
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
      .addCase(fetchCategoryData.fulfilled, (state, action: PayloadAction<{ categories: CategoryType[] }>) => {
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
      .addCase(fetchProductsData.fulfilled, (state, action: PayloadAction<{ products: ProductType[] }>) => {
        state.productStatus = 'succeeded';
        state.products = action.payload.products;
      })
      .addCase(fetchProductsData.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.productStatus = 'failed';
        state.productError = action.payload || 'Failed to fetch products';
      });
  },
});

export default categorydataSlice.reducer;
