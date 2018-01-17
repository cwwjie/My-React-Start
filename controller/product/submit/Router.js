const router = require('koa-router')();
const index = require('./index.js');

router.get('/', index);
router.get('/index.html', index);

module.exports = router;
