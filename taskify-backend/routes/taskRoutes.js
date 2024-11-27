// routes/taskRoutes.js
const express = require('express');
const router = express.Router();
const { 
    getTasks, 
    createTask, 
    updateTask, 
    deleteTask 
} = require('../controllers/taskController');

// Middleware to protect routes
const protect = require('../middleware/authMiddleware');

router.use(protect);  // Protect all routes

router.route('/')
    .get(getTasks)
    .post(createTask);

router.route('/:id')
    .put(updateTask)
    .delete(deleteTask);

module.exports = router;