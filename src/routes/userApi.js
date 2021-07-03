const express = require ('express');
const router = express.Router();

const UserController = require('../app/controllers/UserFull');

const auth = require('../middlewares/auth')

router.post('/register',UserController.register);
router.post('/activation',UserController.activateEmail);
router.get('/:id',UserController.show);
router.post('/login',UserController.login);

module.exports = router;