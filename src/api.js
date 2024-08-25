import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const registerUser = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, { username, password });
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

export const loginUser = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, { username, password });
    const token = response.data.token;
    if (token) {
      localStorage.setItem('token', token);
    }
    return response.data;
  } catch (error) {
    console.error('Error logging in user:', error);
    throw error;
  }
};

export const getMemories = async (username) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/api/memories?username=${username}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching memories:', error);
    return [];
  }
};

export const addMemory = async (username, title, date, icon) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(`${API_URL}/api/memories`, { username, title, date, icon }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error adding memory:', error);
    throw error;
  }
};
