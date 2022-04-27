const express = require('express');
const router = express.Router();
const courseController = require('../app/controllers/codeZ/CoursesCodeZ');
const videoController = require('../app/controllers/Video.controller');
const authMiddleware = require('../middlewares/auth');

// newController.index;
router.get('/',courseController.show);
router.post('/create',authMiddleware,courseController.create);
router.post('/iscomplete',authMiddleware,videoController.is_complete_ById);
router.post('/addstudent',authMiddleware,courseController.addstudent);

module.exports = router;