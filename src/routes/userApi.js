const express = require ('express');
const router = express.Router();

const UserController = require('../app/controllers/UserFull');

const auth = require('../middlewares/auth')

router.get('/user',UserController.getUserInfo);
router.get('/:id',UserController.show);
router.get('/info/v3',auth,UserController.getUserInfo);
router.get('/all/user',UserController.getUsersAllInfor);
router.get('/reset/resetWeb/:id', UserController.resetWeb)
router.post('/register',UserController.register);
router.post('/activation',UserController.activateEmail);
router.post('/login',UserController.login);
router.post('/refresh_token', UserController.getAccessToken)
router.post('/forgot', UserController.forgotPassword)
router.post('/reset', auth, UserController.resetPassword)

module.exports = router;