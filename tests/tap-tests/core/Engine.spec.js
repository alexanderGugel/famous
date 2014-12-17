var test = require('tape');
var Engine = require('../../../src/core/Engine');
var Context = require('../../../src/core/Context');

test('Engine', function(t) {
	t.test('pipe method', function (t) {
		t.equal(typeof Engine.unpipe, 'function', 'Engine.pipe should be a function');
		t.end();
	});

	t.test('unpipe method', function(t) {
		t.equal(typeof Engine.unpipe, 'function', 'Engine.unpipe should be a function');
		t.end();
	});

	t.test('on method', function(t) {
		t.equal(typeof Engine.on, 'function', 'Engine.on should be a function');
		t.end();
	});

	t.test('emit method', function(t) {
		t.equal(typeof Engine.emit, 'function', 'Engine.emit should be a function');
		t.end();
	});

	t.test('removeListener method', function(t) {
		t.equal(typeof Engine.removeListener, 'function', 'Engine.removeListener should be a function');
		t.end();
	});

	t.test('getFPS method', function(t) {
		t.equal(typeof Engine.getFPS, 'function', 'Engine.getFPS should be a function');
		t.end();
	});

	t.test('setFPSCap method', function(t) {
		t.equal(typeof Engine.setFPSCap, 'function', 'Engine.setFPSCap should be a function');
		t.end();
	});
	
	t.test('getOptions method', function(t) {
		t.equal(typeof Engine.getOptions, 'function', 'Engine.getOptions should be a function');
		t.end();
	});

	t.test('setOptions method', function(t) {
		t.equal(typeof Engine.setOptions, 'function', 'Engine.setOptions should be a function');
		t.end();
	});

	t.test('createContext method', function(t) {
		t.equal(typeof Engine.createContext, 'function', 'Engine.createContext should be a function');
		t.end();
	});

	t.test('registerContext method', function(t) {
		t.equal(typeof Engine.registerContext, 'function', 'Engine.registerContext should be a function');
		t.end();
	});

	t.test('deregisterContext method', function(t) {
		t.equal(typeof Engine.deregisterContext, 'function', 'Engine.deregisterContext should be a function');
		t.end();
	});

	t.test('getContexts method', function(t) {
		t.equal(typeof Engine.getContexts, 'function', 'Engine.getContexts should be a function');
		t.end();
	});

	t.test('nextTick method', function(t) {
		t.equal(typeof Engine.nextTick, 'function', 'Engine.nextTick should be a function');
		t.end();
	});

	t.test('defer method', function(t) {
		t.equal(typeof Engine.defer, 'function', 'Engine.defer should be a function');
		t.end();
	});
});
