var test = require('tape');
var EventHandler = require('../../../src/core/EventHandler');
var EventEmitter = require('../../../src/core/EventEmitter');

test('EventHandler', function(t) {
    t.test('constructor', function(t) {
        t.equal(typeof EventHandler, 'function', 'EventHandler should be a function');

        t.doesNotThrow(function() {
            var eventHandler = new EventHandler();
        }, 'EventHandler constructor should not throw an error');

        t.end();
    });

    t.test('EventEmitter methods', function(t) {
        var eventHandler = new EventHandler();
        var eventEmitter = new EventEmitter()
        for (var prop in eventEmitter) {
            if (typeof prop === 'function') {
                t.ok(eventHandler[prop], 'EventEmitter should have all methods of EventEmitter, including ' + prop);
            }
        }
        t.end();
    });

    t.test('setInputHandler method', function(t) {
        t.plan(2);
        t.equal(typeof EventHandler.setInputHandler, 'function', 'EventHandler.setInputHandler should be a function');

        var inputHandler = new EventHandler();
        var eventHandler = new EventHandler();

        EventHandler.setInputHandler(inputHandler, eventHandler);

        var exampleEvent = {};
        eventHandler.on('boom', function(actualEvent) {
            t.equal(actualEvent, exampleEvent, 'EventHandler.setInputHandler should bind the object\'s trigger method to the handler');
        });

        inputHandler.trigger('boom', exampleEvent);
    });

    t.test('setOutputHandler method', function(t) {
        t.plan(2);
        t.equal(typeof EventHandler.setOutputHandler, 'function', 'EventHandler.setOutputHandler should be a function');

        var outputHandler = new EventHandler();
        var receivingEventHandler = new EventHandler();

        EventHandler.setOutputHandler(receivingEventHandler, outputHandler);

        var exampleEvent = {};
        receivingEventHandler.on('boom', function(actualEvent) {
            t.equal(actualEvent, exampleEvent, 'EventHandler.setOutputHandler should bind the object\'s output handler functions method to the handler');
        });

        outputHandler.pipe(receivingEventHandler);
        outputHandler.trigger('boom', exampleEvent);
    });

    t.test('pipe method', function(t) {
        t.plan(2);
        var eventHandler = new EventHandler();
        t.equal(typeof eventHandler.pipe, 'function', 'eventHandler.pipe should be a function');

        var receivingEventHandler = new EventHandler();
        var emittingEventHandler = new EventHandler();

        emittingEventHandler.pipe(receivingEventHandler);

        var exampleEvent = {};
        receivingEventHandler.on('boom', function(receivedEvent) {
            t.equal(receivedEvent, exampleEvent, 'eventHandler.pipe should forward all events to downstream eventHandlers');
        });
        emittingEventHandler.emit('boom', exampleEvent);
    });

    t.test('unpipe method', function(t) {
        t.plan(1);
        var eventHandler = new EventHandler();
        t.equal(typeof eventHandler.unpipe, 'function', 'eventHandler.unpipe should be a function');

        var receivingEventHandler = new EventHandler();
        var emittingEventHandler = new EventHandler();

        emittingEventHandler.pipe(receivingEventHandler);
        emittingEventHandler.unpipe(receivingEventHandler);

        receivingEventHandler.on('boom', function() {
            t.fail('eventHandler.unpipe should reverse eventHandler.pipe');
        });

        emittingEventHandler.emit('boom');
    });

    t.test('emit method', function(t) {
        t.plan(2);
        var eventHandler = new EventHandler();
        t.equal(typeof eventHandler.emit, 'function', 'eventHandler.emit should be a function');

        var exampleEvent = {};

        eventHandler.on('boom', function(receivedEvent) {
            t.equal(receivedEvent, exampleEvent, 'eventHandler.emit listener function should receive emitted event');
        });

        eventHandler.emit('boom');
    });

    t.test('trigger method', function(t) {
        t.plan(2);
        var eventHandler = new EventHandler();
        t.equal(typeof eventHandler.trigger, 'function', 'eventHandler.trigger should be a function');
        t.equal(eventHandler.trigger, eventHandler.emit, 'eventHandler.trigger should be an alias of eventHandler.emit');
    });

    t.test('on', function(t) {
        t.plan(4);
        var eventHandler = new EventHandler();
        t.equal(typeof eventHandler.on, 'function', 'eventHandler.on should be a function');

        var events = [];

        for (var i = 0; i < 3; i++) {
            events[i] = {};
            eventHandler.on('event' + i, function(e) {
                t.equal(e, events[i]);
            });
        }

        for (i = 0; i < 3; i++) {
            eventHandler.emit('event' + i, events[i]);
        }
    });

    // TODO
});


//     /**
//      * Bind a callback function to an event type handled by this object.
//      *
//      * @method "on"
//      *
//      * @param {string} type event type key (for example, 'click')
//      * @param {function(string, Object)} handler callback
//      * @return {EventHandler} this
//      */
//     EventHandler.prototype.on = function on(type, handler) {
//         EventEmitter.prototype.on.apply(this, arguments);
//         if (!(type in this.upstreamListeners)) {
//             var upstreamListener = this.trigger.bind(this, type);
//             this.upstreamListeners[type] = upstreamListener;
//             for (var i = 0; i < this.upstream.length; i++) {
//                 this.upstream[i].on(type, upstreamListener);
//             }
//         }
//         return this;
//     };

//     /**
//      * Alias for "on"
//      * @method addListener
//      */
//     EventHandler.prototype.addListener = EventHandler.prototype.on;

//     /**
//      * Listen for events from an upstream event handler.
//      *
//      * @method subscribe
//      *
//      * @param {EventEmitter} source source emitter object
//      * @return {EventHandler} this
//      */
//     EventHandler.prototype.subscribe = function subscribe(source) {
//         var index = this.upstream.indexOf(source);
//         if (index < 0) {
//             this.upstream.push(source);
//             for (var type in this.upstreamListeners) {
//                 source.on(type, this.upstreamListeners[type]);
//             }
//         }
//         return this;
//     };

//     /**
//      * Stop listening to events from an upstream event handler.
//      *
//      * @method unsubscribe
//      *
//      * @param {EventEmitter} source source emitter object
//      * @return {EventHandler} this
//      */
//     EventHandler.prototype.unsubscribe = function unsubscribe(source) {
//         var index = this.upstream.indexOf(source);
//         if (index >= 0) {
//             this.upstream.splice(index, 1);
//             for (var type in this.upstreamListeners) {
//                 source.removeListener(type, this.upstreamListeners[type]);
//             }
//         }
//         return this;
//     };

//     module.exports = EventHandler;
// });
