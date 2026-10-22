import { CategoriesResponse, Category } from '../types/categoryTypes.ts';
import { apiClient } from '../../../lib/apiClient.ts';
import { useEffect, useState } from 'react';

export const getCategories = async (): Promise<Category[]> => {
  const response = await apiClient.get<CategoriesResponse>('categories');
  return response.data.data;
};

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getCategories();
      setCategories(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch categories');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return { categories, loading, error, fetchCategories };
};
