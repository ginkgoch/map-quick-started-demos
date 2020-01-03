const gk = require('ginkgoch-map').default.all;
const utils = require('../shared/utilities');
const { LinearRing, Polygon, Point, LineString, } = gk;
const { MemoryFeatureSource, FeatureLayer, Feature } = gk;
const { FillStyle, LineStyle, PointStyle } = gk;

async function main() {
    let extRing = new LinearRing([[2, 2], [98, 2], [2, 98], [2, 2]].map(_arrToCoordinate));
    let polygon = new Polygon(extRing);

    let lineStr = new LineString([[10, 10], [90, 90]].map(_arrToCoordinate));

    let point = new Point(88, 88);

    let source = new MemoryFeatureSource();
    await source.push(new Feature(polygon));
    await source.push(new Feature(lineStr));
    await source.push(new Feature(point));

    let layer = new FeatureLayer(source);
    layer.styles.push(new FillStyle('#9ecae1', '#3182bd', 4));
    layer.styles.push(new LineStyle('#31a354', 10));
    layer.styles.push(new PointStyle('#fee8c8', '#e34a33', 4));

    await utils.drawLayers({ srs: 'WGS84', w: 256, h: 256, layers: [layer], out: __filename });
}

function _arrToCoordinate(arr) {
    return {x: arr[0], y: arr[1]};
}

main();