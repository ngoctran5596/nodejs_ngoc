const Note = require ('../models/Note');
const {mutipleMongooseToObject} = require ('../../util/mongoose');

class NoteController {
  // description: { type: String },
  // userId: { type:String },
  // idYoutube: { type: String},
  //[POST],/post/
  async createNote (req, res, next) {
    const {description, userId, idYoutube,nameClass} = req.body;

    const payload = new Note ({description, userId, idYoutube,nameClass});
    payload
      .save ()
      .then (() => res.json ({success: true, message: 'Thành công'}))
      .catch (() => res.json ({success: false, message: 'Thất bại'}));
  }
  //[GET],/post/

  async getByIdNote (req, res, next) {
    try {
      const note = await Note.find ({userId:req.params.id});
      res.json (note);
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

module.exports = new NoteController ();

//export thu gi thi nhan duoc thu do
// const newController = require('./NewsController')
