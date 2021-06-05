const newsRouter = require ('./news');
const userRouter = require ('./user');
const meRouter = require ('./me');
const chatRoomRouter = require ('./chatroom');
const coursesRouter = require ('./courses');
const sitesRouter = require ('./site.js');
// const loginRouter = require ('./auth.js');

//tập hợp các đường dẫn sau khi mình ấn locohost 
function route (app) {
  app.use ('/news', newsRouter);
  // app.use ('/user', userRouter);
  app.use ('/me', meRouter);
  app.use ('/chat', chatRoomRouter);
  app.use ('/courses', coursesRouter);
  app.use ('/home', sitesRouter);
  app.use ('/', userRouter);
}
module.exports = route;
