<<<<<<< HEAD
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
=======
const newsRouter = require("./news");
const userRouter = require("./user");
const meRouter = require("./me");
const coursesRouter = require("./courses");
const sitesRouter = require("./site.js");
const questionRouter = require("./question");
const questionApiRouter = require("../app/api/Question/router");
const courseApiRouter = require("../app/api/Course/router")

//tập hợp các đường dẫn sau khi mình ấn locohost
function route(app) {
  app.use("/news", newsRouter);
  app.use("/user", userRouter);
  app.use("/me", meRouter);
  app.use("/courses", coursesRouter);
  app.use("/", sitesRouter);
  app.use("/question", questionRouter);

  // api
  app.use("/api/questions", questionApiRouter);
  app.use("/api/courses",courseApiRouter)
>>>>>>> feature/task_api
}
module.exports = route;
