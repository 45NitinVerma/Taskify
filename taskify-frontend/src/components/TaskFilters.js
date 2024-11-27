// src/components/TaskFilters.js
import React from 'react';

const TaskFilters = ({ filters, onFilterChange }) => {
    return (
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="relative">
                <select
                    value={filters.status}
                    onChange={(e) => onFilterChange('status', e.target.value)}
                    className="block w-full p-2.5 rounded-lg border dark:border-gray-600 
                    bg-white dark:bg-gray-700 text-gray-900 dark:text-white 
                    focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                    hover:border-blue-500 dark:hover:border-blue-400
                    appearance-none cursor-pointer transition-colors duration-200"
                >
                    <option value="">All Status</option>
                    <option value="todo">Todo</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                </select>
                <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
                    <svg className="h-4 w-4 text-gray-400 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </div>

            <div className="relative">
                <select
                    value={filters.priority}
                    onChange={(e) => onFilterChange('priority', e.target.value)}
                    className="block w-full p-2.5 rounded-lg border dark:border-gray-600 
                    bg-white dark:bg-gray-700 text-gray-900 dark:text-white 
                    focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                    hover:border-blue-500 dark:hover:border-blue-400
                    appearance-none cursor-pointer transition-colors duration-200"
                >
                    <option value="">All Priorities</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
                <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
                    <svg className="h-4 w-4 text-gray-400 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </div>

            <div className="relative">
                <select
                    value={filters.sort}
                    onChange={(e) => onFilterChange('sort', e.target.value)}
                    className="block w-full p-2.5 rounded-lg border dark:border-gray-600 
                    bg-white dark:bg-gray-700 text-gray-900 dark:text-white 
                    focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                    hover:border-blue-500 dark:hover:border-blue-400
                    appearance-none cursor-pointer transition-colors duration-200"
                >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="dueDate">Due Date</option>
                </select>
                <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
                    <svg className="h-4 w-4 text-gray-400 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default TaskFilters;
