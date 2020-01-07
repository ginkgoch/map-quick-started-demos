const Router = require('@koa/router');
const controller = require('../shared/mapController');
const MapObject = require('../shared/mapObject');

const router = new Router();
const mapObject = new MapObject('default', { initMap: controller.initMap });

router.get('/maps/:name/:z/:x/:y', async ctx => {
    let { x, y, z } = ctx.params;
    let mapImageBuffer = await mapObject.xyzImageBuffer(x, y, z);
    let buff = ctx.body = mapImageBuffer;
    ctx.type = 'png';
    ctx.length = buff.length;
});

router.post('/maps/:name/do', async ctx => {
    mapObject.event.on('SPATIAL_IDENTIFY', async payload => {
        let mapEngine = mapObject.getMap();
        let features = await controller.intersection(mapEngine, payload.latlng, payload.zoom, 20);
        return features;
    });

    const features = await mapObject.event.handle(ctx);
    ctx.body = features;
    ctx.type = 'json';

    mapObject.event
});

module.exports = router;
