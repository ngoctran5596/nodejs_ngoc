const express = require('express');
const path = require('path');
const morgan = require('morgan');
const exphbs  = require('express-handlebars');
const app = express();
const port = 3000;

app.use(express.static(path.join('src/public')));
// console.log(__dirname,'public');
// //http loger
app.use(morgan());

//template engine
app.engine('hbs', exphbs({
  extname: ".hbs",
}));
app.set('view engine', 'hbs');
app.set('views',path.join(__dirname,'resources/views'));
// console.log(path.join(__dirname,'resources/views'));
app.get('/', (req, res) => {
 res.render('home');
})
app.get('/new', (req, res) => {
  res.render('new');
 })
 
//127.0.0.1 --- localhost

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})