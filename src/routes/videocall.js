const express = require ('express');
const router = express.Router();

const VideoCallController = require('../app/controllers/VideoCall');

const auth = require('../middlewares/auth')

router.get ('/rtcToken', VideoCallController.generateRtcToken);
router.get ('/rtmToken',  VideoCallController.generateRtmToken);
module.exports = router;