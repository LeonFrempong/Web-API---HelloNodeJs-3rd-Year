var Router = require('koa-router');
var router = Router({
    prefix: '/api/v1.0/'
});

router.get('/', (cnx, next) => {
    cnx.body = {message:'Welcome to Oktob API version 1.0'};
});

module.exports = router;