require('famous-polyfills');
require('../../../src/core/famous.css');

var Engine = require('../../../src/core/Engine');
var Modifier = require('../../../src/core/Modifier');
var Surface = require('../../../src/core/Surface');

var surface = new Surface({
	properties: {
		background: 'blue'
	}
});

var modifier = new Modifier({
  	align: [0.5, 0.5],
  	origin: [0.5, 0.5],
  	size: [50, 50]
});

Engine.createContext().add(modifier).add(surface);