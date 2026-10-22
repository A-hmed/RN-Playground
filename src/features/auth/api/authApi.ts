import {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
} from '../types/authTypes.ts';
import { apiClient } from '../../../lib/apiClient.ts';

export const loginUser = async (
  request: LoginRequest,
): Promise<AuthResponse> => {
  const response = await apiClient.post('auth/signin', request);
  return response.data;
};

export const registerUser = async (
  request: RegisterRequest,
): Promise<AuthResponse> => {
  const response = await apiClient.post('auth/signup', request);
  return response.data;
};
