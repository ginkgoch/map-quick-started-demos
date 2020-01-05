const path = require('path')
const gk = require('ginkgoch-map').default.all;
const utils = require('../shared/utilities');
const { ShapefileFeatureSource, FeatureLayer } = gk;
const { TextStyle, FillStyle } = gk;

// This demo is using value style to render some specific field values only.
async function main() {
    let sourcePath = path.resolve(__dirname, '../../data/Africa/Africa.shp');
    
    // First we render all district areas just for reference.
    let sourceRef = new ShapefileFeatureSource(sourcePath);
    let layerRef = new FeatureLayer(sourceRef);
    layerRef.styles.push(new FillStyle('#f0f0f0', '#636363', 1));
    
    // Second, we create a value style for field values `MAL`, `ZAI` and `SUD`.
    let style = new TextStyle('[COUNTRY]', 'black', 'arial 20px');
    layerRef.styles.push(style);

    try {
        await utils.drawLayers({ srs: 'WGS84', layers: [layerRef], out: __filename });
    } catch (ex) {
        console.log(ex);
    }
}

main();