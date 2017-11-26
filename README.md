# screepsmod-visualize
Mod for the [screeps](https://github.com/screeps/screeps) server to provide
basic room visualization.

[![NPM info](https://nodei.co/npm/screepsmod-visualize.png)](https://npmjs.org/package/screepsmod-visualize)

## Installation
* `npm install screepsmod-visualize`
* Add to `mods.json` or check that it was added automatically
* Restart the server

## Usage
After starting a server, navigate to (assuming local server and default port)
`http://localhost:21025/api/visualize/room.html?room=<room_id>`. It will show
an auto-refreshing map view of the room. The graphics are very basic and only
allow you to get a basic idea of the layout and positions, the colors for
objects are random at the moment. Pull requests are welcome.
