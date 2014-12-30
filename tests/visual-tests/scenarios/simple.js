require('famous-polyfills');

var Engine = require('../../../src/core/Engine');
var Modifier = require('../../../src/core/Modifier');
var Surface = require('../../../src/core/Surface');

var surface = new Surface({
	properties: {
		background: 'red'
	},
	size: [50, 50]
});

var modifier = new Modifier({
  align: [0.5, 0.5],
  origin: [0.5, 0.5]
});

Engine.createContext().add(modifier).add(surface);