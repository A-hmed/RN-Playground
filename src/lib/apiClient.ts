import axios, { AxiosError } from 'axios';

const BASE_URL = 'https://ecommerce.routemisr.com/api/v1/';

export const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

apiClient.interceptors.request.use(
  config => {
    // Only log in development mode (__DEV__)
    if (__DEV__) {
      console.log(
        `🚀 [API REQUEST] ${config.method?.toUpperCase()} => ${config.url}`,
      );
      if (config.data) {
        console.log('📦 Payload:', JSON.stringify(config.data, null, 2));
      }
    }
    return config;
  },
  error => {
    if (__DEV__) {
      console.error('❌ [REQUEST ERROR]', error);
    }
    return Promise.reject(error);
  },
);

// ==========================================
// 2. RESPONSE LOGGING & GLOBAL ERROR HANDLER
// ==========================================
apiClient.interceptors.response.use(
  response => {
    if (__DEV__) {
      console.log(
        `✅ [API RESPONSE ${response.status}] <= ${response.config.url}`,
      );
    }
    return response;
  },
  (error: AxiosError<any>) => {
    let friendlyErrorMessage =
      'An unexpected error occurred. Please try again.';
    if (error.response) {
      // ----------------------------------------------------
      // A. Server responded with a status code outside 2xx
      // ----------------------------------------------------
      const status = error.response.status;
      const serverMessage =
        error.response.data?.message || error.response.data?.errors?.msg;
      if (__DEV__) {
        console.error(
          `🔴 [API ERROR ${status}] ${error.config?.url}:`,
          error.response.data,
        );
      }
      switch (status) {
        case 400:
          friendlyErrorMessage =
            serverMessage || 'Invalid request. Please check your data.';
          break;
        case 401:
          friendlyErrorMessage =
            serverMessage || 'Session expired. Please log in again.';
          // Tip: Trigger redirect to Login screen here if token expired
          break;
        case 404:
          friendlyErrorMessage = 'Requested resource not found.';
          break;
        case 409:
          friendlyErrorMessage = serverMessage || 'Account already exists.';
          break;
        case 500:
          friendlyErrorMessage = 'Server error. Please try again later.';
          break;
        default:
          friendlyErrorMessage = serverMessage || friendlyErrorMessage;
      }
    } else if (error.request) {
      // ----------------------------------------------------
      // B. Request was made but NO response was received
      // ----------------------------------------------------
      if (__DEV__) {
        console.error('📡 [NETWORK ERROR] No response received from server.');
      }
      friendlyErrorMessage =
        'Network error. Please check your internet connection.';
    } else {
      // ----------------------------------------------------
      // C. Something happened while setting up the request
      // ----------------------------------------------------
      friendlyErrorMessage = error.message;
    }
    // Attach our clean error message to the rejected promise
    return Promise.reject(new Error(friendlyErrorMessage));
  },
);
