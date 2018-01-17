const router = require('koa-router')();
const index = require('./index.js');
const submit = require('./submit/Router.js');

router.get('/', index);
router.get('/index.html', index);
router.use('/submit', submit.routes());

module.exports = router;
