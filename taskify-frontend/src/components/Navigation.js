// src/components/Navigation.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { Sun, Moon, Menu, X, LogOut } from "lucide-react"; // Added LogOut icon

const Navigation = () => {
	const navigate = useNavigate();
	const { isDarkMode, toggleTheme } = useTheme();
	const user = JSON.parse(localStorage.getItem("user") || "{}");
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

	const handleLogoutClick = () => {
		setShowLogoutConfirm(true);
		setIsMenuOpen(false);
	};

	const handleLogoutConfirm = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("user");
		navigate("/login");
	};

	// Add logout confirmation modal
	const LogoutConfirmation = () => (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
			<div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-sm w-full mx-4 shadow-xl">
				<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
					Confirm Logout
				</h3>
				<p className="text-gray-600 dark:text-gray-300 mb-6">
					Are you sure you want to log out of your account?
				</p>
				<div className="flex space-x-4">
					<button
						onClick={() => setShowLogoutConfirm(false)}
						className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 
                                 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 
                                 dark:hover:bg-gray-700 transition-colors duration-200"
					>
						Cancel
					</button>
					<button
						onClick={handleLogoutConfirm}
						className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg
                                 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700
                                 transition-colors duration-200 flex items-center justify-center"
					>
						<LogOut className="w-4 h-4 mr-2" />
						Logout
					</button>
				</div>
			</div>
		</div>
	);

	// Update the logout button in the desktop menu
	const LogoutButton = () => (
		<button
			onClick={handleLogoutClick}
			className="group bg-red-500 text-white px-4 py-2 rounded-lg
                     hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700
                     transition-all duration-200 flex items-center space-x-2
                     shadow-sm hover:shadow-md"
			aria-label="Logout"
		>
			<LogOut className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
			<span>Logout</span>
		</button>
	);

	return (
		<nav className="bg-white dark:bg-gray-800 shadow-lg sticky top-0 z-50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between h-16">
					{/* Logo and Brand */}
					<div className="flex items-center">
						<a
							href="/"
							className="flex items-center space-x-3 flex-shrink-0"
						>
							{/* You can add a logo image here */}
							<svg
								className="h-8 w-8 text-blue-600 dark:text-blue-400"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
								/>
							</svg>
							<h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
								Taskify
							</h1>
						</a>
					</div>

					{/* Mobile menu button */}
					<div className="flex items-center sm:hidden">
						{user?.email && (
							<button
								onClick={() => setIsMenuOpen(!isMenuOpen)}
								className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
							>
								{isMenuOpen ? (
									<X className="block h-6 w-6" />
								) : (
									<Menu className="block h-6 w-6" />
								)}
							</button>
						)}
					</div>

					{/* Desktop menu */}
					{user?.email && (
						<div className="hidden sm:flex items-center space-x-4">
							<div className="flex items-center space-x-3 px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700">
								<span className="text-sm font-medium text-gray-700 dark:text-gray-300">
									{user.name}
								</span>
							</div>
							<button
								onClick={toggleTheme}
								className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 
                                 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
								aria-label="Toggle theme"
							>
								{isDarkMode ? (
									<Sun className="w-5 h-5" />
								) : (
									<Moon className="w-5 h-5" />
								)}
							</button>
							<LogoutButton />
						</div>
					)}
				</div>
			</div>

			{/* Mobile dropdown menu */}
			{isMenuOpen && user?.email && (
				<div className="sm:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-4 space-y-4 px-4">
					<div className="flex items-center space-x-3 px-3 py-1 rounded-lg bg-gray-100 dark:bg-gray-700">
						<span className="text-sm font-medium text-gray-700 dark:text-gray-300">
							{user.name}
						</span>
					</div>
					<button
						onClick={toggleTheme}
						className="w-full flex items-center justify-center p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 
                                 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
						aria-label="Toggle theme"
					>
						{isDarkMode ? (
							<Sun className="w-5 h-5 mr-2" />
						) : (
							<Moon className="w-5 h-5 mr-2" />
						)}
						<span>Toggle Theme</span>
					</button>
					<LogoutButton />
				</div>
			)}

			{/* Show logout confirmation modal */}
			{showLogoutConfirm && <LogoutConfirmation />}
		</nav>
	);
};

export default Navigation;
