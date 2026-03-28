const express = require('express');
const router = express.Router();
const publicController = require('../controllers/publicController');

router.get('/instructors', publicController.getInstructors);
router.get('/instructors/:id', publicController.getInstructorById);

router.get('/courses', publicController.getCourses);
router.get('/courses/:id', publicController.getCourseById);

module.exports = router;
