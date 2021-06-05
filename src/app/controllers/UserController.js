const User = require ('../models/User');
const {mongooseToObject} = require ('../../util/mongoose');
const sha256 = require ('js-sha256');
const jwt = require ('jwt-then');

class UserController {
  //[GET],/
  dangky (req, res) {
    res.render ('login-register', {layout: false});
  }
  login (req, res) {
    res.render ('login', {layout: false});
  }

  //POST,/register
  register (req, res) {
    const {name, email, password, isTurtor, image} = req.body;
    const emailRegex = /@gmail.com|@yahoo.com/;
    if (!emailRegex.test (email)) throw 'Khong ho tro domain';

    if (password.length < 6) throw 'Pass phai chua 6 ky tu';

    // if (isTurtor !== 'default' || isTurtor !== 'turtor')
    //   throw 'chon user ban muon';

    const userCheck = User.findOne ({
      email,
    });
    if (userCheck) throw 'Email trùng';

    const user = new User ({
      name,
      email,
      password: sha256 (password + process.env.SALT),
      isTurtor,
      image,
    });
    user.save ().then (() => res.redirect ('/home')).catch (err => {
      console.log ('ERR', err);
    });
    // res.json ({
    //   message: 'user [' + name + '] đăng ký thành công',
    // });
  }

  async loginStore (req, res) {
    const {email, password} = req.body;

    User.findOne ({
      email: email,
      password: sha256 (password + process.env.SALT),
    }).then (user => {
      res.redirect('./home')
    }).catch(next)

    // const user = User.findOne ({
    //   email: email,
    //   password: sha256 (password + process.env.SALT),
    // });
    // if (!user) throw 'email hoặc mật khẩu không đúng';
    // console.log('user',user)

    // const token = await jwt.sign ({id: user.id}, process.env.SECRET);
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
