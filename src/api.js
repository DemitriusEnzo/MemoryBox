import axios from 'axios';

const API_URL = 'http://localhost:5000';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const registerUser = async (username, password) => {
  const response = await api.post('/auth/register', { username, password });
  return response.data;
};

export const loginUser = async (username, password) => {
  const response = await api.post('/auth/login', { username, password });
  const token = response.data.token;
  if (token) {
    localStorage.setItem('token', token);
  }
  return response.data;
};

export const getUserProfile = async (username) => {
  const response = await api.get(`/api/profile/${username}`);
  if (!response.data.success) {
    throw new Error('Failed to fetch profile');
  }
  return response.data.user;
};

export const updatePassword = async (username, newPassword) => {
  const response = await api.patch(`/api/profile/${username}/password`, { newPassword });
  return response.data;
};

export const getMemories = async (username) => {
  const response = await api.get(`/api/memories?username=${username}`);
  return response.data;
};

export const addMemory = async (username, title, date, icon) => {
  const response = await api.post('/api/memories', { username, title, date, icon });
  return response.data;
};
