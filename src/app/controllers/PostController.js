const Post = require ('../models/Post');
const {mutipleMongooseToObject} = require ('../../util/mongoose');
const {json} = require ('express');

class PostController {
  //[POST],/post/
  async create (req, res, next) {
    console.log("req.bodyreq.bodyreq.bodyreq.bodyreq.bodyreq.body",req.body);
    console.log("req.bodyreq.bodyreq.bodyreq.bodyreq.bodyreq.body",req.file);
    // console.log("req.file.file.file.file.file.body",req);
      const {description,userId,typeClassId} = req.body;

      if(req.file){
        const image =process.env.NEWFEED_URL+ req.file.filename;
        const postNew =  new Post({
          description,
          userId,
          typeClassId,
          image
        });
        postNew.save()
        .then((data) => res.json(data))
        .catch((err) => {
          res.json(err);
        })
      }else{
        const postNew =  new Post({
          description,
          userId,
          typeClassId
        });
        postNew.save()
        .then((data) => res.json(data)) 
        .catch((err) => {
          res.json(err);
        })                                                                                                             
      }
      
  }
  //[GET],/post/

    
  async postes (req, res, next) {
    console.log ('req.userId', req);
    res.render('mp3/music.hbs',{
      
    })
   
  }

  async getById (req, res, next) {
    console.log ('req.userId', req.userId);
    try {
      const post = await Post.find ({userId: req.userId}).populate ('userId');
      res.json ({success: true, post});
    } catch (error) {
      res.json ({error: error});
    }
  }

    //[GET],/post/

    async getAll (req, res, next) {
      try {
        const post = await Post.find ();
        res.json ({success: true, post});
      } catch (error) {
        res.json ({error: error});
      }
    }
  //[PUT],/:id

  async update (req, res, next) {
    const {title, description, image} = req.body;

    console.log (req.userId);
    if (!title)
      return res
        .status (400)
        .json ({success: false, message: 'title để trống'});

    try {
      const newPost = {
        title,
        description,
        image,
      };
      const postUpdateCondition = {_id: req.params.id, userId: req.userId};
      const updateNew = await Post.findOneAndUpdate (
        postUpdateCondition,
        newPost,
        {new: true}
      );
      if (!updateNew)
        return res.json ({success: false, message: 'Update fail'});
      res.json ({success: true, updateNew});
    } catch (error) {
      res.json ({error: error});
    }
  }

  //[DELETE],/:id
  async delete (req, res) {
    try {
      const postDeleteCondition = {_id: req.params.id, userId: req.userId};
      const deleteOne = await Post.findOneAndDelete (postDeleteCondition);
      if (!deleteOne)
        return res.json ({success: false, message: 'delete Fail'});
      res.json ({success: true, message: 'delete thanh cong'});
    } catch (error) {
      res.json ({message: error});
    }
  }
  async adminCreate (req, res) {
    try {
      res.render ('posts/create');
    } catch (error) {
      res.json ({message: error});
    }
  }
}

module.exports = new PostController ();

//export thu gi thi nhan duoc thu do
// const newController = require('./NewsController')
