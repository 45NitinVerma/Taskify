// src/components/TaskItem.js
import React, { useState } from "react";
import TaskForm from "./TaskForm";

const TaskItem = ({ task, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

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

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      setIsDeleting(true);
      try {
        await onDelete(task._id);
      } catch (error) {
        console.error("Error deleting task:", error);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div
      className="border dark:border-gray-700 rounded-lg p-4 mb-4 shadow-sm bg-white dark:bg-gray-800 
            hover:shadow-md transition-all duration-200"
    >
      {isEditing ? (
        <div>
          <TaskForm
            initialData={task}
            onSubmit={(updatedTask) => {
              onUpdate(task._id, updatedTask);
              setIsEditing(false);
            }}
          />
          <button
            onClick={handleCancel}
            className="w-full mt-2 bg-gray-500 text-white p-2 rounded-lg 
                            hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-700
                            transition-colors duration-200"
          >
            Cancel
          </button>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-start mb-3">
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">
                {task.title}
              </h3>
              <p
                className="text-sm text-gray-600 dark:text-gray-400 font-normal 
            leading-relaxed border-l-4 border-gray-200 dark:border-gray-700 
            pl-3 ml-1"
              >
                {/* {task.description} */}
              </p>
            </div>
            <div className="flex space-x-3 ml-4">
              <button
                onClick={() => setIsEditing(true)}
                className="text-blue-500 hover:text-blue-600 dark:text-blue-400 
                dark:hover:text-blue-300 transition-colors duration-200
                px-2 py-1 rounded hover:bg-blue-50 dark:hover:bg-blue-900/30"
                disabled={isDeleting}
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="text-red-500 hover:text-red-600 dark:text-red-400 
                dark:hover:text-red-300 transition-colors duration-200
                px-2 py-1 rounded hover:bg-red-50 dark:hover:bg-red-900/30"
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                statusColors[task.status]
              }`}
            >
              {task.status.replace("-", " ")}
            </span>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                priorityColors[task.priority]
              }`}
            >
              {task.priority}
            </span>
            {task.dueDate && (
              <span
                className="px-3 py-1 rounded-full text-sm font-medium 
                                bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
              >
                Due: {new Date(task.dueDate).toLocaleDateString()}
              </span>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default TaskItem;
