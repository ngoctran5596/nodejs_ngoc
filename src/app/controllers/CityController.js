const City = require('../models/City');
// const Courses = require("../models/Courses")
const { mongooseToObject } = require("../../util/mongoose")

class CityController {
  //[GET],/courses/:slug

  //all city
  show(req, res) {
    let perPage = 10; // số lượng sản phẩm xuất hiện trên 1 page
    let page = req.query._page || 1;

    City
      .find() // find tất cả các data
      .skip((perPage * page) - perPage) // Trong page đầu tiên sẽ bỏ qua giá trị là 0
      .limit(perPage)
      .exec((err, city) => {
        City.countDocuments((err, count) => { // đếm để tính có bao nhiêu trang
          if (err) return next(err);
          const pagination = {
            data:city, // sản phẩm trên một page
            pagination:{
              _page: page, // page hiện tại
              _limit:city.length,
              _totalPages: Math.ceil(count / perPage) // tổng số các page
            }
          }
          res.send(pagination) // Trả về dữ liệu các sản phẩm theo định dạng như JSON, XML,...
        });
      });


  }
  // //[GET],/courses/create
  // create(req, res) {
  //   res.render("courses/create")
  // }
  //[POST],/courses/store
  create(req, res, next) {
    const data = req.body
    console.log("reqqqqqqqqqq", req)
    for (let i = 0; i < 50; i++) {
      const city = new City(data)
      city
        .save()
    }

    res.redirect('/')
  }
  // //[GET],/courses/:id/edit
  // edit(req, res, next) {
  //   Courses.findById(req.params.id)
  //     .then((courses) => {
  //       res.render("courses/edit", {
  //         courses: mongooseToObject(courses),
  //       })
  //     })
  //     .catch(next)
  // }
  // //[PUT],/courses/:id
  // update(req, res, next) {
  //   const data = req.body
  //   data.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`

  //   Courses.updateOne({ _id: req.params.id }, data)
  //     .then(() => res.redirect("/me/stored/courses"))
  //     .catch(next)
  // }
  // //[DELETE],/courses/:id
  // delete(req, res, next) {
  //   Courses.deleteOne({ _id: req.params.id })
  //     .then(() => res.redirect("back"))
  //     .catch(next)
  // }


}

module.exports = new CityController()

//export thu gi thi nhan duoc thu do
// const newController = require('./NewsController')
//GET,POST,PUT,PATCH,DELETE,OPTIONS,HEAD
//GET gửi yêu cầu từ client lên server trả về dữ liệu cho phía client
//POST gửi yêu cầu từ client lên server lưu lại 1,tạo mới một dữ liệu dữ liệu cho phía client
//PUT,PATCH gửi yêu cầu từ client lên server chỉnh sửa một dữ liệu dữ liệu
//PUT CHỉnh sửa hẳn 1 document PATCH thì chỉnh sửa từng fill


