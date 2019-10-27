'use strict'

var Router =  require('koa-router');
var model = require('../models/users');

var router = Router({
    prefix:'/api/v1.0/users'
});

var bodyParser = require('koa-bodyparser');

router.get('/:id([0-9]{1,})', async(cnx, next) =>{

    let id = cnx.params.id;
    let data = await model.getById(id);

    if(data.length === 0){
        cnx.response.status = 404;
        cnx.body = {message:"user not found"}
    }
    else
        cnx.body = data;
});
router.post('/', bodyParser(), async (cnx, next) =>{

    console.log(cnx.request.body);

    let newUser = {
        email : cnx.request.body.values === undefined ? undefined: cnx.request.body.values.email,
        password : cnx.request.body.values === undefined ? undefined: cnx.request.body.values.password,
        passwordConfirmation: cnx.request.body.values === undefined ? undefined : cnx.request.body.values.passwordConfirmation
    };
    try{
        await model.add(newUser);
        cnx.response.status = 201;
        cnx.body = {message:"user was added successfully"};
    }
    catch(error){
        cnx.response.status = error.status;
        cnx.body = {message:console.error.message};
        
    }

});
router.put('/:id[0-9]{1,})', async(cnx, next) =>{
    let newUser ={ email : cnx.request.body.values === undefined ? undefined: cnx.request.body.values.email,
        password : cnx.request.body.values === undefined ? undefined: cnx.request.body.values.password,
        passwordConfirmation: cnx.request.body.values === undefined ? undefined : cnx.request.body.values.passwordConfirmation};
    let data = await model.update(newUser)
    
    if(data.error){
        cnx.body.response.status = data.code;
        cnx.body = {message:data.error}
    }
    else{
        cnx.body = data;
    }

});

router.del('/:id([0-9]{1,})', async(cnx, next) =>{
    let newUser = { email : cnx.request.body.values === undefined ? undefined: cnx.request.body.values.email,
        password : cnx.request.body.values === undefined ? undefined: cnx.request.body.values.password,
        passwordConfirmation: cnx.request.body.values === undefined ? undefined : cnx.request.body.values.passwordConfirmation};
    let data = model.del(newUser);
});

module.exports = router;

