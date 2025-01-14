import axios from 'axios';

const API_URL = 'http://localhost:8080';

const api = {
  // Auth endpoints
  signup: async (userData) => {
    try {
      const response = await axios.post(`${API_URL}/auth/signup`, userData);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  login: async (credentials) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, credentials);
      localStorage.setItem('token', response.data.token);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  // Stock management endpoints
  addItem: async (itemData) => {
    try {
      const response = await axios.post(`${API_URL}/stock/addItems`, itemData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  getAllItems: async () => {
    try {
      const response = await axios.get(`${API_URL}/api/items`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  sellItem: async (sellData) => {
    try {
      const response = await axios.post(`${API_URL}/api/sellItem`, sellData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
};

export default api;