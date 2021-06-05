const express = require("express")
const router = express.Router()
const controller = require("./controller")

router
    .get("/", controller.getAll)
    .post("/", controller.store)
module.exports = router //exporst qua index.js để su dung
