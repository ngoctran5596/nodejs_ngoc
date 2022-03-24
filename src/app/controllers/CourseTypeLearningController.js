const CourseType = require('../models/CourseLearning/Categories');
const {
  mongooseToObject,
  mutipleMongooseToObject,
} = require('../../util/mongoose');

class CourseTypeController {
  //[GET],/courses/:slug
  show(req, res, next) {
    CourseType.find({})
      .then(courses =>
        res.json(courses)
      )
      .catch(next);
  }
  //[GET],/courses/create
  create(req, res) {
    res.render('courseType/create');
  }
  //[POST],/courseType/store
  store(req, res, next) {
    const data = req.body;
    const thumbnail = `https://img.youtube.com/vi/${data.videoId}/hqdefault.jpg`;
    const dataNew = {
      thumbnail: thumbnail,
      title: data.title
    }
    const courseType = new CourseType(dataNew);
    courseType.save().then(() => res.json({ message: 'Created success' })).catch(next);
  }
  //[GET],/courseType/:id/edit
  edit(req, res, next) {
    CourseType.findById(req.params.id)
      .then(courses => {
        res.render('courseType/edit', {
          courses: mongooseToObject(courses),
        });
      })
      .catch(next);
  }
  //[PUT],/courses/:id
  update(req, res, next) {
    const data = req.body;
    CourseType.updateOne({ _id: req.params.id }, data)
      .then(() => res.redirect('/courseType'))
      .catch(next);
  }
  //[DELETE],/courses/:id
  delete(req, res, next) {
    console.log(' req.params.id', req.params.id)
    CourseType.deleteOne({ _id: req.params.id })
      .then(() => res.redirect('back'))
      .catch(next);
  }
}

module.exports = new CourseTypeController();

//export thu gi thi nhan duoc thu do
// const newController = require('./NewsController')
//GET,POST,PUT,PATCH,DELETE,OPTIONS,HEAD
//GET gửi yêu cầu từ client lên server trả về dữ liệu cho phía client
//POST gửi yêu cầu từ client lên server lưu lại 1,tạo mới một dữ liệu dữ liệu cho phía client
//PUT,PATCH gửi yêu cầu từ client lên server chỉnh sửa một dữ liệu dữ liệu
//PUT CHỉnh sửa hẳn 1 document PATCH thì chỉnh sửa từng fill
