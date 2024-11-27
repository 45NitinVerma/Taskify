// src/pages/Signup.js
import React, { useState } from 'react';
import AuthForm from '../components/AuthForm';
import axiosInstance from '../api/axiosConfig';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const handleSignup = async (formData) => {
        try {
            const response = await axiosInstance.post('/auth/register', formData);
            console.log('Signup successful:', response.data);
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.message || 'Signup failed. Try again.');
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md">
                <h1 className="text-4xl font-bold text-center text-blue-600 dark:text-blue-400 mb-8">
                    Taskify
                </h1>
                {error && <div className="mb-4 text-red-500 text-center">{error}</div>}
                <AuthForm isLogin={false} onSubmit={handleSignup} />
            </div>
        </div>
    );
};

export default Signup;
