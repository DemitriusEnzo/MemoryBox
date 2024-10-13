import axios from 'axios';

export const API_URL = 'https://memorybox-server.onrender.com';

const api = axios.create({
  baseURL: API_URL,
});

const getToken = () => localStorage.getItem('token');

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
    }
    return Promise.reject(error);
  }
);

export const registerUser = async (username, password) => {
  try {
    const response = await api.post('/auth/register', { username, password });
    return response.data;
  } catch (error) {
    console.error('Registration error:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const loginUser = async (username, password) => {
  try {
    const response = await api.post('/auth/login', { username, password });
    const token = response.data.token;
    if (token) {
      localStorage.setItem('token', token);
    } else {
      throw new Error('No token received from login');
    }
    return response.data;
  } catch (error) {
    console.error('Login error:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const getUserProfile = async (username) => {
  try {
    const response = await api.get(`/api/profile/${username}`);
    if (!response.data.success) {
      throw new Error('Failed to fetch profile');
    }
    return response.data.user;
  } catch (error) {
    console.error('Fetch profile error:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const updatePassword = async (username, newPassword) => {
  try {
    const response = await api.patch(`/api/profile/${username}/password`, { newPassword });
    return response.data;
  } catch (error) {
    console.error('Password update error:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const getMemories = async (username) => {
  try {
    const response = await api.get(`/api/memories`, { params: { username } });
    return response.data;
  } catch (error) {
    console.error('Fetch memories error:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const addMemory = async (username, title, date, icon) => {
  try {
    const response = await api.post('/api/memories', { username, title, date, icon });
    return response.data;
  } catch (error) {
    console.error('Create memory error:', error.response ? error.response.data : error.message);
    throw error;
  }
};
