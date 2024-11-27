// src/components/AuthForm.js (updated with dark mode)
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthForm = ({ isLogin, onSubmit }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await onSubmit(formData);
            navigate('/tasks');
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                {isLogin ? 'Login' : 'Sign Up'}
            </h2>
            {error && (
                <div className="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 p-3 rounded mb-4">
                    {error}
                </div>
            )}
            <form onSubmit={handleSubmit}>
                {!isLogin && (
                    <div className="mb-4">
                        <label className="block mb-2 text-gray-700 dark:text-gray-300">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full p-2 border dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            required
                        />
                    </div>
                )}
                <div className="mb-4">
                    <label className="block mb-2 text-gray-700 dark:text-gray-300">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-2 border dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 text-gray-700 dark:text-gray-300">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full p-2 border dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
                >
                    {isLogin ? 'Login' : 'Sign Up'}
                </button>
            </form>
            <p className="mt-4 text-center text-gray-600 dark:text-gray-400">
                {isLogin ? (
                    <>
                        Don't have an account?{' '}
                        <a
                            href="/signup"
                            className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                            Sign Up
                        </a>
                    </>
                ) : (
                    <>
                        Already have an account?{' '}
                        <a
                            href="/login"
                            className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                            Login
                        </a>
                    </>
                )}
            </p>
        </div>
    );
};

export default AuthForm;