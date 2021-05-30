const Courses = require ('../models/Courses');
const {mongooseToObject} = require ('../../util/mongoose');

class CoursesController {
  //[GET],/courses/:slug
  show (req, res) {
    Courses.findOne ({slug: req.params.slug})
      .then (course => {
        res.render ('courses/show', {course: mongooseToObject (course)});
      })
      .catch (err => next (err));
  }
  //[GET],/courses/create
  create (req, res) {
    res.render ('courses/create');
  }
  //[POST],/courses/store
  store (req, res) {
    const data = req.body;
    data.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`;
    const course = new Courses (data);
    course.save ().then (() => res.redirect ('/')).catch (err => {
      console.log ('ERR', err);
    });
  }
   //[GET],/courses/update
  update (req, res) {
    res.render ('courses/update');
  }
}

module.exports = new CoursesController ();

//export thu gi thi nhan duoc thu do
// const newController = require('./NewsController')
