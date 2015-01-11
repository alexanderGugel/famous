var test = require('tape');
var EventHandler = require('../../../src/core/EventHandler')
var Time = require('../../helpers/Time');
Time.set(100);
var TwoFingerSync = require('../../../src/inputs/TwoFingerSync');

var Touch = (function() {
    var nextIdentifier = 0;
    return function(pageX, pageY, identifier) {
        return {
            pageX: pageX || 1,
            pageY: pageY || 1,
            identifier: (identifier || nextIdentifier++)
        };
    };
}());

test('TwoFingerSync', function(t) {
    t.test('constructor', function(t) {
        t.plan(1);
        t.equal(typeof TwoFingerSync, 'function', 'TwoFingerSync should be a function');
        var twoFingerSync = new TwoFingerSync();
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
        var _now = Date.now;

        t.plan(2);

        var twoFingerSync = new TwoFingerSync();
        t.equal(twoFingerSync._moveUpdate, undefined, 'twoFingerSync._endUpdate should be protected');
        twoFingerSync._startUpdate = function() {};
        twoFingerSync._moveUpdate = function() {
            t.pass('twoFingerSync should call _endUpdate function on start event');
        };

        Time.set(0);

        console.log(Date.now())
        twoFingerSync._eventInput.emit('touchstart', {
            changedTouches: [new Touch(1, 1, 1), new Touch(4, 5, 1)]
        });

        Time.set(100);
        twoFingerSync._eventInput.emit('touchmove', {
            changedTouches: [new Touch(2, 3, 1), new Touch(5, 6, 1)]
        });






    });
});


        // this._eventInput.on('touchstart', );
        // this._eventInput.on('touchmove', this.handleMove.bind(this));
        // this._eventInput.on('touchend', this.handleEnd.bind(this));
        // this._eventInput.on('touchcancel', this.handleEnd.bind(this));

