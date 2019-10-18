var Koa = require('koa');

//import all the routes 
var special = require('./routes/welcome');
var admin = require('./routes/admin');
var articles = require('./routes/articles.js');


var app = new Koa();

//apply theoutes as a middleware
app.use(special.routes());
app.use(admin.routes());
app.use(articles.routes());


var port = process.env.PORT || 3000;


//run the server on port 3000
app.listen(port);
