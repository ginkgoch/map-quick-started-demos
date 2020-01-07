const path = require('path');
const canvasImp = require('canvas');
const gk = require('ginkgoch-map').default.all;
const { 
    NativeFactory,
    ShapefileFeatureSource, FeatureLayer, 
    FillStyle, MapEngine, Srs ,
    FeatureCollection, Point,
    Projection
} = gk;

NativeFactory.registerFrom(canvasImp);
 
let controller = {
    initMap() {
        let layerCountries = controller._getLayer(`../../data/cntry02-900913.shp`, '#f0f0f0', '#636363');

        // Create a engine with size 256 * 256 pixels
        let mapEngine = new MapEngine(256, 256);

        // Init the map rendering spatial reference system
        mapEngine.srs = new Srs('EPSG:900913');

        // Push the feature layer into map
        mapEngine.pushLayer(layerCountries);

        return mapEngine;
    },

    async xyz(mapEngine, z, x, y) {
        return await mapEngine.xyz(x, y, z);
    },

    async intersection(mapEngine, coordinate, zoom) {
        let features = await mapEngine.intersection(new Point(coordinate.x, coordinate.y), 'WGS84', zoom, 5);
        let projection = new Projection('WGS84', mapEngine.srs.projection);
        features = features.flatMap(f => f.features);
        features.forEach(f => {
            f.geometry = projection.inverse(f.geometry);
        });
        return new FeatureCollection(features).toJSON();
    },

    _getLayer(filePath, fillColor, strokeColor) {
        let sourcePath = path.resolve(__dirname, filePath);

        // Create a feature source instance
        let source = new ShapefileFeatureSource(sourcePath);
        
        // Create a feature layer instance
        let layer = new FeatureLayer(source);

        // Define a style for feature layer
        layer.styles.push(new FillStyle(fillColor, strokeColor, 1));

        return layer;
    }
} 

module.exports = controller;