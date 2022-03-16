const express = require ('express');
const router = express.Router();

const userController = require('../app/controllers/UserFull');
const userController2 = require('../app/controllers/UserController');

// newController.index;

router.post('/login',userController.login);
router.post('/register',userController.register);
router.get('/logup',userController2.dangky);
router.get('/',userController2.login);
router.delete('/:id',userController2.delete);


module.exports = router;