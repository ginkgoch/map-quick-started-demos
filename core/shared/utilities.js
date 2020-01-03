const fs = require('fs');
const path = require('path')
const canvasImp = require('canvas');
const _ = require('lodash');
const { MapEngine, NativeFactory, Srs } = require('ginkgoch-map').default.all;

module.exports = {
    /**
     * @param options Defaults to `{ w: 512, h: 512, srs: 'EPSG:900913', layers:[], envelope: undefined, out: 'unknown.png' }`.
     */
    async drawLayers(options) {
        NativeFactory.registerFrom(canvasImp);

        options = _.defaults(options, { w: 512, h: 512, srs: 'EPSG:900913', layers:[], envelope: undefined, out: 'unknown.js' });

        let mapEngine = new MapEngine(options.w, options.h);

        // Init the map rendering spatial reference system
        mapEngine.srs = new Srs(options.srs);

        // Push the feature layer into map
        mapEngine.pushLayers(options.layers);

        // Draw map async and get image instance
        let image = await mapEngine.image(options.envelope);

        // Gets buffer from image
        let imageBuffer = image.toBuffer();

        // Store image buffer on disk
        fs.writeFileSync(`${options.out.replace(/\.js/gi, '')}.png`, imageBuffer);
    }
};
