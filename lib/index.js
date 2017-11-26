const fs = require('fs'),
    path = require('path'),
    drawing = require('./drawing.js');

module.exports = function(config) {
    if (config.backend) {
        let env = config.common.storage.env,
            db = config.common.storage.db;

        let roomTemplatePath = path.join(
            __dirname, '..', 'templates', 'room.html');
        let roomTemplate = fs.readFileSync(roomTemplatePath, 'utf8');

        config.backend.router.get(
            '/visualize/room.svg',
            function(request, response) {

            let roomName = request.query.room;

            let mapViewPromise = env.get(env.keys.MAP_VIEW + roomName)
                .then(data => JSON.parse(data));

            let terrainPromise =
                db['rooms.terrain'].find({
                    room: roomName
                });

            Promise.all([terrainPromise, mapViewPromise])
                .then(function([terrain, mapView]) {
                    return drawing.drawMap(terrain[0].terrain, mapView);
                })
                .then(function(img) {
                    response.type('svg');
                    response.set('Cache-Control', 'no-store, must-revalidate');
                    response.send(img.toBuffer());
                })
                .catch(function(error) {
                    console.error('Map view failed:', error);
                    response.status(500);
                    response.send(error);
                });
        });

        config.backend.router.get(
            '/visualize/room.html', function(request, response) {

            response.send(roomTemplate);
        });
    }
};
