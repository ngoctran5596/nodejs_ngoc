const express = require("express")
const router = express.Router()
const controller = require("./controller")

router
  .get("/", controller.getAll)
  // .get("/:id", controller.getById)
  // .get("/type/:id", controller.getAllCourseType)
  .get("/courseId/:id", controller.getDocumentByCoureId)
  // .post("/", controller.store)
  .post("/add", controller.addDocument)
  // .put("/:id", controller.update)
  // .put("/addStudent/:id", controller.addStudent)
  // .delete("/:id", controller.delete)
module.exports = router //exporst qua index.js để su dung
