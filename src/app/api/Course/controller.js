var Courses = require("../../models/Courses")

exports.getAll = async function (req, res) {
  await Courses.find({})
    .lean()
    .exec((err, data) => {
      res.send(data)
    })
}

exports.store = async function (req, res) {
  await Courses.find({})
    .lean()
    .exec((err, data) => {
      res.send(data)
    })
}

// exports.insert = courseController.store();
