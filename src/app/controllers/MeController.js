const Courses = require ('../models/Courses');
const {mutipleMongooseToObject} = require ('../../util/mongoose');

class MeController {
  //[GET],/courses/:slug
  storedCourses (req, res,next) {
    Courses.find({}).then((courses)=>  res.render('me/stored-courses',{
      courses: mutipleMongooseToObject(courses)
    }))
    .catch(next);
 
  }
 
}

module.exports = new MeController ();

//export thu gi thi nhan duoc thu do
// const newController = require('./NewsController')
