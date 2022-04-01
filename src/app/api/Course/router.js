const express = require("express")
const router = express.Router()
const controller = require("./controller")



router
  .get("/", controller.getAll)
  .get("/learning", controller.getAllCourseLearning)
  .get("/:id", controller.getById)
  .get("/type/:id", controller.getAllCourseType)
  .get("/userId/:id", controller.getCourseByUserId)
  .post("/", controller.store)
  .post("/addCourseLearning", controller.course_learning)
  .post("/addCourse", controller.addCourse)
  .put("/:id", controller.update)
  .put("/addStudent/:id", controller.addStudent)
  .delete("/:id", controller.delete)
module.exports = router //exporst qua index.js để su dung
