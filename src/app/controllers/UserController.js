const User = require ('../models/User');
const {mongooseToObject} = require ('../../util/mongoose');
const sha256 = require ('js-sha256');
const jwt = require ('jwt-then');

class UserController {
  //[GET],/
  dangky (req, res) {
    res.render ('login-register-custom', {layout: false});
  }
  login (req, res) {
    res.render ('login', {layout: false});
  }

  //[POST],/register

  async register (req, res, next) {
    const {name, email, password, isTurtor, image} = req.body;
    const emailRegex = /@gmail.com|@yahoo.com/;

    if (!emailRegex.test (email)) res.json ({error: 'Khong ho tro domain'});

    if (password.length < 6) res.json ({error: 'Pass chứa 6 ký tự'});

    const checkExits = await User.findOne ({
      email: email,
    });

    if (checkExits) {
      res.json ({error: 'Trùng Mail rồi bạn'});
    } else {
      const user = new User ({
        name,
        email,
        password: sha256 (password + process.env.SALT),
        isTurtor,
        image,
      });
      user.save ().then (() => res.redirect ('/home')).catch (next);
    }
  }


  //[POST]/login

  async loginStore (req, res) {
    const {email, password} = req.body;

    const user = await User.findOne ({
      email: email,
      password: sha256 (password + process.env.SALT),
    });

    // const token = await jwt.sign ({id: user.id}, process.env.SECRET);
    if (!user) {
      res.json ({error: 'Sai mail hoặc mật khẩu'});
    } else {
      res.redirect ('./home');
    }

    // res.json (token);
  }

  delete (req, res, next) {
    User.deleteOne ({_id: req.params.id})
      .then (() => res.redirect ('back'))
      .catch (next);
  }
}

module.exports = new UserController ();

//export thu gi thi nhan duoc thu do
// const newController = require('./NewsController')
//GET,POST,PUT,PATCH,DELETE,OPTIONS,HEAD
//GET gửi yêu cầu từ client lên server trả về dữ liệu cho phía client
//POST gửi yêu cầu từ client lên server lưu lại 1,tạo mới một dữ liệu dữ liệu cho phía client
//PUT,PATCH gửi yêu cầu từ client lên server chỉnh sửa một dữ liệu dữ liệu
//PUT CHỉnh sửa hẳn 1 document PATCH thì chỉnh sửa từng fill
