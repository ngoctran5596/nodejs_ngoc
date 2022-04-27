const Courses = require("../../models/CourseLearning/Courses")
const { mongooseToObject } = require("../../../util/mongoose")

class CoursesCodeZController {
  //[GET],/codez
  show(req, res) {
    Courses.find().populate('instructor', 'name email image').populate('videos', {})
      .then((course) => {
        res.json(course)
      })
      .catch((err) => next(err))
  }

  //[POST],/codez/create
  create(req, res) {
    if (req.file) {
      const data = req.body;
      data.instructor = req?.user?.id;
      const thumbnail = process.env.NEWFEED_URL + req.file.filename;
      const course = new Courses({ ...data, thumbnail: thumbnail })
      course
        .save()
        .then((data) => res.json(data))
        .catch((err) => {
          console.log("ERR", err)
        })
    } else {
      res.status(500).json({ message: 'Error file' })
    }
  }


  //[GET],/courses/:id/edit
  edit(req, res, next) {
    Courses.findById(req.params.id)
      .then((courses) => {
        res.render("courses/edit", {
          courses: mongooseToObject(courses),
        })
      })
      .catch(next)
  }
  //[PUT],/codez/addstudent?id=id
  async addstudent(req, res, next) {
    try {
      const courseId = req.query.id;
      const userId = req?.user?.id;
      Courses.findOneAndUpdate(
        { _id: courseId },
        { $push: { students: userId } })
        .then(() => res.json({ message: 'Success' }));
    } catch (error) {
      console.log('Error add Student')
    }



  }
  //[DELETE],/courses/:id
  delete(req, res, next) {
    Courses.deleteOne({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next)
  }


}

module.exports = new CoursesCodeZController()

//export thu gi thi nhan duoc thu do
// const newController = require('./NewsController')
//GET,POST,PUT,PATCH,DELETE,OPTIONS,HEAD
//GET gửi yêu cầu từ client lên server trả về dữ liệu cho phía client
//POST gửi yêu cầu từ client lên server lưu lại 1,tạo mới một dữ liệu dữ liệu cho phía client
//PUT,PATCH gửi yêu cầu từ client lên server chỉnh sửa một dữ liệu dữ liệu
//PUT CHỉnh sửa hẳn 1 document PATCH thì chỉnh sửa từng fill
