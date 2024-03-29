const Courses = require ('../models/Courses');
const Users = require ('../models/User');
const {mutipleMongooseToObject} = require ('../../util/mongoose');
const Post = require('../models/Post');

class MeController {
  //[GET],/courses/:slug
  storedCourses (req, res,next) {
    Courses.find({}).then((courses)=>  res.render('me/stored-courses',{
      courses: mutipleMongooseToObject(courses)
    }))
    .catch(next);
 
  }
 
  userApp (req, res,next) {
    Users.find({}).then((users)=>  res.render('me/stored-user',{
      users: mutipleMongooseToObject(users)
    }))
    .catch(next);
 
  }
  postApp (req, res,next) {
    Post.find({}).then((posts)=>  res.render('me/stored-post',{
      posts: mutipleMongooseToObject(posts)
    }))
    .catch(next);
  }
  mp3App(req, res, next) {
    res.render('mp3/music.hbs')
  }
}

module.exports = new MeController ();

//export thu gi thi nhan duoc thu do
// const newController = require('./NewsController')
