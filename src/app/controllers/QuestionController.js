var Question = require("../models/Questions");

exports.getAll = async function (req, res) {
  await Question.find({}).lean().exec((err, data) => {
    res.render("ListQuestion", { listQuestion: data });
  });
};

exports.insert = function (req, res) {
    let question = new Question({
        title: req.body.title,
        option1: req.body.option1,
        option2: req.body.option2,
        option3: req.body.option3,
        option4: req.body.option4,
        trueOption: req.body.trueOption,

    });
    question.save(function (err) {
      if (err) {
        return next(err);
      }
      res.redirect('InsertQuestion')
    });
  };

  exports.update = (req, res) => {

    let id = req.body.edit_ID;
    let _title = req.body.edit_title;
    let _option1 = req.body.edit_option1;
    let _option2 = req.body.edit_option2;
    let _option3 = req.body.edit_option3;
    let _option4 = req.body.edit_option4;
    let _trueOption = req.body.edit_trueOption;
  
    Question.findByIdAndUpdate(
       {_id:id},
       { title:_title,option1: _option1, option2: _option2, option3: _option3,option4:_option4, trueOption:_trueOption }
    ,
      function (err, result) {
        if (err) {
          console.log(err);
        }
        exports.getAll(req, res);
      });
  };


  exports.delete = (req, res) => {
    let id = req.body.del_ID;
    console.log(id);
    Question.findByIdAndRemove({ _id: id },
      (err) => {
        if (err) {
          console.log(err);
        }
        res.redirect('ListQuestion')
      });
  };
  