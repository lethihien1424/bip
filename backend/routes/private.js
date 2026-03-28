const express = require('express');
const router = express.Router();
const privateController = require('../controllers/privateController');
const { verifyToken, isAdmin } = require('../middlewares/auth');

// All private routes require authentication and Admin role
router.use(verifyToken, isAdmin);

// --- Instructors ---
router.get('/instructors', privateController.getAllInstructors);
router.post('/instructors', privateController.createInstructor);
router.put('/instructors/:id', privateController.updateInstructor);
router.patch('/instructors/:id/toggle-active', privateController.toggleActiveInstructor);

// --- Courses ---
router.get('/courses', privateController.getAllCourses);
router.post('/courses', privateController.createCourse);
router.put('/courses/:id', privateController.updateCourse);
router.delete('/courses/:id', privateController.softDeleteCourse);

module.exports = router;
