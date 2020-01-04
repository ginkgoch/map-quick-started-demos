const path = require('path')
const gk = require('ginkgoch-map').default.all;
const utils = require('../shared/utilities');
const { ShapefileFeatureSource, FeatureLayer } = gk;
const { ValueStyle, FillStyle } = gk;

// This demo is using value style to render some specific field values only.
async function main() {
    let sourcePath = path.resolve(__dirname, '../../data/Africa/Africa.shp');
    
    // First we render all district areas just for reference.
    let sourceRef = new ShapefileFeatureSource(sourcePath);
    let layerRef = new FeatureLayer(sourceRef);
    layerRef.styles.push(new FillStyle('#f0f0f0', '#636363', 1));
    
    // Second, we create a value style for field values `MAL`, `ZAI` and `SUD`.
    let style = new ValueStyle('CODE', [
        { value: 'MAL', style: new FillStyle('#d95f0e', 'black', 1) },
        { value: 'ZAI', style: new FillStyle('#fec44f', 'black', 1) },
        { value: 'SUD', style: new FillStyle('#fff7bc', 'black', 1) }
    ]);
    layerRef.styles.push(style);

    try {
        await utils.drawLayers({ srs: 'WGS84', w: 256, h: 256, layers: [layerRef], out: __filename });
    } catch (ex) {
        console.log(ex);
    }
}

main();