var test = require('tape');
var Transitionable = require('../../../src/transitions/Transitionable');
var SpringTransition = require('../../../src/transitions/SpringTransition');
var WallTransition = require('../../../src/transitions/WallTransition');
var Engine = require('../../../src/core/Engine');

test('Transitionable', function(t) {
    t.test('constructor', function(t) {
        t.equal(typeof Transitionable, 'function', 'Transitionable should be a function');

        var args = [ undefined, 2, [1, 2], [1, 2, 3] ];

        t.doesNotThrow(function() {
            args.forEach(function(arg) {
                new Transitionable(arg);
            });
        }, 'Transitionable constructor should not throw an error');

        args.forEach(function(arg) {
            var transitionable = new Transitionable(arg);
            t.equal(transitionable.get(), arg, 'Transitionable constructor should set intial state');
        });

        t.end();
    });

    t.test('register method', function(t) {
        t.equal(typeof Transitionable.register, 'function', 'Transitionable.register should be a function');

        Transitionable.register({
            spring: SpringTransition,
            wall: WallTransition
        });

        t.equal(Transitionable.registerMethod('spring', SpringTransition), false, 'Transitionable.register should work the same as registerMethod');
        t.equal(Transitionable.registerMethod('wall', WallTransition), false, 'Transitionable.register should work the same as registerMethod');

        Transitionable.unregisterMethod('spring');
        Transitionable.unregisterMethod('wall');
        t.end();
    });

    t.test('registerMethod method', function(t) {
        t.equal(typeof Transitionable.registerMethod, 'function', 'Transitionable.registerMethod should be a function');
        t.equal(Transitionable.registerMethod('spring', SpringTransition), true, 'Transitionable.registerMethod should only work once');
        t.equal(Transitionable.registerMethod('spring', SpringTransition), false, 'Transitionable.registerMethod should only work once');
        Transitionable.unregisterMethod('spring');
        t.end();
    });

    t.test('unregisterMethod method', function(t) {
        t.equal(typeof Transitionable.unregisterMethod, 'function', 'Transitionable.unregisterMethod should be a function');
        Transitionable.registerMethod('spring', SpringTransition);
        t.equal(Transitionable.unregisterMethod('spring'), true, 'Transitionable.unregisterMethod should return true if successful');
        t.equal(Transitionable.unregisterMethod('spring'), false, 'Transitionable.unregisterMethod should only work once');
        t.equal(Transitionable.registerMethod('spring', SpringTransition), true, 'Transitionable.unregisterMethod should reverse Transitionable.registerMethod');
        t.end();
    });

    t.test('set method', function(t) {
        t.plan(5);
        var transitionable = new Transitionable();
        t.equal(typeof transitionable.set, 'function', 'transitionable.set should be a function');

        transitionable.set(0);
        t.equal(transitionable.get(), 0, 'Transitionable.set should set state');

        transitionable.set(1);
        t.equal(transitionable.get(), 1, 'Transitionable.set should set state');

        transitionable.set(2);
        t.equal(transitionable.get(), 2, 'Transitionable.set should set state');

        var callback = function() {
            t.pass('Transitionable.set should accept and invoke callback function');
        };

        // TODO broken in current famous?
        // Callback SHOULD be called twice
        transitionable.set(4, { duration: 500 }, callback);
        transitionable.set(4, undefined, callback);
    });

    t.test('reset method', function(t) {
        var transitionable = new Transitionable();
        t.equal(typeof transitionable.reset, 'function', 'transitionable.reset should be a function');

        transitionable.set(0);
        transitionable.set(1, { duration: 500 });
        transitionable.reset();
        t.equal(transitionable.get(), undefined, 'Transitionable.reset should reset state if transition is active');

        t.end();
    });

    t.test('delay method', function(t) {
        t.plan(3);
        var transitionable = new Transitionable();
        t.equal(typeof transitionable.delay, 'function', 'transitionable.delay should be a function');

        transitionable.set(0);
        transitionable.delay(500);
        t.equal(transitionable.get(), 0, 'transitionable.delay should delay the execution of the action queue');
        transitionable.set(1);
        t.equal(transitionable.get(500), 1, 'transitionable.delay should delay the execution of the action queue');
    });

    t.test('get method', function(t) {
        var transitionable = new Transitionable();
        t.equal(typeof transitionable.get, 'function', 'transitionable.get should be a function');
        transitionable.set(4);
        t.equal(transitionable.get(), 4, 'transitionable.get should return previously set value');
        transitionable.set(2);
        t.equal(transitionable.get(), 2, 'transitionable.get should return previously set value');
        t.end();
    });

    t.test('isActive method', function(t) {
        t.plan(4);
        var transitionable = new Transitionable();
        t.equal(typeof transitionable.isActive, 'function', 'transitionable.isActive should be a function');

        t.equal(transitionable.isActive(), false, 'transitionable.isActive should return false if transition is not active');

        transitionable.set(1, { duration: 100 });
        t.equal(transitionable.isActive(), true, 'transitionable.isActive should return true if transition is active');

        transitionable.halt();
        t.equal(transitionable.isActive(), false, 'transitionable.isActive should return false if transition is not active');
    });

    t.test('halt method', function(t) {
        t.plan(2);
        var transitionable = new Transitionable();
        t.equal(typeof transitionable.halt, 'function', 'transitionable.halt should be a function');

        transitionable.set(1, { duration: 500 });

        setTimeout(function() {
            transitionable.halt();
            t.equal(~~(0.5 - transitionable.get()), 0, 'transitionable.halt should halt transition');
        }, 250);
    });
});
