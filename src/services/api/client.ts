import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

// Create axios instance
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Send cookies with requests
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
});

// Request interceptor for CSRF token
apiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    // Get CSRF token for state-changing requests
    if (['post', 'put', 'patch', 'delete'].includes(config.method || '')) {
      try {
        // Only fetch CSRF token if we don't have one
        const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
        if (!csrfToken) {
          await apiClient.get('/sanctum/csrf-cookie');
        }
      } catch (error) {
        console.warn('Failed to fetch CSRF token:', error);
      }
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Redirect to login on unauthorized
      window.location.href = '/login';
    } else if (error.response?.status === 403) {
      // Redirect to forbidden page
      window.location.href = '/forbidden';
    } else if (error.response?.status === 419) {
      // CSRF token mismatch - refresh and retry
      window.location.reload();
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;