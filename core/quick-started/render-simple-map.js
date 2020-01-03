const fs = require('fs');
const path = require('path')
const canvasImp = require('canvas');
const { MapEngine, ShapefileFeatureSource, FeatureLayer, Srs, FillStyle, NativeFactory } = require('ginkgoch-map').default.all;

// This is important to register the canvas lib for graphics.
NativeFactory.registerFrom(canvasImp);

async function main() {
    // Create a feature source instance
    let source = new ShapefileFeatureSource(`../data/cntry02-900913.shp`);
    
    // Create a feature layer instance
    let layer = new FeatureLayer(source);

    // Define a style for feature layer
    layer.styles.push(new FillStyle('#fee8c8', 'black', 1));

    // Create a engine with size 512 * 512 pixels
    let mapEngine = new MapEngine(512, 512);

    // Init the map rendering spatial reference system
    mapEngine.srs = new Srs('EPSG:900913');

    // Push the feature layer into map
    mapEngine.pushLayer(layer);
    
    // Draw map async and get image instance
    let image = await mapEngine.image();

    // Gets buffer from image
    let imageBuffer = image.toBuffer();

    // Store image buffer on disk
    fs.writeFileSync(`${path.basename(__filename, '.js')}.png`, imageBuffer);
}

main();
