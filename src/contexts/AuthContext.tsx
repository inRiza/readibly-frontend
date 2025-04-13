import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

// Configure axios defaults
axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL || 'https://readibly-backend-production.up.railway.app';
axios.defaults.withCredentials = true; // Enable credentials
axios.defaults.headers.common['Content-Type'] = 'application/json';

// Remove CORS headers from frontend (they should be set by the backend)
delete axios.defaults.headers.common['Access-Control-Allow-Origin'];
delete axios.defaults.headers.common['Access-Control-Allow-Methods'];
delete axios.defaults.headers.common['Access-Control-Allow-Headers'];
delete axios.defaults.headers.common['Access-Control-Allow-Credentials'];

// Add request interceptor for logging
axios.interceptors.request.use(
  (config) => {
    console.log('Making request to:', config.url);
    console.log('Request headers:', config.headers);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for logging
axios.interceptors.response.use(
  (response) => {
    console.log('Response received:', response.status, response.data);
    return response;
  },
  (error) => {
    console.error('Response error:', error.response?.status, error.response?.data);
    return Promise.reject(error);
  }
);

interface User {
  id: string;
  email: string;
  username: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUser = async () => {
    try {
      const response = await axios.get<User>('/auth/me');
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching user:', error);
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      // Clear any existing tokens
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];

      const formData = new URLSearchParams();
      formData.append('username', email);
      formData.append('password', password);

      console.log('Attempting login with:', { 
        email, 
        baseURL: axios.defaults.baseURL,
        headers: axios.defaults.headers.common
      });

      const response = await axios.post<{ access_token: string; token_type: string }>(
        '/auth/login',
        formData,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
          },
          withCredentials: true
        }
      );

      console.log('Login response:', response.data);

      if (!response.data.access_token) {
        throw new Error('No access token received');
      }

      const { access_token } = response.data;
      localStorage.setItem('token', access_token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;

      // Fetch user details after successful login
      const userResponse = await axios.get<User>('/auth/me', {
        withCredentials: true
      });
      console.log('User details:', userResponse.data);
      setUser(userResponse.data);
    } catch (error) {
      console.error('Login error:', error);
      if (axios.isAxiosError(error)) {
        console.error('Error details:', {
          status: error.response?.status,
          data: error.response?.data,
          headers: error.response?.headers,
          config: {
            url: error.config?.url,
            method: error.config?.method,
            headers: error.config?.headers
          }
        });
        const errorMessage = error.response?.data?.detail || 'Login failed. Please try again.';
        throw new Error(errorMessage);
      }
      throw new Error('An unexpected error occurred during login');
    }
  };

  const signup = async (email: string, password: string, name: string) => {
    try {
      console.log('Attempting to sign up with:', { email, name });
      const response = await axios.post('/auth/signup', {
        email,
        password,
        username: name
      });
      console.log('Signup response:', response.data);
      // Don't automatically log in the user
      return response.data;
    } catch (error) {
      console.error('Signup error:', error);
      if (axios.isAxiosError(error)) {
        console.error('Error details:', error.response?.data);
        throw new Error(error.response?.data?.detail || 'Error creating account. Please try again.');
      }
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 