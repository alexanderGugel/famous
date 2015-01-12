// DONE

var test = require('tape');
var Time = require('../../helpers/Time');
var Touch = require('../../helpers/Touch');
Time.set(100);
var TwoFingerSync = require('../../../src/inputs/TwoFingerSync');

test('TwoFingerSync', function(t) {
    t.test('constructor', function(t) {
        t.plan(1);
        t.equal(typeof TwoFingerSync, 'function', 'TwoFingerSync should be a function');
    });

    t.test('calculateAngle function', function(t) {
        t.plan(1);
        t.equal(TwoFingerSync.calculateAngle([0, 0], [-Math.PI, 0]), Math.PI);
    });

    t.test('calculateDistance function', function(t) {
        t.plan(1);
        t.equal(TwoFingerSync.calculateDistance([0, 0], [1, 1]), Math.sqrt(2));
    });

    t.test('calculateCenter function', function(t) {
        t.plan(1);
        t.deepEqual(TwoFingerSync.calculateCenter([0, 0], [2, 2]), [1, 1]);
    });

    t.test('_startUpdate call', function(t) {
        t.plan(2);

        var twoFingerSync = new TwoFingerSync();
        t.equal(twoFingerSync._startUpdate, undefined, 'twoFingerSync._startUpdate should be protected');
        twoFingerSync._startUpdate = function() {
            t.pass('twoFingerSync should call _startUpdate function on start event');
        };

        twoFingerSync._eventInput.emit('touchstart', {
            changedTouches: [new Touch(1, 2), new Touch(4, 5)]
        });
    });

    t.test('_moveUpdate call', function(t) {
        t.plan(3);

        var twoFingerSync = new TwoFingerSync();
        t.equal(twoFingerSync._moveUpdate, undefined, 'twoFingerSync._endUpdate should be protected');
        twoFingerSync._startUpdate = function() {};
        twoFingerSync._moveUpdate = function(diffTime) {
            t.equal(diffTime, 100);
            t.pass('twoFingerSync should call _moveUpdate function on move event');
        };

        Time.set(0);

        twoFingerSync._eventInput.emit('touchstart', {
            changedTouches: [new Touch(1, 1, 1), new Touch(4, 5, 1)]
        });

        Time.set(100);
        twoFingerSync._eventInput.emit('touchmove', {
            changedTouches: [new Touch(2, 3, 1), new Touch(5, 6, 1)]
        });
    });

    t.test('end event', function(t) {
        t.plan(4);
        var twoFingerSync = new TwoFingerSync();
        twoFingerSync._startUpdate = function(){ };
        twoFingerSync._moveUpdate = function(){ };

        twoFingerSync.on('end', function(event) {
            t.pass('twoFingerSync should emit end event on touchend and touchcancel');
            t.deepEqual(event.touches, [1, 2]);
        });

        Time.set(0);

        twoFingerSync._eventInput.emit('touchstart', {
            changedTouches: [new Touch(1, 1, 1), new Touch(4, 5, 2)]
        });

        Time.set(100);

        twoFingerSync._eventInput.emit('touchend', {
            changedTouches: [new Touch(1, 1, 1), new Touch(4, 5, 2)]
        });

        Time.set(200);

        twoFingerSync._eventInput.emit('touchstart', {
            changedTouches: [new Touch(1, 1, 1), new Touch(4, 5, 2)]
        });

        Time.set(300);

        twoFingerSync._eventInput.emit('touchcancel', {
            changedTouches: [new Touch(1, 1, 1), new Touch(4, 5, 2)]
        });
    });
});
