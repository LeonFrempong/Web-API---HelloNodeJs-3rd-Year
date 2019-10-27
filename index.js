var Koa = require('koa');
const cors = require('@koa/cors');
const passport = require('koa-passport');


//import all the routes 
var welcome = require('./routes/welcome');
var admin = require('./routes/admin');
var articles = require('./routes/articles.js');
var articles =require('./routes/users')


var app = new Koa();

app.use(cors());


require('./auth');
app.use(passport.initialize());

//apply theoutes as a middleware
app.use(welcome.routes());
app.use(admin.routes());
app.use(articles.routes());
app.use(users.routes());


var port = process.env.PORT || 3000;


//run the server on port 3000
app.listen(port);
