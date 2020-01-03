const fs = require('fs');
const path = require('path')
const canvasImp = require('canvas');
const { MapEngine, ShapefileFeatureSource, FeatureLayer, Srs, ValueStyle, NativeFactory } = require('ginkgoch-map').default.all;
const colorMapField = 'COLOR_MAP';

// This is important to register the canvas lib for graphics.
NativeFactory.registerFrom(canvasImp);

async function main() {
    // Create a feature source instance
    let source = new ShapefileFeatureSource(`../../data/cntry02-900913.shp`);
    
    // Create a feature layer instance
    let layer = new FeatureLayer(source);
    await layer.open();


    // This is an utility to provide some general aggregation function through the feature properties table
    // Here we only need a field calls `COLOR_MAP`
    let agg = await layer.source.propertyAggregator([colorMapField]);
    let colorMapValues = agg.distinct(colorMapField);

    // Define a style for feature layer
    // `auto` is a shortcut function to automatically construct a `ValueStyle` instance based on the distinct values
    // It is also allowed to manually construct its instance and fill with styles by valueStyle.items.push(...) function.
    let style = ValueStyle.auto('fill', colorMapField, colorMapValues, '#fee8c8', '#e34a33', 'black', 1);
    layer.styles.push(style);

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
