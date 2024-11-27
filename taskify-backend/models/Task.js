// models/Task.js (backend)
const mongoose = require('mongoose');

const checklistItemSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    isCompleted: {
        type: Boolean,
        default: false
    }
});

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a title']
    },
    description: {
        type: String
    },
    listItems: [{
        text: {
            type: String,
            required: true
        },
        completed: {
            type: Boolean,
            default: false
        }
    }],
    status: {
        type: String,
        enum: ['todo', 'in-progress', 'completed'],
        default: 'todo'
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium'
    },
    dueDate: {
        type: Date
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Task', taskSchema);