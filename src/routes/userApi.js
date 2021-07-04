const express = require ('express');
const router = express.Router();

const UserController = require('../app/controllers/UserFull');

const auth = require('../middlewares/auth')

router.get('/user',UserController.getUserInfor);
router.get('/:id',UserController.show);
router.post('/register',UserController.register);
router.post('/activation',UserController.activateEmail);
router.post('/login',UserController.login);

module.exports = router;