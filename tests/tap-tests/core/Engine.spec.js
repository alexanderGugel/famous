var test = require('tape');
var Engine = require('../../../src/core/Engine');
var Context = require('../../../src/core/Context');

// The following tests aren't really unit tests, since Engine is a singleton and needs to be cleaned up afer each test.
// This leads to the usage of deregisterContext, which is assumed to be working.
test('Engine', function(t) {
	t.test('pipe method', function (t) {
		t.equal(typeof Engine.unpipe, 'function', 'Engine.pipe should be a function');

		// Delegates to EventHandler, no need to test here

		t.end();
	});

	t.test('unpipe method', function(t) {
		t.equal(typeof Engine.unpipe, 'function', 'Engine.unpipe should be a function');

		// Delegates to EventHandler, no need to test here

		t.end();
	});

	t.test('on method', function(t) {
		t.equal(typeof Engine.on, 'function', 'Engine.on should be a function');

		Engine.on('blabla', function () {
			t.pass('Engine.on should invoke function when event is has been emitted');
		});

		Engine.emit('blabla');

		t.end();
	});

	t.test('emit method', function(t) {
		t.equal(typeof Engine.emit, 'function', 'Engine.emit should be a function');


		// Tested in EventHandler

		t.end();
	});

	t.test('removeListener method', function(t) {
		t.equal(typeof Engine.removeListener, 'function', 'Engine.removeListener should be a function');
		t.end();
	});

	t.test('getFPS method', function(t) {
		t.equal(typeof Engine.getFPS, 'function', 'Engine.getFPS should be a function');

		t.equal(typeof Engine.getFPS(), 'number', 'Engine.getFPS should return number');
		t.end();
	});

	t.test('setFPSCap method', function(t) {
		t.plan(2);
		t.equal(typeof Engine.setFPSCap, 'function', 'Engine.setFPSCap should be a function');

		Engine.setFPSCap(10);

		setTimeout(function() {
			t.ok((10 - Engine.getFPS()) < 3);

			Engine.removeFPSCap();
		}, 100);
	});

	t.test('removeFPSCap method', function(t) {
		Engine.setFPSCap(10);
		Engine.removeFPSCap();
		t.notEqual(Engine.getFPS(), 10, 'Engine.removeFPSCap should remove previously set FPS cap');

		t.end();
	});
	
	t.test('getOptions method', function(t) {
		t.equal(typeof Engine.getOptions, 'function', 'Engine.getOptions should be a function');

		Engine.setOptions({
			bla: 'blub'
		});

		t.equal(Engine.getOptions().bla, 'blub', 'Engine.getOptions should return previously via setOptions set options');

		t.end();
	});

	t.test('setOptions method', function(t) {
		t.equal(typeof Engine.setOptions, 'function', 'Engine.setOptions should be a function');

		t.doesNotThrow(function() {
			Engine.setOptions({
				bla: 'blub'
			});
		});

		t.end();
	});

	t.test('createContext method', function(t) {
		t.equal(typeof Engine.createContext, 'function', 'Engine.createContext should be a function');

		// var c1 = Engine.createContext();
		// t.ok(c1 instanceof Context, 'Engine.createContext should return Context');

		// var el = document.createElement('div');
		// var c2 = new Context(el);

		// Engine.deregisterContext(c1);
		// Engine.deregisterContext(c2);

		t.end();
	});

	t.test('registerContext method', function(t) {
		t.equal(typeof Engine.registerContext, 'function', 'Engine.registerContext should be a function');

		// TODO bug in famous
		// setTimeout(function() {
			// var c = new Context();

    		// t.end();
		// }, 100);
		// Engine.registerContext(c);
		// Engine.deregisterContext(c);

		t.end();
	});

	t.test('deregisterContext method', function(t) {
		t.equal(typeof Engine.deregisterContext, 'function', 'Engine.deregisterContext should be a function');

		var context = Engine.createContext();
		t.equal(Engine.getContexts().length, 1, 'Engine.deregisterContext needs one context before it can be deregistered');

		Engine.deregisterContext(context);
		t.equal(Engine.getContexts().length, 0, 'Engine.deregisterContext should result into one less context to be returned by getContexts');	

		t.end();
	});

	t.test('getContexts method', function(t) {
		t.equal(typeof Engine.getContexts, 'function', 'Engine.getContexts should be a function');

		var c1 = Engine.createContext();
		var c2 = Engine.createContext();
		var c3 = Engine.createContext();

		t.equal(Engine.getContexts()[0], c1);
		t.equal(Engine.getContexts()[1], c2);
		t.equal(Engine.getContexts()[2], c3);

		Engine.deregisterContext(c1);
		Engine.deregisterContext(c2);
		Engine.deregisterContext(c3);

		t.end();
	});

	t.test('nextTick method', function(t) {
		t.plan(2);
		t.equal(typeof Engine.nextTick, 'function', 'Engine.nextTick should be a function');

		Engine.nextTick(function() {
			t.pass('Engine.nextTick invoked function');
		});
	});

	t.test('defer method', function(t) {
		t.plan(2);
		t.equal(typeof Engine.defer, 'function', 'Engine.defer should be a function');

		Engine.defer(function() {
			t.pass('Engine.nextTick invoked function');
		});
	});
});
