class SitesController {

  //[GET],/news
  home (req, res) {
    res.render ('home');
  } //[GET],/:slug
  search (req, res) {
    res.render ('search');
  }
}

module.exports = new SitesController ();

//export thu gi thi nhan duoc thu do
// const newController = require('./NewsController')