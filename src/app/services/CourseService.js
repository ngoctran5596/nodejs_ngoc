const express=require('express');

const router=express.Router();

const courseApi = require('../controllers/api/CourseApi.js')

//get All Course Api
router.get("/allCourses",courseApi.getAll);
// router.insert("/create",courseApi.insert);

module.exports=router; //exporst qua index.js để su dung
