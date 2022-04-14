var multer = require('multer');
const path = require('path');


var videoStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'src/public/video');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '_' + Date.now()
      + path.extname(file.originalname))
  },
});


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'src/public/imageNewFeed');
  },
  filename: function (req, file, cb) {
    
    cb(null, Date.now() + '-' + file.originalname);
  },
});


const videoUpload = multer({
  storage: videoStorage,
  limits: {
    fileSize: 100000000 // 10000000 Bytes = 10 MB
  },
  fileFilter(req, file, cb) {
    // upload only mp4 and mkv format
    if (!file.originalname.match(/\.(mp4|MPEG-4|mkv)$/)) {
      return cb(new Error('Please upload a video'))
    }
    cb(undefined, true)
  }
})

const upload = multer({ storage: storage });
module.exports = {
  upload,
  videoUpload
}

