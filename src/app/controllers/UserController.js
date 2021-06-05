const User = require ('../models/User');
const {mongooseToObject} = require ('../../util/mongoose');
const sha256 = require ('js-sha256');
const jwt = require('jwt-then');

class UserController {
  //[GET],/user/login
  register (req, res) {
    const {name, email, password, isTurtor, image} = req.body;
    const emailRegex = /[@gmail.com|@yahoo.com]$/;
    if (!emailRegex.test (email)) throw 'Khong ho tro domain';

    if (password.length < 6) throw 'Pass phai chua 6 ky tu';

    if (isTurtor !== 'default' || isTurtor !== 'turtor')
      throw 'chon user ban muon';
    const user = new User ({
      name, 
      email,
      password: sha256 (password + process.env.SALT),
      isTurtor,
      image,
    });
    user.save ();
    res.json({
      message: "user ["+ name +"] đăng ký thành công",
    })
  }
  login (req, res) {
    const {email,password} = req.body;

    const user = User.findOne({
      email: email,
      password:sha256(password+process.env.SALT)
    })
    if(!user) throw 'email hoặc mật khẩu không đúng'
    
    const token = jwt.sign({id:user.id},process.evn.SECRET);
    res.json({
      massage:'Đăng nhập thành công',
      token
    })
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
