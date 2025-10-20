// src/pages/Tasks.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import TaskFilters from "../components/TaskFilters";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorAlert from "../components/ErrorAlert";
import EmptyState from "../components/EmptyState";
import axiosInstance from "../api/axiosConfig";
import { XMarkIcon, PlusIcon } from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";
import TaskModal from "../components/TaskModel.js";

const Tasks = () => {
	const navigate = useNavigate();
	const [tasks, setTasks] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);
	const [showAddForm, setShowAddForm] = useState(false);
	const [filters, setFilters] = useState({
		status: "",
		priority: "",
		sort: "newest",
	});

	const fetchTasks = async () => {
		try {
			const response = await axiosInstance.get("/tasks");
			setTasks(response.data);
		} catch (err) {
			setError(err.message);
			if (err.response?.status === 401) {
				localStorage.removeItem("token");
				navigate("/login");
			}
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchTasks();
	}, []);

	const handleCreateTask = async (taskData) => {
    setError(null)
		try {
			const response = await axiosInstance.post("/tasks", taskData);
			setTasks((prevTasks) => [...prevTasks, response.data]);
		} catch (err) {
			setError(err.message);
			if (err.response?.status === 401) {
				localStorage.removeItem("token");
				navigate("/login");
			}
		}
	};

	const handleUpdateTask = async (taskId, updatedData) => {
		try {
			const response = await axiosInstance.put(
				`/tasks/${taskId}`,
				updatedData
			);
			setTasks((prev) =>
				prev.map((t) => (t._id === taskId ? response.data : t))
			);
		} catch (err) {
			setError(err.message);
			if (err.response?.status === 401) {
				localStorage.removeItem("token");
				navigate("/login");
			}
		}
	};

	const handleDeleteTask = async (taskId) => {
		try {
			await axiosInstance.delete(`/tasks/${taskId}`);
			setTasks((prev) => prev.filter((t) => t._id !== taskId));
		} catch (err) {
			setError(err.message);
			if (err.response?.status === 401) {
				localStorage.removeItem("token");
				navigate("/login");
			}
			fetchTasks(); // fallback refresh
		}
	};

	const handleFilterChange = (type, value) =>
		setFilters((prev) => ({ ...prev, [type]: value }));

	const filteredTasks = tasks
		.filter((t) => !filters.status || t.status === filters.status)
		.filter((t) => !filters.priority || t.priority === filters.priority)
		.sort((a, b) => {
			switch (filters.sort) {
				case "oldest":
					return new Date(a.createdAt) - new Date(b.createdAt);
				case "dueDate":
					return new Date(a.dueDate) - new Date(b.dueDate);
				default:
					return new Date(b.createdAt) - new Date(a.createdAt);
			}
		});

	const [selectedTask, setSelectedTask] = useState(null);
	const [isEditing, setIsEditing] = useState(false);

	const handleViewTask = (task) => {
		setSelectedTask(task);
		setIsEditing(false);
	};

	const handleUpdateModalTask = async (
		taskId,
		updatedData,
		editMode = false
	) => {
		if (editMode) {
			setIsEditing(true);
			return;
		}
		await handleUpdateTask(taskId, updatedData);
		setSelectedTask(null);
		setIsEditing(false);
	};

	if (isLoading) return <LoadingSpinner />;
	if (error) return <ErrorAlert message={error} />;

	return (
		<motion.div
			className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.4 }}
		>
			{/* Header Section */}
			<div className="flex flex-col sm:flex-row justify-between items-center gap-4 pb-6 border-b dark:border-gray-700">
				<div>
					<h1 className="text-3xl font-bold text-gray-900 dark:text-white">
						Your Tasks
					</h1>
					<p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
						Stay organized and keep track of your progress
						effortlessly
					</p>
				</div>

				<motion.button
					onClick={() => setShowAddForm(!showAddForm)}
					whileHover={{ scale: 1.03 }}
					whileTap={{ scale: 0.97 }}
					className="inline-flex items-center px-4 py-2 bg-blue-600 dark:bg-blue-500 
                     text-white rounded-xl hover:bg-blue-700 dark:hover:bg-blue-600 
                     shadow-md transition-all duration-200"
				>
					{showAddForm ? (
						<>
							<XMarkIcon className="h-5 w-5 mr-2" />
							Cancel
						</>
					) : (
						<>
							<PlusIcon className="h-5 w-5 mr-2" />
							Add Task
						</>
					)}
				</motion.button>
			</div>

			{/* Add Task Form */}
			<AnimatePresence>
				{showAddForm && (
					<motion.div
						key="add-task-form"
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -10 }}
						transition={{ duration: 0.3 }}
						className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border 
                       border-gray-200 dark:border-gray-700"
					>
						<TaskForm
							onSubmit={async (data) => {
								await handleCreateTask(data);
								setShowAddForm(false);
							}}
						/>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Filters */}
			<motion.div
				className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 
                   rounded-xl p-4 shadow-sm"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.2, duration: 0.3 }}
			>
				<TaskFilters
					filters={filters}
					onFilterChange={handleFilterChange}
				/>
			</motion.div>

			{/* Task Display Area */}
			{filteredTasks.length === 0 ? (
				<EmptyState message="No tasks found. Try adding one!" />
			) : (
				<TaskList
					tasks={filteredTasks}
					onUpdateTask={handleUpdateTask}
					onDeleteTask={handleDeleteTask}
					onViewTask={handleViewTask}
				/>
			)}

			<TaskModal
				task={selectedTask}
				isEditing={isEditing}
				onClose={() => {
					setSelectedTask(null);
					setIsEditing(false);
				}}
				onUpdate={handleUpdateModalTask}
			/>
		</motion.div>
	);
};

export default Tasks;
