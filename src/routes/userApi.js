const express = require ('express');
const router = express.Router();

const UserController = require('../app/controllers/UserFull');

const auth = require('../middlewares/auth')

router.get('/user',UserController.getUserInfor);
router.get('/:id',UserController.show);
router.get('/all/Users',UserController.getUsersAllInfor);
router.get('/reset/resetWeb/:id', UserController.resetWeb)
router.post('/register',UserController.register);
router.post('/activation',UserController.activateEmail);
router.post('/login',UserController.login);
router.post('/refresh_token', UserController.getAccessToken)
router.post('/forgot', UserController.forgotPassword)
router.post('/reset', auth, UserController.resetPassword)

module.exports = router;