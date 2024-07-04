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

export const signinUser = async () => {
  try {
    const responce = await axios.post(`${API_URL}/users/signin`);
    return responce.data;
  } catch (error) {
    console.error('Error post data', error);
    throw error;
  }
};

export const loginUser = async () => {
  try {
    const responce = await axios.post(`${API_URL}/users/login`);
    return responce.data;
  } catch (error) {
    console.error('Error post data', error);
    throw error;
  }
};
