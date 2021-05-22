const newsRouter = require ('./news');
const sitesRouter = require ('./site.js');

function route (app) {
  app.use ('/news', newsRouter);
  app.use ('/', sitesRouter);
}
module.exports = route;
