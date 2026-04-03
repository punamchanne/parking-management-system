
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export const getStats = async () => {
    const response = await axios.get(`${API_BASE_URL}/stats`);
    return response.data;
};

export const getLogs = async () => {
    const response = await axios.get(`${API_BASE_URL}/logs`);
    return response.data;
};

export const registerUser = async (userData) => {
    const response = await axios.post(`${API_BASE_URL}/users/register`, userData);
    return response.data;
};

export const loginUser = async (credentials) => {
    const response = await axios.post(`${API_BASE_URL}/users/login`, credentials);
    return response.data;
};

export const getUserViolations = async (vehicleNumber) => {
    const response = await axios.get(`${API_BASE_URL}/users/violations/${vehicleNumber}`);
    return response.data;
};
