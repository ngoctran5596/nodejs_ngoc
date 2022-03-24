const express = require ('express');
const router = express.Router();

const courseController = require('../app/controllers/CoursesController');
const courseLearningController = require('../app/controllers/CourseTypeLearningController');

// newController.index;
router.get('/create',courseController.create);
router.get('/',courseLearningController.show);
router.post('/store',courseController.store);
router.post('/created',courseLearningController.store);
router.get('/:id/edit',courseController.edit);
router.put('/:id',courseController.update);
router.delete('/:id',courseController.delete);
router.get('/:slug',courseController.show);

module.exports = router;