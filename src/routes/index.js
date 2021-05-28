const newsRouter = require ('./news');
const meRouter = require ('./me');
const coursesRouter = require ('./courses');
const sitesRouter = require ('./site.js');

function route (app) {
  app.use ('/news', newsRouter);
  app.use ('/me', meRouter);
  app.use ('/courses', coursesRouter);
  app.use ('/', sitesRouter);
}
module.exports = route;
