import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Product } from '../../products/types/productTypes';
import {
  addToCartApi,
  clearUserCartApi,
  getUserCart,
  removeFromCartApi,
  updateCartQuantityApi,
} from '../api/cartApi';
import { ApiCartItem } from '../types/cartApiTypes';

interface CartState {
  items: { [productId: string]: { product: Product; quantity: number } };
  totalCartPrice: number;
  numOfCartItems: number;
  loading: boolean;
  error: string | null;
}

const initialState: CartState = {
  items: {},
  totalCartPrice: 0,
  numOfCartItems: 0,
  loading: false,
  error: null,
};

// 1. Fetch Cart Thunk
export const fetchCartThunk = createAsyncThunk(
  'cart/fetchCart',
  async (token: string, { rejectWithValue }) => {
    try {
      const response = await getUserCart(token);
      return response;
    } catch (err: any) {
      return rejectWithValue(err.message || 'Failed to fetch cart');
    }
  }
);

// 2. Add To Cart Thunk
export const addToCartThunk = createAsyncThunk(
  'cart/addToCart',
  async ({ productId, token }: { productId: string; token: string }, { rejectWithValue }) => {
    try {
      const response = await addToCartApi(productId, token);
      return response;
    } catch (err: any) {
      return rejectWithValue(err.message || 'Failed to add item to cart');
    }
  }
);

// 3. Update Quantity Thunk
export const updateCartQuantityThunk = createAsyncThunk(
  'cart/updateQuantity',
  async (
    { productId, count, token }: { productId: string; count: number; token: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await updateCartQuantityApi(productId, count, token);
      return response;
    } catch (err: any) {
      return rejectWithValue(err.message || 'Failed to update quantity');
    }
  }
);

// 4. Remove Item Thunk
export const removeFromCartThunk = createAsyncThunk(
  'cart/removeItem',
  async ({ productId, token }: { productId: string; token: string }, { rejectWithValue }) => {
    try {
      const response = await removeFromCartApi(productId, token);
      return response;
    } catch (err: any) {
      return rejectWithValue(err.message || 'Failed to remove item');
    }
  }
);

// 5. Clear Cart Thunk
export const clearCartThunk = createAsyncThunk(
  'cart/clearCart',
  async (token: string, { rejectWithValue }) => {
    try {
      await clearUserCartApi(token);
      return true;
    } catch (err: any) {
      return rejectWithValue(err.message || 'Failed to clear cart');
    }
  }
);

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    const updateStateFromApi = (state: CartState, action: any) => {
      state.loading = false;
      if (action.payload?.data) {
        state.totalCartPrice = action.payload.data.totalCartPrice;
        state.numOfCartItems = action.payload.numOfCartItems;

        const newItems: { [id: string]: { product: Product; quantity: number } } = {};
        action.payload.data.products.forEach((item: ApiCartItem) => {
          if (item.product) {
            const id = item.product._id || item.product.id;
            newItems[id] = { product: item.product, quantity: item.count };
          }
        });
        state.items = newItems;
      }
    };

    builder
      .addCase(fetchCartThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCartThunk.fulfilled, updateStateFromApi)
      .addCase(fetchCartThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addToCartThunk.fulfilled, updateStateFromApi)
      .addCase(updateCartQuantityThunk.fulfilled, updateStateFromApi)
      .addCase(removeFromCartThunk.fulfilled, updateStateFromApi)
      .addCase(clearCartThunk.fulfilled, (state) => {
        state.items = {};
        state.numOfCartItems = 0;
        state.totalCartPrice = 0;
      });
  },
});

export default cartSlice.reducer;
