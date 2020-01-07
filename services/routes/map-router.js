const Router = require('@koa/router');
const controller = require('../shared/mapController');
const PostBackHandler = require('../shared/postBackHandler');

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

router.post('/maps/:name/do', async ctx => {
    let event = new PostBackHandler();
    event.on('SPATIAL_IDENTIFY', async payload => {
        let mapEngine = mapStatesCache.get(ctx.params.name);
        let features = await controller.intersection(mapEngine, payload.latlng, payload.zoom, 20);
        return features;
    });

    const features = await event.handle(ctx);
    ctx.body = features;
    ctx.type = 'json';
});

module.exports = router;
