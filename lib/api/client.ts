import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';


declare module 'axios' {
  export interface InternalAxiosRequestConfig {
    _retry?: boolean;
  }
}

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://his-pied.vercel.app/',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - adds token to requests
apiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    // For web: use localStorage
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('accessToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        console.log('🔑 Adding token to headers:', token.substring(0, 20) + '...');
      }
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response.data,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };
    
    console.log('❌ API Error:', error?.response?.data || error.message);
    
    // Handle 401 Unauthorized - token expired
    if (error?.response?.status === 401 && !originalRequest?._retry && typeof window !== 'undefined') {
      originalRequest._retry = true;
      
      try {
        // Try to refresh token
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
          const response = await apiClient.post('/auth/refresh/', { refresh: refreshToken });
          const { access } = response as any;
          
          localStorage.setItem('accessToken', access);
          
          // Retry original request with new token
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${access}`;
          }
          return apiClient(originalRequest);
        }
      } catch (refreshError) {
        // Refresh failed - logout
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
    }
    
    // Handle 403 Forbidden
    if (error?.response?.status === 403 && typeof window !== 'undefined') {
      window.location.href = '/unauthorized';
    }
    
    return Promise.reject(error);
  }
);

export default apiClient ;