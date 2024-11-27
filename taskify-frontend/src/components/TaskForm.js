// src/components/TaskForm.js
import React, { useState } from 'react';

const TaskForm = ({ onSubmit, initialData = null }) => {
    const [task, setTask] = useState({
        title: initialData?.title || '',
        description: initialData?.description || '',
        status: initialData?.status || 'todo',
        priority: initialData?.priority || 'medium',
        dueDate: initialData?.dueDate ? new Date(initialData.dueDate).toISOString().split('T')[0] : '',
        listItems: initialData?.listItems || []
    });

    const handleRemoveListItem = (index) => {
        const newListItems = task.listItems.filter((_, i) => i !== index);
        setTask({ ...task, listItems: newListItems });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(task);
        if (!initialData) {
            setTask({
                title: '',
                description: '',
                status: 'todo',
                priority: 'medium',
                dueDate: '',
                listItems: []
            });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block mb-1 text-gray-900 dark:text-gray-100">Title</label>
                <input
                    type="text"
                    value={task.title}
                    onChange={(e) => setTask({...task, title: e.target.value})}
                    className="w-full p-2 border dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    required
                />
            </div>
            <div>
                <label className="block mb-1 text-gray-900 dark:text-gray-100">Description</label>
                <textarea
                    value={task.description}
                    onChange={(e) => setTask({...task, description: e.target.value})}
                    className="w-full p-2 border dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    rows="3"
                />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block mb-1 text-gray-900 dark:text-gray-100">Status</label>
                    <select
                        value={task.status}
                        onChange={(e) => setTask({...task, status: e.target.value})}
                        className="w-full p-2 border dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                        <option value="todo">To Do</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>
                <div>
                    <label className="block mb-1 text-gray-900 dark:text-gray-100">Priority</label>
                    <select
                        value={task.priority}
                        onChange={(e) => setTask({...task, priority: e.target.value})}
                        className="w-full p-2 border dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>
            </div>
            <div>
                <label className="block mb-1 text-gray-900 dark:text-gray-100">Due Date</label>
                <input
                    type="date"
                    value={task.dueDate}
                    onChange={(e) => setTask({...task, dueDate: e.target.value})}
                    className="w-full p-2 border dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
            </div>
            <button
                type="submit"
                className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 transition-colors duration-200"
            >
                {initialData ? 'Update Task' : 'Add Task'}
            </button>
        </form>
    );
};

export default TaskForm;
