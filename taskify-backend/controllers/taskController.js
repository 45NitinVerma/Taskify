// controllers/taskController.js
const Task = require('../models/Task');

// Get all tasks for a user
exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user.id });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// Update the createTask function
exports.createTask = async (req, res) => {
    try {
        const { title, description, status, priority, dueDate, isChecklist, checklistItems } = req.body;

        const task = await Task.create({
            title,
            description,
            status,
            priority,
            dueDate,
            isChecklist,
            checklistItems,
            user: req.user.id
        });

        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// Update the updateTask function
exports.updateTask = async (req, res) => {
    try {
        let task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        // Make sure user owns task
        if (task.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        task = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        res.json(task);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// Delete task
exports.deleteTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        // Make sure user owns task
        if (task.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        // Replace task.remove() with Task.deleteOne()
        await Task.deleteOne({ _id: req.params.id });

        res.json({ message: 'Task removed' });
    } catch (error) {
        console.error('Delete task error:', error); // Add this for debugging
        res.status(500).json({ message: 'Server Error' });
    }
};
