const express = require("express")

const router = express.Router()

const controller = require("./controller")

//getAll
router.get("/allQuestion", controller.getAll)

module.exports = router //exporst qua index.js để su dung
