var test = require('tape');
var Time = require('../../helpers/Time');
Time.set(0);
var ScrollSync = require('../../../src/inputs/ScrollSync');

test('ScrollSync', function(t) {
    t.test('constructor', function(t) {
        t.plan(1);
        t.equal(typeof ScrollSync, 'function', 'ScrollSync should be a function');
    });

    t.test('start event', function(t) {
        t.plan(1);


    });
    
    // t.test('update event', function(t) {
    //     t.plan(1);
    // });

    // t.test('end event', function(t) {
    //     t.plan(1);
    // });
});
