const _ = require('lodash');
const canvasImp = require('canvas');
const gk = require('ginkgoch-map').default.all;
const PostBackHandler = require('./postBackHandler');

gk.NativeFactory.registerFrom(canvasImp);

class MapObject {
    static mapStatesCache = new Map();

    constructor(name, options) {
        this.name = name;
        this.event = new PostBackHandler();
        this.options = _.defaults(options, { initMap: undefined });
    }

    initMap() {
        if (this.options && this.options.initMap) {
            return this.options.initMap();
        }

        throw new Error('initMap() is a must-to-implement function.');
    }

    getMap() {
        if (!MapObject.mapStatesCache.has(this.name)) {
            MapObject.mapStatesCache.set(this.name, this.initMap());
        } 
    
        let mapEngine = MapObject.mapStatesCache.get(this.name);
        return mapEngine;
    }

    async xyzImage(x, y, z) {
        let mapEngine = this.getMap();
        return await mapEngine.xyz(x, y, z);
    }

    async xyzImageBuffer(x, y, z) {
        let image = await this.xyzImage(x, y, z);
        return image.toBuffer();
    }
}

module.exports = MapObject;