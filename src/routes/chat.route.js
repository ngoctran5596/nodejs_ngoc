const express = require('express');
const router = express.Router();
const controller = require('../app/controllers/chat.controller');
const middleware = require('../middlewares/auth');


router.get('/',middleware, controller.index);
router.delete('/delete-all',middleware, controller.deleteAll);

module.exports = router;