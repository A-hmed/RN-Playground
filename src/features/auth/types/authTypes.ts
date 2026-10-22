// 1. User Profile Model returned by backend
export interface User {
  name: string;
  email: string;
  role?: string;
}

// 2. Request Payloads for API
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  rePassword: string;
  phone: string;
}

// 3. API Response Object
export interface AuthResponse {
  message: string;
  user: User;
  token: string;
}
