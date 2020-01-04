const fs = require('fs');
const path = require('path')
const canvasImp = require('canvas');
const _ = require('lodash');
const { MapEngine, NativeFactory, Srs } = require('ginkgoch-map').default.all;

module.exports = {
    /**
     * @param options Defaults to `{ w: 512, h: 512, srs: 'EPSG:900913', layers:[], envelope: undefined, out: 'unknown.js', envelopeMargin: 0, outSuffix: '' }`.
     */
    async drawLayers(options) {
        NativeFactory.registerFrom(canvasImp);

        options = _.defaults(options, { w: 512, h: 512, srs: 'EPSG:900913', layers:[], envelope: undefined, out: 'unknown.js', envelopeMargin: 0, outSuffix: '' });

        let mapEngine = new MapEngine(options.w, options.h);

        // Init the map rendering spatial reference system
        mapEngine.srs = new Srs(options.srs);

        // Push the feature layer into map
        mapEngine.pushLayers(options.layers);

        let envelope = options.envelope;
        let margin = options.envelopeMargin;
        if (envelope && margin !== 0) {
            envelope = { minx: envelope.minx - margin, miny: envelope.miny - margin, maxx: envelope.maxx + margin, maxy: envelope.maxy + margin };
        }

        // Draw map async and get image instance
        let image = await mapEngine.image(envelope);

        // Gets buffer from image
        let imageBuffer = image.toBuffer();

        if (options.out) {
            // Store image buffer on disk
            fs.writeFileSync(`${options.out.replace(/\.js/gi, options.outSuffix)}.png`, imageBuffer);
        }
    },

    generateStar(vertexCount = 5, centerX = 0, centerY = 0, radius1 = 40, radius2 = 15) {
        let start = Math.PI / 2.0;
        let increment = Math.PI / vertexCount;
        let coordinates = [];
        
        for (let i = 0; i < vertexCount * 2 + 1; i++) {
            let angle = start + i * increment;
            let r = i % 2 === 0 ? radius1 : radius2;
            let x = r * Math.cos(angle) + centerX;
            let y = r * Math.sin(angle) + centerY;
            coordinates.push({ x, y });
        }
    
        return coordinates;
    }
};
