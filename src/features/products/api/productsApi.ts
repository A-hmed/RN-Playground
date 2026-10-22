import { useState, useEffect } from 'react';
import { apiClient } from '../../../lib/apiClient';
import { Product, ProductsResponse } from '../types/productTypes';

// 1. Raw API Call Function
export const getProducts = async (): Promise<Product[]> => {
  const response = await apiClient.get<ProductsResponse>('products');
  return response.data.data;
};

// 2. Custom Hook for Components
export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getProducts();
      setProducts(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return { products, loading, error, refetch: fetchProducts };
};
