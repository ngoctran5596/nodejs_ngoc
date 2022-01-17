const newsRouter = require ('./news');
const userRouter = require ('./user');
const meRouter = require ('./me');
const chatRoomRouter = require ('./chatroom');
const coursesRouter = require ('./courses');
const sitesRouter = require ('./site.js');
const questionRouter = require ('./question');
const postRouter = require ('./post');
const userApi = require ('./userApi');
const noteApi = require ('./note');
const videoCallRouter = require ('./videocall');
const courseType = require ('./courseType');
const questionApiRouter = require ('../app/api/Question/router');
const courseApiRouter = require ('../app/api/Course/router');
const courseTypeApiRouter = require ('../app/api/CourseType/router');
const newsFeedApiRouter = require ('../app/api/Newsfeed/router');
const documentRouter = require ('../app/api/Document/router');
const GroupApiRouter = require ('../app/api/Group/router');
const chatRoute = require ('./chat.route');

//tập hợp các đường dẫn sau khi mình ấn locohost
function route (app) {
  app.use ('/news', newsRouter);
  // app.use("/user", userRouter);
  app.use ('/', userRouter);
  app.use ('/me', meRouter);
  app.use ('/chat', chatRoomRouter);
  app.use ('/courses', coursesRouter);
  app.use ('/courseType', courseType);
  app.use ('/home', sitesRouter);
  app.use ('/question', questionRouter);
  // app.use ('/mp3', meRouter);

  // api
  // app.use('/api', require('./upload'))
  app.use ('/post', postRouter);
  app.use ('/api/user', userApi);
  app.use ('/api/questions', questionApiRouter);
  app.use ('/api/courses', courseApiRouter);
  app.use ('/api/courseType', courseTypeApiRouter);
  app.use ('/api/newsfeed', newsFeedApiRouter);
  app.use ('/api/chat', chatRoute);
  app.use ('/api/note', noteApi);
  app.use ('/api/document', documentRouter);
  app.use ('/api/videoCall', videoCallRouter);

  app.use (GroupApiRouter);
}
module.exports = route;
