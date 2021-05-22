const express = require ('express');
const router = express.Router();

const sitesController = require('../app/controllers/SitesController');

// newController.index;
router.use('/search',sitesController.search);
router.use('/',sitesController.home);

module.exports = router;