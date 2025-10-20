// src/components/TaskList.js
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ClipboardList, Loader2, CheckCircle2 } from "lucide-react";
import TaskItem from "./TaskItem";

const TaskList = ({ tasks, onUpdateTask, onDeleteTask, onViewTask }) => {
  const groupedTasks = {
    todo: tasks.filter((task) => task.status === "todo"),
    "in-progress": tasks.filter((task) => task.status === "in-progress"),
    completed: tasks.filter((task) => task.status === "completed"),
  };

  const statusConfig = {
    todo: {
      label: "To Do",
      color: "border-yellow-400 dark:border-yellow-600",
      icon: <ClipboardList className="w-5 h-5 text-yellow-500" />,
    },
    "in-progress": {
      label: "In Progress",
      color: "border-blue-400 dark:border-blue-600",
      icon: <Loader2 className="w-5 h-5 text-blue-500 animate-spin-slow" />,
    },
    completed: {
      label: "Completed",
      color: "border-green-400 dark:border-green-600",
      icon: <CheckCircle2 className="w-5 h-5 text-green-500" />,
    },
  };

  return (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {Object.entries(groupedTasks)
      .filter(([_, taskList]) => taskList.length > 0) // ✅ Hide empty groups
      .map(([status, taskList]) => {
        const { label, color, icon } = statusConfig[status];

        return (
          <motion.div
            key={status}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg border-t-4 ${color} 
                        hover:shadow-xl transition-all duration-300 flex flex-col`}
          >
            {/* Column Header */}
            <div className="flex items-center p-2 justify-between border-b border-gray-100 dark:border-gray-700 pb-4 mb-4">
              <div className="flex items-center gap-2">
                {icon}
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 capitalize">
                  {label}
                </h2>
              </div>
              <span className="px-3 py-1 text-xs font-medium rounded-full 
                               bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                {taskList.length}
              </span>
            </div>

            {/* Task List */}
            <div className="flex-1 space-y-4 min-h-[120px]">
              <AnimatePresence>
                {taskList.map((task) => (
                  <motion.div
                    key={task._id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                  >
                    <TaskItem
                      task={task}
                      onUpdate={onUpdateTask}
                      onDelete={onDeleteTask}
                      onView={onViewTask}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        );
      })}

    {/* ✅ Fallback if no groups have tasks */}
    {Object.values(groupedTasks).every((list) => list.length === 0) && (
      <div className="col-span-3 text-center py-12 text-gray-500 dark:text-gray-400 text-sm">
        No tasks found for this filter.
      </div>
    )}
  </div>
);

};

export default TaskList;
