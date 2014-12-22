var test = require('tape');
var EventEmitter = require('../../../src/core/EventEmitter');

test('EventEmitter', function(t) {
    t.test('constructor', function(t) {
        t.equal(typeof EventEmitter, 'function', 'EventEmitter should be a function');

        t.doesNotThrow(function() {
	        var eventEmitter = new EventEmitter();
        }, 'EventEmitter constructor should not throw an error');

        t.end();
    });

    t.test('emit method', function(t) {
        t.equal(typeof EventEmitter.prototype.emit, 'function', 'EventEmitter.emit should be a function');

        var eventEmitter = new EventEmitter();
        t.equal(eventEmitter.emit('test'), eventEmitter, 'EventEmitter.emit should be chainable');
        t.equal(eventEmitter.emit('test', {test: true}), eventEmitter, 'EventEmitter.emit should be chainable');

    	t.end();
    });

    t.test('on method', function(t) {
    	t.plan(3);
        t.equal(typeof EventEmitter.prototype.on, 'function', 'EventEmitter.on should be a function');

        var referenceEvent = {test: true, test: {test: true}};

        var eventEmitter = new EventEmitter();
        var listener = function(e) {
        	t.pass('EventEmitter should call listener function');
        	t.equal(e, referenceEvent, 'EventEmitter.on should retrieve correct event');
        };

        eventEmitter.on('test', listener);
        eventEmitter.emit('test', referenceEvent);
        eventEmitter.removeListener(listener);
    });

    t.test('addListener method', function(t) {
        t.equal(typeof EventEmitter.prototype.addListener, 'function', 'EventEmitter.addListener should be a function');
        t.equal(EventEmitter.prototype.addListener, EventEmitter.prototype.on, 'EventEmitter.addListener should be alias of EventEmitter.on');
        t.end();
    });

    t.test('removeListener method', function(t) {
    	t.plan(2);
        t.equal(typeof EventEmitter.prototype.removeListener, 'function', 'EventEmitter.removeListener should be a function');

        var counter = 0;
        var listener = function() {
        	if (counter++ === 0) {
	        	t.pass('EventEmitter should invoke function once');
        	} else {
        		t.fail('EventEmitter.removeListener should remove listener function');
        	}
        };

        var eventEmitter = new EventEmitter();
        eventEmitter.on('test', listener);
        eventEmitter.emit('test');
        eventEmitter.removeListener('test', listener);
    });

    t.test('bindThis method', function(t) {
    	t.plan(1);
    	var that = {
    		pass: function() {
    			t.pass('EventEmitter.bindThis should bind all listener functions to that');
    		}
    	};

    	var listener = function() {
    		this.pass();
    	};

    	var eventEmitter = new EventEmitter();
    	eventEmitter.bindThis(that);
    	eventEmitter.on('test', listener);
    	eventEmitter.emit('test');
    	eventEmitter.removeListener('test', listener);
    });
});
