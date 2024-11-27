// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Navigation from './components/Navigation';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Tasks from './pages/Tasks';
import './App.css';

const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    return token ? children : <Navigate to="/login" />;
};

function App() {
    return (
        <ThemeProvider>
            <Router>
                <div className="App min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route
                            path="/tasks"
                            element={
                                <PrivateRoute>
                                    <>
                                        <Navigation />
                                        <Tasks />
                                    </>
                                </PrivateRoute>
                            }
                        />
                        <Route path="/" element={<Navigate to="/tasks" />} />
                    </Routes>
                </div>
            </Router>
        </ThemeProvider>
    );
}

export default App;
