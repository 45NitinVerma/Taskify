import React, { useState } from "react";

const TaskItem = ({ task, onDelete, onView }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (e) => {
    e.stopPropagation();
    setIsDeleting(true);
    await onDelete(task._id);
    // No need to set back to false, since task will unmount after deletion
  };

  const priorityColors = {
    low: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    medium:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    high: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  };

  const statusColors = {
    todo: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200",
    "in-progress":
      "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    completed:
      "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  };

  return (
    <div
      onClick={() => !isDeleting && onView(task)}
      className={`cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-all rounded-lg p-4 ${
        isDeleting ? "opacity-50 pointer-events-none" : ""
      }`}
    >
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {task.title}
          </h3>
        </div>

        {isDeleting ? (
          <span className="text-sm text-gray-500 dark:text-gray-400 animate-pulse">
            Deleting...
          </span>
        ) : (
          <button
            onClick={handleDelete}
            className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 text-sm"
          >
            Delete
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-2 text-sm">
        <span className={`px-3 py-1 rounded-full ${statusColors[task.status]}`}>
          {task.status}
        </span>
        <span
          className={`px-3 py-1 rounded-full ${priorityColors[task.priority]}`}
        >
          {task.priority}
        </span>
        {task.dueDate && (
          <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300">
            Due: {new Date(task.dueDate).toLocaleDateString()}
          </span>
        )}
      </div>
    </div>
  );
};

export default TaskItem;
