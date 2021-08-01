const express = require ('express');
const router = express.Router();
const postController = require('../app/controllers/PostController');

 

 
// app.post('/profile', upload.single('avatar'), function (req, res, next) {
//   console.log(req.file,req.body)
//   // req.file is the `avatar` file
//   // req.body will hold the text fields, if there were any
// })


const auth = require('../middlewares/auth')

// newController.index;

// router.get('/',postController.create);s

router.get('/admin',postController.adminCreate);
router.get('/storeId',auth,postController.getById);
router.put('/:id',auth,postController.update);
// router.delete('/admin/:id',postController.adminDelete);
router.delete('/:id',auth,postController.delete);


module.exports = router;