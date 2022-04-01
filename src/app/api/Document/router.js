const express = require("express")
const router = express.Router()
const controller = require("./controller")
var multer = require ('multer');

console.log(storage)
var storage = multer.diskStorage ({
  destination: function (req, file, cb) {
    
    cb (null, 'src/public/TaiLieu');
  },
  filename: function (req, file, cb) {
    cb (null, Date.now () + '-' + file.originalname);
  },
});

var upload = multer ({storage: storage});

router
  .get("/", controller.getAll)
  // .get("/:id", controller.getById)
  // .get("/type/:id", controller.getAllCourseType)
  .get("/courseId/:id", controller.getDocumentByCoureId)
  // .post("/", controller.store)
  .post("/add",upload.single ('Document'), controller.addDocument)
  // .put("/:id", controller.update)
  // .put("/addStudent/:id", controller.addStudent)
  // .delete("/:id", controller.delete)
module.exports = router //exporst qua index.js để su dung
