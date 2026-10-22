import { apiClient } from '../../../lib/apiClient';
import { ApiCartResponse } from '../types/cartApiTypes';

const getAuthHeaders = (token: string) => ({
  headers: { token },
});

// 1. GET User Cart
export const getUserCart = async (token: string): Promise<ApiCartResponse> => {
  const response = await apiClient.get<ApiCartResponse>('cart', getAuthHeaders(token));
  return response.data;
};

// 2. POST Add Product to Cart
export const addToCartApi = async (
  productId: string,
  token: string
): Promise<ApiCartResponse> => {
  const response = await apiClient.post<ApiCartResponse>(
    'cart',
    { productId },
    getAuthHeaders(token)
  );
  return response.data;
};

// 3. PUT Update Product Quantity in Cart
export const updateCartQuantityApi = async (
  productId: string,
  count: number,
  token: string
): Promise<ApiCartResponse> => {
  const response = await apiClient.put<ApiCartResponse>(
    `cart/${productId}`,
    { count: count.toString() },
    getAuthHeaders(token)
  );
  return response.data;
};

// 4. DELETE Remove Specific Cart Item
export const removeFromCartApi = async (
  productId: string,
  token: string
): Promise<ApiCartResponse> => {
  const response = await apiClient.delete<ApiCartResponse>(
    `cart/${productId}`,
    getAuthHeaders(token)
  );
  return response.data;
};

// 5. DELETE Clear Entire User Cart
export const clearUserCartApi = async (token: string): Promise<{ message: string }> => {
  const response = await apiClient.delete<{ message: string }>(
    'cart',
    getAuthHeaders(token)
  );
  return response.data;
};
