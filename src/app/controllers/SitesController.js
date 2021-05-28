const Courses = require ('../models/Courses');
const {mutipleMongooseToObject,mongooseToObject} = require('../../util/mongoose')

class SitesController {
  //[GET],/news
  home (req, res) {
    Courses.find ({})
      .then (courses => {
        //map qua de bien thang nay thanh object thuong con contructor no khong doc duoc
        res.render ('home', {
          courses:mutipleMongooseToObject(courses)});
      })
      .catch (err => next (err));
  }

  //[GET],/:slug
  search (req, res) {
    res.render ('search');
  }
}

module.exports = new SitesController ();

//export thu gi thi nhan duoc thu do
// const newController = require('./NewsController')
