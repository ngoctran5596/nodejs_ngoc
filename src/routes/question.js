const express = require('express');
const router = express.Router();
const questionController = require('../app/controllers/QuestionController');

const bodyparser = require('body-parser');
let urlencodeParser = bodyparser.urlencoded({extended:false});

router.get('/', (request, respon) => {
    respon.render('authencations/Login');
});


router.get('/InsertQuestion', (request, respon) => {
    respon.render('question/InsertQuestion');
});
// router.get('/ListQuestion', (request, respon) => {
//     respon.render('ListQuestion');
// });



router.get('/ListQuestion', questionController.getAll);
router.get('/api/allQuestions', questionController.getAll);

router.post('/insertQuestion', urlencodeParser, questionController.insert);
router.post('/updateQuestion', urlencodeParser, questionController.update);
router.post('/deleteQuestion', urlencodeParser, questionController.delete);
module.exports = router;