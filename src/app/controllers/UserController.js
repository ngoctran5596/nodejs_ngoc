const User = require ('../models/User');
const sendMail = require ('./UserFull');
const {mongooseToObject} = require ('../../util/mongoose');
const bcrypt = require ('bcrypt');

const sha256 = require ('js-sha256');
const jwt = require ('jsonwebtoken');
const slug = require ('mongoose-slug-generator');

const {CLIENT_URL} = process.env;

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

    try {
      const checkExits = await User.findOne ({
        email: email,
      });
      if (checkExits) return res.json ({error: 'Trùng Mail rồi bạn'});

      const user = new User ({
        name,
        email,
        password: sha256 (password + process.env.SALT),
        isTurtor,
        image,
      });
      await user.save ();
      const accessToken = jwt.sign (
        {userId: user._id},
        process.env.ACCESS_TOKEN_SECRET
      );
      // res.json ({success: true, message: 'success', accessToken});
      res.redirect ('/home');
    } catch (error) {
      console.log ('ERRRRRORRR', error);
    }
  }

  //[POST]/login

  async loginStore (req, res) {
    const {email, password} = req.body;

    if (!email || !password)
      return res
        .status (400)
        .json ({success: false, message: 'Sai mail hoặc mật khẩu'});

    const user = await User.findOne ({
      email: email,
      password: sha256 (password + process.env.SALT),
    });

    if (!user)
      return res.json ({success: false, message: 'Sai mail hoặc mật khẩu'});

    res.redirect ('./home');
  }

  delete (req, res, next) {
    User.deleteOne ({_id: req.params.id})
      .then (() => res.redirect ('back'))
      .catch (next);
  }

  //[POST]/api/user
  async apiLogin (req, res) {
    const {email, password} = req.body;
    const user = await User.findOne ({
      email: email,
      password: sha256 (password + process.env.SALT),
    });
    try {
      if (!user) {
        res.json ({success: false, message: 'Sai mail hoặc mật khẩu'});
      } else {
        const accessToken = jwt.sign (
          {userId: user._id},
          process.env.ACCESS_TOKEN_SECRET
        );
        const value = {
          name: user.name,
          email: user.email,
          image: user.image,
        };
        res.json ({
          success: true,
          message: 'success',
          accessToken,
          user: value,
        });
      }
    } catch (error) {
      res.json ({success: false, message: 'Lỗi server'});
    }
  }

  //[POST]/api/user
  async apiRegister (req, res, next) {
    try {
      // isTurtor, image
      const {name, email, password, isTurtor} = req.body;

      const emailRegex = /@gmail.com|@yahoo.com/;
      if (!name || !email || !password)
        return res.status (400).json ({message: 'Please fill in all feids.'});

      if (!emailRegex.test (email))
        return res.status (400).json ({error: 'Invalid email'});

      const checkExits = await User.findOne ({
        email: email,
      });

      if (checkExits) return res.json ({error: 'This email already exists.'});

      if (password.length < 6)
        return res
          .status (400)
          .json ({error: 'Password must be at least 6 characters.'});

      const passwordHash = await bcrypt.hash (password, 12);
      const newUser = new User ({
        name,
        email,
        password: passwordHash,
        isTurtor,
      });

      const activation_token = createActivationToken (newUser);
      const url = `${CLIENT_URL}/user/activate/${activation_token}`;
      sendMail (email, url);

      res.json ({
        msg: 'Register Success! Please activate your email to start.',
      });
    } catch (error) {
      return res.status (500).json ({msg: error.message});
    }
  }

  async activateEmail (req, res) {
    try {
      const {activation_token} = req.body;
      const user = jwt.verify (
        activation_token,
        process.env.ACTIVATION_TOKEN_SECRET
      );
      const {name, email, password} = user;


      console.log('newUser',name, email, password)
      const check = await User.findOne ({email});
      if (check)
        return res.status (400).json ({msg: 'This email already exists.'});


      const newUser = new User ({
        name,
        email,
        password
      });

     

      await newUser.save();

      res.json ({msg: 'Account has been activated!'});
    } catch (err) {
      return res.status (500).json ({msg: err.message});
    }
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

const createActivationToken = payload => {
  return jwt.sign (payload.toJSON (), process.env.ACTIVATION_TOKEN_SECRET, {
    expiresIn: '5m',
  });
};
const createAccessToken = payload => {
  return jwt.sign (payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '15m',
  });
};

const createRefreshToken = payload => {
  return jwt.sign (payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: '7d',
  });
};

module.exports = new UserController ();
