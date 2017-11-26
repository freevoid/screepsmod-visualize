const Random = require('random-js'),
    Canvas = require('canvas');

const TERRAIN_COLORS = {
    PLAIN: rgb(204, 197, 157),
    SWAMP: rgb(124, 147, 100),
    WALL: rgb(51, 48, 30),
    LAVA: rgb(224, 86, 0)
};

const TERRAIN_BY_CODE = [
    'PLAIN',
    'WALL',
    'SWAMP',
    'WALL'
];

const TERRAIN_COLORS_BY_CODE = [
    TERRAIN_COLORS.PLAIN,
    TERRAIN_COLORS.WALL,
    TERRAIN_COLORS.SWAMP,
    TERRAIN_COLORS.WALL
];

const DEFAULT_TERRAIN_TYPE = 'PLAIN';

const ROOM_WIDTH = 50,
    ROOM_HEIGHT = 50,
    IMAGE_WIDTH = 500,
    IMAGE_HEIGHT = 500,
    CELL_WIDTH = IMAGE_WIDTH / ROOM_WIDTH,
    CELL_HEIGHT = IMAGE_HEIGHT / ROOM_HEIGHT,
    UNIT_RADIUS = Math.min(CELL_WIDTH, CELL_HEIGHT) * 0.35,
    RANDOM_SEED = 42;

const randomEngine = Random.engines.mt19937();
randomEngine.seed(RANDOM_SEED);

function rgb(r, g, b) {
    if (Number.isInteger(r)) {
        return 'rgb(' + r + ',' + g + ',' + b + ')';
    } else if (r.r !== undefined) {
        return 'rgb(' + r.r + ',' + r.g + ',' + r.b + ')';
    }
}

function getRandomColor() {
    return rgb({
        r: Random.integer(0, 255)(randomEngine),
        g: Random.integer(0, 255)(randomEngine),
        b: Random.integer(0, 255)(randomEngine)
    });
}

const _map_view_colors_cache = {};

function addToColorsCache(key, color) {
    _map_view_colors_cache[key] = color;
}

function getColorForKey(key) {
    let color = _map_view_colors_cache[key];
    if (color === undefined) {
        color = getRandomColor();
        addToColorsCache(key, color);
    }
    return color;
}

const MAP_VIEW_FIELDS = ['w', 'r', 'pb', 'p', 's', 'c', 'm', 'k'];
for (var field in MAP_VIEW_FIELDS) {
    _map_view_colors_cache[field] = getColorForKey(field);
}

exports.drawMap = function(terrain, mapView) {
    let canvas = new Canvas(IMAGE_WIDTH, IMAGE_HEIGHT, 'svg');
    let ctx = canvas.getContext('2d');

    // Fill whole room with most common terrain
    ctx.fillStyle = TERRAIN_COLORS[DEFAULT_TERRAIN_TYPE];
    ctx.fillRect(0, 0, IMAGE_WIDTH, IMAGE_HEIGHT);

    // Draw terrain
    for (var x = 0; x < ROOM_WIDTH; x++) {
        for (var y = 0; y < ROOM_HEIGHT; y++) {
            let code = parseInt(terrain.charAt(y * ROOM_WIDTH + x));
            let terrainType = TERRAIN_BY_CODE[code];
            if (terrainType != DEFAULT_TERRAIN_TYPE) {
                let color = TERRAIN_COLORS_BY_CODE[code];
                ctx.fillStyle = color;
                ctx.fillRect(
                    x * CELL_WIDTH,
                    y * CELL_HEIGHT,
                    CELL_WIDTH,
                    CELL_HEIGHT);
            }
        }
    }

    // Draw map view objects
    for (let key in mapView) {
        for (let xy of mapView[key]) {
            let color = getColorForKey(key);

            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(
                (xy[0] + 0.5) * CELL_WIDTH,
                (xy[1] + 0.5) * CELL_HEIGHT,
                UNIT_RADIUS,
                0,
                2 * Math.PI);
            ctx.fill();
        }
    }

    return canvas;
};
