/* eslint-disable no-console */
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// eslint-disable-next-line import/prefer-default-export
export const fetchData = async () => {
  try {
    const responce = await axios.get(`${API_URL}/announcements/highlight`);
    return responce.data;
  } catch (error) {
    console.error('Error fetching data', error);
    throw error;
  }
};

export const signinUser = async (formData) => {
  try {
    const responce = await axios.post(`${API_URL}/users/signin`, formData);
    return responce.data;
  } catch (error) {
    console.error('Error post data', error);
    throw error;
  }
};

export const loginUser = async (formData) => {
  try {
    const responce = await axios.post(`${API_URL}/users/login`, formData);
    return responce.data;
  } catch (error) {
    console.error('Error post data', error);
    throw error;
  }
};

export const getUser = async (id) => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Token not found');
  }
  try {
    const response = await axios.get(`${API_URL}/users/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile', error);
    throw error;
  }
};
