const newsRouter = require ('./news');
const userRouter = require ('./user');
const meRouter = require ('./me');
const coursesRouter = require ('./courses');
const sitesRouter = require ('./site.js');

//tập hợp các đường dẫn sau khi mình ấn locohost 
function route (app) {
  app.use ('/news', newsRouter);
  app.use ('/user', userRouter);
  app.use ('/me', meRouter);
  app.use ('/courses', coursesRouter);
  app.use ('/', sitesRouter);
}
module.exports = route;
