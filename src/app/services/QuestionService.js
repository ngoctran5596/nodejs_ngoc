const express=require('express');

const router=express.Router();

const questionApi=require('../controllers/api/QuestionApi.js')


//getAll
router.get("/allQuestion",questionApi.getAll);

module.exports=router; //exporst qua index.js để su dung

