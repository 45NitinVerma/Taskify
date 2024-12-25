// src/api/axiosConfig.js
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000/api'
});

// Add a request interceptor to attach the token
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`; // Fixed template literal syntax
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
