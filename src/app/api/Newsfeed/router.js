const express = require ('express');
const router = express.Router ();
const controller = require ('./controller');

var multer  = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/upload')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now()  + "-" + file.originalname)
    }
});  
var upload = multer({ 
    storage: storage,
    fileFilter: function (req, file, cb) {
        console.log(file);
        if(file.mimetype=="image/bmp" || file.mimetype=="image/png"){
            cb(null, true)
        }else{
            return cb(new Error('Only image are allowed!'))
        }
    }
})

router
  .get ('/', controller.getAllPost)
  .get ('/:id', controller.getById)
  .post ('/:id', controller.addComment)
  .post ('/like/:id', controller.like)
  .post ('/create/created',upload.single('image'), controller.createPost);
module.exports = router; //exporst qua index.js để su dung
