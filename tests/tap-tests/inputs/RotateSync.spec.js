// 50% DONE
// TODO MockTwoFingerSync, event format

var test = require('tape');
var Time = require('../../helpers/Time');
Time.set(0);
var RotateSync = require('../../../src/inputs/RotateSync');

test('RotateSync', function(t) {
    t.test('constructor', function(t) {
        t.plan(1);
        t.equal(typeof RotateSync, 'function', 'RotateSync should be a function');
    });

    // t.test('start event', function(t) {
    //     t.plan(5);
    //     Time.set(0);
    //     var scaleSync = new RotateSync();
    //     scaleSync.posA = [1, 2];
    //     scaleSync.posB = [3, 4];
    //     scaleSync.touchAId = 4;
    //     scaleSync.touchBId = 5;
    //     // Low-level eventing functionality is being tested in TwoFingerSync.spec.js
    //     scaleSync.on('start', function(actualEvent) {
    //         t.equal(actualEvent.count, 2);
    //         t.deepEqual(actualEvent.touches, [4, 5]);
    //         // tested in TwoFingerSync
    //         t.equal(Array.isArray(actualEvent.center), true);
    //         t.equal(typeof actualEvent.distance, 'number');
    //         t.pass('scaleSync should emit update event');
    //     });
    //     scaleSync._startUpdate({
    //         touches: [scaleSync.posA, scaleSync.posB]
    //     });
    // });
    
    // t.test('update event', function(t) {
    //     t.plan(1);
    //     Time.set(0);
    //     var scaleSync = new RotateSync();
    //     scaleSync.posA = [1, 2];
    //     scaleSync.posB = [3, 4];
    //     scaleSync.touchAId = 4;
    //     scaleSync.touchBId = 5;
    //     scaleSync.on('update', function() {
    //         // TODO test event format
    //         t.pass('scaleSync should emit update event');
    //     });
    //     scaleSync._moveUpdate(200);
    // });

    // t.test('end event', function(t) {
    //     t.plan(1);
    //     Time.set(0);
    //     var scaleSync = new RotateSync();
    //     scaleSync.on('end', function() {
    //         t.pass('scaleSync should emit end event');
    //     });
    // });
});
