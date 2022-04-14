var Question = require("../models/Questions");
const {mongooseToObject, mutipleMongooseToObject } = require("../../util/mongoose")

class questionController {
  //[GET]/question
  async  index(req, res, next) {
   await Question.find({})
      .then((listQuestion) => {
        //map qua de bien thang nay thanh object thuong con contructor no khong doc duoc
        res.render("question/ListQuestion", {
          listQuestion: mutipleMongooseToObject(listQuestion),
        })
      })
      .catch(next)
  }

  //[GET]/question/create
  create(req, res) {
    res.render("question/create")
  }
  //[POST],/question/add
  add(req, res) {
    const data = req.body
    const question = new Question(data)
    question
      .save()
      .then(() => res.redirect("/question"))
      .catch((err) => {
        console.log("ERR", err)
      })
      
  }
  //[GET],/question/:id/edit
  edit(req, res, next) {
    Question.findById(req.params.id)
      .then((question) => {
        res.render("question/edit", {
          question: mongooseToObject(question),
        })
      })
      .catch(next)
  }
  //[PUT],/question/:id
  update(req, res, next) {
    const data = req.body
    Question.updateOne({ _id: req.params.id }, data)
      .then(() => res.redirect("/me/stored/courses"))
      .catch(next)
  }
  //[DELETE],/question/:id
  delete(req, res, next) {
    Question.deleteOne({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next)
  }

}
module.exports = new questionController ();



