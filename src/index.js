const express = require ('express');
const path = require ('path');
const morgan = require ('morgan');
const exphbs = require ('express-handlebars');
const app = express ();
const port = 3000;
const route = require ('./routes');
const db = require('./config/db');

db.connect();
app.use (express.static (path.join ('src','public')));
// console.log(__dirname,'public');
//http loger
// app.use (morgan ());
app.use (
  express.urlencoded ({
    extended: true,
  })
);
app.use (express.json ());

//template engine
app.engine (
  'hbs',
  exphbs ({
    extname: '.hbs',
  })
);
app.set ('view engine', 'hbs');
app.set ('views', path.join (__dirname, 'resources','views'));
// console.log(path.join(__dirname,'resources/views'));
//routes khoi tao tuyen duong
route (app);

//127.0.0.1 --- localhost

app.listen (port, () => {});
