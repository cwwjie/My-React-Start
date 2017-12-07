const Koa = require('koa');
const static = require('koa-static');
const controller = require('./controller/Router');

const app = new Koa();

controller( app );

app.use( static('static') );

app.use(ctx => {
  ctx.body = '404';
});

app.listen(8000);
