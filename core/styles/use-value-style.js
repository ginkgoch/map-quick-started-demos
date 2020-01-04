const path = require('path')
const gk = require('ginkgoch-map').default.all;
const utils = require('../shared/utilities');
const { ShapefileFeatureSource, FeatureLayer } = gk;
const { ValueStyle } = gk;

async function main() {
    let sourcePath = path.resolve(__dirname, '../../data/Africa/Africa.shp');
    let source = new ShapefileFeatureSource(sourcePath);
    let layer = new FeatureLayer(source);
    await source.open();
    
    // Use aggregator to find distinct value based on field `CODE`.
    let aggregator = await source.propertyAggregator(['CODE']);
    let distinctValues = aggregator.distinct('CODE');

    // Use the shortcut function to generate a set of gradient fill styles between two colors.
    let style = ValueStyle.auto('fill', 'CODE', distinctValues, '#fee8c8', '#e34a33', 'black', 1);
    layer.styles.push(style);

    await utils.drawLayers({ srs: 'WGS84', w: 256, h: 256, layers: [layer], out: __filename });
}

main();