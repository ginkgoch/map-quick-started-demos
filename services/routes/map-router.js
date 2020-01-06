const Router = require('@koa/router');
const controller = require('./map-controller');

const mapStatesCache = new Map();
const router = new Router();

router.get('/maps/:name/:z/:x/:y', async ctx => {
    let { name, x, y, z } = ctx.params;
    if (!mapStatesCache.has(name)) {
        mapStatesCache.set(name, controller.getInitMap());
    } 

    let mapEngine = mapStatesCache.get(name);
    let mapImage = await controller.xyz(mapEngine, z, x, y);

    let buff = ctx.body = mapImage.toBuffer();
    ctx.type = 'png';
    ctx.length = buff.length;
});

module.exports = router;