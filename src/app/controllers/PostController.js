const Courses = require ('../models/Courses');
const Post = require ('../models/Post');
const {mutipleMongooseToObject} = require ('../../util/mongoose');

class PostController {
  //[POST],/post/
  async create (req, res, next) {
    const {title, description, image, videoId} = req.body;
    console.log(req.userId);

    if (!title)
      return res
        .status (400)
        .json ({success: false, message: 'title để trống'});

    try {
      const newPost = new Post ({
        title,
        description,
        image,
        videoId,
        userId: req.userId,
      });
      await newPost.save ();
      res.json ({success: true, message: 'Happy learning'});
    } catch (error) {
      res.json ({error: error});
    }
  }
  //[GET],/post/

  async getById (req, res,next) {
      console.log('req.userId',req.userId)
      try {
        const post = await Post.find({userId:req.userId}).populate('user');
        res.json({success:true,post})
      } catch (error) {
          res.json({error:error})
      }
 
  }
  async getAll (req, res,next) {
    console.log('req.userId',req.userId)
    try {
      const post = await Post.find({userId:req.userId}).populate('user');
      res.json({success:true,post})
    } catch (error) {
        res.json({error:error})
    }

}
}

module.exports = new PostController ();

//export thu gi thi nhan duoc thu do
// const newController = require('./NewsController')
