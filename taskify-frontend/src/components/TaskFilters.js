// src/components/TaskFilters.js
import React from "react";
import { Filter, Flag, SortDesc } from "lucide-react";
import { motion } from "framer-motion";

const TaskFilters = ({ filters, onFilterChange }) => {
  const filterOptions = [
    {
      id: "status",
      label: "Status",
      icon: <Filter className="w-4 h-4 text-blue-500" />,
      options: [
        { value: "", label: "All Status" },
        { value: "todo", label: "Todo" },
        { value: "in-progress", label: "In Progress" },
        { value: "completed", label: "Completed" },
      ],
    },
    {
      id: "priority",
      label: "Priority",
      icon: <Flag className="w-4 h-4 text-yellow-500" />,
      options: [
        { value: "", label: "All Priorities" },
        { value: "low", label: "Low" },
        { value: "medium", label: "Medium" },
        { value: "high", label: "High" },
      ],
    },
    {
      id: "sort",
      label: "Sort By",
      icon: <SortDesc className="w-4 h-4 text-purple-500" />,
      options: [
        { value: "newest", label: "Newest First" },
        { value: "oldest", label: "Oldest First" },
        { value: "dueDate", label: "Due Date" },
      ],
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mb-6 grid grid-cols-1 sm:grid-cols-3 gap-4"
    >
      {filterOptions.map(({ id, icon, options, label }) => (
        <div
          key={id}
          className="relative flex items-center bg-white dark:bg-gray-800 border 
                     border-gray-200 dark:border-gray-700 rounded-xl shadow-sm
                     hover:shadow-md transition-all duration-200"
        >
          <div className="flex items-center pl-3 pointer-events-none">{icon}</div>
          <select
            value={filters[id]}
            onChange={(e) => onFilterChange(id, e.target.value)}
            className="block w-full py-2.5 px-3 rounded-xl bg-transparent 
                       text-gray-900 dark:text-gray-100 focus:outline-none 
                       cursor-pointer appearance-none text-sm 
                       focus:ring-2 focus:ring-blue-500 transition"
          >
            {options.map((opt) => (
              <option
                key={opt.value}
                value={opt.value}
                className="text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-700"
              >
                {opt.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
            <svg
              className="h-4 w-4 text-gray-400 dark:text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      ))}
    </motion.div>
  );
};

export default TaskFilters;
