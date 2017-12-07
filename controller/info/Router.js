const router = require('koa-router')();

router.get('/', (ctx, next)=> {
	ctx.body = 'you get /info route';
});


module.exports = router;
