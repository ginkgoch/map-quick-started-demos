const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const static = require('koa-static');
const mapRouter = require('./routes/map-router');

const server = new Koa();
server.use(static('./assets'));
server.use(bodyParser());
server.use(mapRouter.routes()).use(mapRouter.allowedMethods());
server.listen(3000, () => {
    console.log('Server is listening on port 3000');
});
