var Courses = require("../../models/Courses");
var courseController = require("../CoursesController")

exports.getAll = async function (req, res) {
  await Courses.find({}).lean().exec((err, data) => {
    res.send(data);
  });
};
// exports.insert = courseController.store();
