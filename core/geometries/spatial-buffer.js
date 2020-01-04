const gk = require('ginkgoch-map').default.all;
const utils = require('../shared/utilities');
const { LinearRing, Polygon } = gk;
const { MemoryFeatureSource, FeatureLayer, Feature } = gk;
const { FillStyle, SpatialOps, Envelope } = gk;

async function main() {
    let polygon = new Polygon(new LinearRing(utils.generateStar()));
    let polygonLayer = _getMemoryLayer([polygon], '#3182bd');

    let polygonBuffered = SpatialOps.buffer(polygon, 4);
    let polygonBufferedLayer = _getMemoryLayer([polygonBuffered], '#9ecae1');

    let envelope = Envelope.unionAll([polygon.envelope(), polygonBuffered.envelope()]);

    await utils.drawLayers({ 
        srs: 'WGS84', w: 256, h: 256, 
        layers: [polygonBufferedLayer, polygonLayer], 
        out: __filename, 
        envelope, 
        envelopeMargin: 4 });
}

function _getMemoryLayer(geometries, fillColor) {
    let source = new MemoryFeatureSource(geometries.map(g => new Feature(g)));
    let layer = new FeatureLayer(source);
    layer.styles.push(new FillStyle(fillColor, 'transparent', 0));

    return layer;
}

main();