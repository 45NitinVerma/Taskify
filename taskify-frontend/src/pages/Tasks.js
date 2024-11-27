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
import { XMarkIcon, PlusIcon } from '@heroicons/react/24/outline';  // Fix the import


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
  }, [navigate]);

  const handleCreateTask = async (taskData) => {
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
        const response = await axiosInstance.put(`/tasks/${taskId}`, updatedData);
        setTasks(prevTasks => 
            prevTasks.map(task => 
                task._id === taskId ? response.data : task
            )
        );
    } catch (err) {
        setError(err.message);
        if (err.response?.status === 401) {
            localStorage.removeItem('token');
            navigate('/login');
        }
    }
};


  const handleDeleteTask = async (taskId) => {
    try {
        await axiosInstance.delete(`/tasks/${taskId}`);
        setTasks(tasks.filter(task => task._id !== taskId));
    } catch (err) {
        setError(err.message);
        if (err.response?.status === 401) {
            localStorage.removeItem('token');
            navigate('/login');
        }
        // Refresh tasks from server in case of error
        fetchTasks();
    }
};


  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({ ...prev, [filterType]: value }));
  };

  const filteredTasks = tasks
    .filter((task) => !filters.status || task.status === filters.status)
    .filter((task) => !filters.priority || task.priority === filters.priority)
    .sort((a, b) => {
      switch (filters.sort) {
        case "oldest":
          return new Date(a.createdAt) - new Date(b.createdAt);
        case "dueDate":
          return new Date(a.dueDate) - new Date(b.dueDate);
        default: // newest
          return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorAlert message={error} />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pb-6 border-b dark:border-gray-700">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Your Tasks
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage and organize your tasks efficiently
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="inline-flex items-center px-4 py-2 bg-blue-600 dark:bg-blue-500 
                     text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 
                     transition-colors duration-200 ease-in-out shadow-sm"
        >{showAddForm ? (
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
        </button>
      </div>

      {/* Task Form */}
      {showAddForm && (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg 
                        border border-gray-200 dark:border-gray-700 transition-all duration-200">
          <TaskForm
            onSubmit={async (taskData) => {
              await handleCreateTask(taskData);
              setShowAddForm(false);
            }}
          />
        </div>
      )}

      {/* Filters Section */}
      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
        <TaskFilters filters={filters} onFilterChange={handleFilterChange} />
      </div>

      {/* Error Alert */}
      {error && (
        <div className="my-4">
          <ErrorAlert message={error} />
        </div>
      )}

      {/* Loading State */}
      {isLoading ? (
        <div className="flex justify-center py-12">
          <LoadingSpinner />
        </div>
      ) : filteredTasks.length === 0 ? (
        <div className="mt-8">
          <EmptyState />
        </div>
      ) : (
        <div className="mt-6">
          <TaskList
            tasks={filteredTasks}
            onUpdateTask={handleUpdateTask}
            onDeleteTask={handleDeleteTask}
          />
        </div>
      )}
    </div>
  );
};


export default Tasks;
