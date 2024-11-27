// src/components/TaskList.js
import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, onUpdateTask, onDeleteTask }) => {
    const groupedTasks = {
        todo: tasks.filter(task => task.status === 'todo'),
        'in-progress': tasks.filter(task => task.status === 'in-progress'),
        completed: tasks.filter(task => task.status === 'completed')
    };

    const statusColors = {
        'todo': 'border-yellow-400 dark:border-yellow-600',
        'in-progress': 'border-blue-400 dark:border-blue-600',
        'completed': 'border-green-400 dark:border-green-600'
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(groupedTasks).map(([status, taskList]) => (
                <div 
                    key={status} 
                    className={`bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm 
                    border-t-4 ${statusColors[status]} transition-all duration-200
                    hover:shadow-md`}
                >
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white capitalize">
                            {status.replace('-', ' ')}
                        </h2>
                        <span className="px-3 py-1 text-sm font-medium rounded-full 
                            bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                            {taskList.length}
                        </span>
                    </div>
                    
                    <div className="space-y-4">
                        {taskList.length === 0 ? (
                            <p className="text-center py-4 text-gray-500 dark:text-gray-400 text-sm">
                                No tasks yet
                            </p>
                        ) : (
                            taskList.map(task => (
                                <TaskItem
                                    key={task._id}
                                    task={task}
                                    onUpdate={onUpdateTask}
                                    onDelete={onDeleteTask}
                                />
                            ))
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TaskList;
