const express = require("express")
const router = express.Router()
const controller = require("./controller")

router.get("/allCourses", controller.getAll)
router.post("/store", controller.store)
module.exports = router //exporst qua index.js để su dung
