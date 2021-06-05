const express = require ('express');
const router = express.Router();

const userController = require('../app/controllers/UserController');

// newController.index;

router.post('/login',userController.loginStore);
router.post('/register',userController.register);
router.get('/dangnhap',userController.login);
router.get('/',userController.dangky);
router.delete('/:id',userController.delete);


module.exports = router;