var Router = require('koa-router');
var model = require('../models/article');

var router = Router({
   prefix: '/api/v1.0/articles'
}); //Prefixed all routes with /api/v1.0/articles

   //because we are going to parse POST parameters we will import koa-bodyparser
   var bodyParser = require('koa-bodyparser');

   //Routes will go here
router.get('/', async (cnx, next) => {
   let id = cnx.params.id;
   cnx.body = await model.getAll(id);

});
    //the id should be a number greater than or equal 1
router.get('/:id([0-9]{1,})', async (cnx, next) =>{

   let id = cnx.params.id; 
   cnx.body = await model.getById(id);

   if(data === null){
      cnx.body.response.status = 404;
      cnx.body = {message:"article not found"}
   }
   else
   cnx.body = data;


});

    //note that we have injected the body parser only in the POST request
router.post('/', bodyParser(), async (cnx, next) =>{

   let newArticle = {title:cnx.request.body.title, allText:cnx.request.body.allText}
;  await model.add(newArticle);
   cnx.body = {message:"added successfully"};
});
      


router.put('/:id([0-9]{1,})', async (cnx, next) =>{
//TODO: edit an article
   let newArticle= {title:cnx.request.body.title, allText:cnx.request.body.allText};
   let data = await model.update(newArticle);
   
   if(data.error){
      cnx.body.response.status = data.code;
      cnx.body = {message:data.error}
   }
   else{
      cnx.body = data;
   }
      
});
router.del('/:id([0-9]{1,})', async (cnx, next) =>{
 //TODO: edit an article
   let newArticle = {title:cnx.request.body.title, allText:cnx.request.body.allText};
   let data = await model.del(newArticle);

});


module.exports = router;

