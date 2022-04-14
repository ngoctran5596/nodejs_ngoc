const jwt = require ('jsonwebtoken');

module.exports = async (req, res, next) => {
  try {
    const token = req.header ('Authorization');

    if (!token) return res.status (400).json ({msg: 'Chưa có token.'});

    jwt.verify (token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) return res.status (400).json ({msg: 'Khong có user.'});
      req.user = user;
      next ();
    });
  } catch (err) {
    return res.status (500).json ({msg: err.message});
  }
};
