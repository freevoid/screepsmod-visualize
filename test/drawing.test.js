var assert = require('chai').assert,
    drawing = require('../lib/drawing.js');

const SAMPLE_TERRAIN = require('./sample_terrain.json');
const SAMPLE_MAP_VIEW = require('./sample_map_view.json');

suite('drawing', function() {
    suite('#drawMap', function() {
        test('should return non-empty canvas on valid data', function() {
            let canvas = drawing.drawMap(
                SAMPLE_TERRAIN.terrain,
                SAMPLE_MAP_VIEW);
            assert.typeOf(canvas, 'Canvas');
        });

        test('should return canvas of expected size', function() {
            let canvas = drawing.drawMap(
                SAMPLE_TERRAIN.terrain,
                SAMPLE_MAP_VIEW);
            assert.equal(canvas.width, 500);
            assert.equal(canvas.height, 500);
        });
    });
});
