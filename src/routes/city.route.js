const express = require ('express');
const CityController = require('../app/controllers/CityController');
const router = express.Router();

// newController.index;
router.get('/',CityController.show);
router.post('/create',CityController.create);

module.exports = router;