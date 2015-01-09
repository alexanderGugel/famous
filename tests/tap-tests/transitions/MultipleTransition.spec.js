var test = require('tape');
var MultipleTransition = require('../../../src/transitions/MultipleTransition');
var MockTransitionable = require('../../helpers/MockTransitionable');

test('MultipleTransition', function(t) {
    t.test('constructor', function(t) {
        t.plan(1);
        t.equal(typeof MultipleTransition, 'function', 'MultipleTransition should be a function');
    });

    t.test('get method', function(t) {
        t.plan(2);
        var multipleTransition = new MultipleTransition(MockTransitionable);
        t.equal(typeof multipleTransition.get, 'function', 'multipleTransition.get should be a function');

        var mockTransitionable = new MockTransitionable();

        multipleTransition.set([1, 2, 3], mockTransitionable, function() {
            t.deepEqual(multipleTransition.get(), [1, 2, 3], 'multipleTransition.set should set final state');
        });
    });
    
    t.test('set method', function(t) {
        t.plan(3);
        var multipleTransition = new MultipleTransition(MockTransitionable);
        t.equal(typeof multipleTransition.set, 'function', 'multipleTransition.set should be a function')

        var mockTransitionable1 = new MockTransitionable();
        multipleTransition.set([0, 0, 0], mockTransitionable1, function() {
            t.pass('multipleTransition.set should call callback function after transition is complete');
        });

        var mockTransitionable2 = new MockTransitionable();
        multipleTransition.set([1, 2, 3], mockTransitionable2, function() {
            t.pass('multipleTransition.set should work with consecutive states');
        });
    });
    
    t.test('reset method', function(t) {
        t.plan(1);
        var multipleTransition = new MultipleTransition();
        t.equal(typeof multipleTransition.reset, 'function', 'multipleTransition.reset should be a function');

        // TODO
    });
});
