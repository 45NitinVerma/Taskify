// src/pages/Login.js
import React from 'react';
import AuthForm from '../components/AuthForm';
import axiosInstance from '../api/axiosConfig';

const Login = () => {
    const handleLogin = async (formData) => {
        const response = await axiosInstance.post('/auth/login', formData);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data));
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md">
                <h1 className="text-4xl font-bold text-center text-blue-600 dark:text-blue-400 mb-8">
                    Taskify
                </h1>
                <AuthForm isLogin onSubmit={handleLogin} />
            </div>
        </div>
    );
};

export default Login;
