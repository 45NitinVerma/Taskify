// src/components/Navigation.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { Sun, Moon, Menu, X, LogOut, UserCircle2 } from "lucide-react"; // Added LogOut icon

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
				<div className="flex justify-between space-x-4">
					<button
						onClick={() => setShowLogoutConfirm(false)}
						className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-800"
					>
						Cancel
					</button>
					<button
						onClick={handleLogoutConfirm}
						className="px-4 py-2 text-sm font-medium bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 flex items-center space-x-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-800"
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
		<nav className="bg-white/80 dark:bg-gray-900/80 shadow-sm sticky top-0 z-50 border-b border-gray-200 dark:border-blue-700/50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center h-16">
					{/* Logo and Brand */}

					<a
						href="/"
						className="flex items-center space-x-2 flex-shrink-0"
					>
						{/* You can add a logo image here */}
						<svg
							className="h-8 w-8 text-blue-600 dark:text-blue-400"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
						</svg>
						<h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400 tracking-tight">
							Taskify
						</h1>
					</a>

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
						<div className="hidden sm:flex items-center gap-4">
							{/* User Info Glass Card */}
							<div
								className="flex items-center gap-3 px-4 py-2 rounded-2xl 
                 backdrop-blur-md bg-black/50 dark:bg-gray-500/30 
                 border border-black dark:border-gray-300/40 
                 shadow-sm"
							>
								<span className="text-sm font-medium text-white dark:text-gray-200">
									Welcome,{" "}
									<span className="font-semibold">
										{user.name}
									</span>
								</span>
							</div>

							{/* Theme Toggle Button */}
							<button
								onClick={toggleTheme}
								className="p-2 rounded-xl backdrop-blur-md bg-white/30 dark:bg-gray-800/30
                 border border-black dark:border-gray-700/40 
                 text-gray-700 dark:text-gray-200 
                 hover:bg-white/40 dark:hover:bg-gray-700/50 
                 transition-all duration-200 shadow-sm"
								aria-label="Toggle theme"
							>
								{isDarkMode ? (
									<Sun className="w-5 h-5" />
								) : (
									<Moon className="w-5 h-5" />
								)}
							</button>

							{/* Logout */}
							<LogoutButton />
						</div>
					)}
				</div>
			</div>

			{/* Mobile dropdown menu */}
			{isMenuOpen && user?.email && (
				<div className=" flex justify-between items-center sm:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-4  px-4">
					<div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700">
						<span className="text-sm font-medium text-gray-700 dark:text-gray-300">
							{user.name}
						</span>
					</div>

					<div className="flex items-center justify-center gap-2">
						<button
							onClick={toggleTheme}
							className="flex items-center justify-center p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 
                                 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
							aria-label="Toggle theme"
						>
							{isDarkMode ? (
								<Sun className="w-5 h-5 rounded-full" />
							) : (
								<Moon className="w-5 h-5 rounded-full" />
							)}
						</button>
						<LogoutButton />
					</div>
				</div>
			)}

			{/* Show logout confirmation modal */}
			{showLogoutConfirm && <LogoutConfirmation />}
		</nav>
	);
};

export default Navigation;
