var test = require('tape');
var Transitionable = require('../../../src/transitions/Transitionable');
var SpringTransition = require('../../../src/transitions/SpringTransition');
var WallTransition = require('../../../src/transitions/WallTransition');
var SnapTransition = require('../../../src/transitions/SnapTransition');

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
        	t.equal(transitionable.get(), arg, 'Engine constructor should set intial state');
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
		var transitionable = new Transitionable();
	    t.equal(typeof transitionable.set, 'function', 'transitionable.set should be a function');

	    transitionable.set(0);
	    t.equal(transitionable.get(), 0, 'Transitionable.set should set state');

	    transitionable.set(1);
	    t.equal(transitionable.get(), 1, 'Transitionable.set should set state');

	    transitionable.set(2);
	    t.equal(transitionable.get(), 2, 'Transitionable.set should set state');

	    t.end();
    });

    t.test('reset method', function(t) {
		var transitionable = new Transitionable();
	    t.equal(typeof transitionable.reset, 'function', 'transitionable.reset should be a function');

	    // TODO
	    var transitionable = new Transitionable();
	    transitionable.set(0);
	    // transitionable.reset();
	    // t.equal(transitionable.get(), 0, 'Transitionable.reset should reset state if transition is active');

	    // transitionable.set(1, { duration: 100 });

	    // transitionable.reset();
	    // t.equal(transitionable.get(), 0, 'Transitionable.reset should reset state');

	    t.end();
    });

    t.test('delay method', function(t) {
		var transitionable = new Transitionable();
	    t.equal(typeof transitionable.delay, 'function', 'transitionable.delay should be a function');

	    var transitionable = new Transitionable(0);
	    transitionable
	    t.end();
    });

    t.test('get method', function(t) {
		var transitionable = new Transitionable();
	    t.equal(typeof transitionable.get, 'function', 'transitionable.get should be a function');
	    t.end();
    });

    t.test('isActive method', function(t) {
    	t.plan(1);
        var transitionable = new Transitionable();
	    t.equal(typeof transitionable.isActive, 'function', 'transitionable.isActive should be a function');

	    // var transitionable = new Transitionable(0);
	    // t.notOk(transitionable.isActive());

	    // transitionable.set(1, { duration: 100 }, function() {
	    // 	console.log('boom');
		//     t.notOk(transitionable.isActive());
	    // });
		// t.ok(transitionable.isActive());
    });

    t.test('halt method', function(t) {
        t.plan(2);
		var transitionable = new Transitionable();
	    t.equal(typeof transitionable.halt, 'function', 'transitionable.halt should be a function');

	    var transitionable = new Transitionable(0);
	    transitionable.set(1, { duration: 500 });

	    setTimeout(function() {
		    transitionable.halt()
		    t.equal(~~(0.5 - transitionable.get()), 0, 'transitionable.halt should halt transition');
	    }, 250);
    });
});



//     /**
//      * Cancel all transitions and reset to a stable state
//      *
//      * @method reset
//      *
//      * @param {number|Array.Number|Object.<number, number>} startState
//      *    stable state to set to
//      */
//     Transitionable.prototype.reset = function reset(startState, startVelocity) {
//         this._currentMethod = null;
//         this._engineInstance = null;
//         this._callback = undefined;
//         this.state = startState;
//         this.velocity = startVelocity;
//         this.currentAction = null;
//         this.actionQueue = [];
//         this.callbackQueue = [];
//     };

//     /**
//      * Add delay action to the pending action queue queue.
//      *
//      * @method delay
//      *
//      * @param {number} duration delay time (ms)
//      * @param {function} callback Zero-argument function to call on observed
//      *    completion (t=1)
//      */
//     Transitionable.prototype.delay = function delay(duration, callback) {
//         this.set(this.get(), {duration: duration,
//             curve: function() {
//                 return 0;
//             }},
//             callback
//         );
//     };

//     /**
//      * Get interpolated state of current action at provided time. If the last
//      *    action has completed, invoke its callback.
//      *
//      * @method get
//      *
//      * @param {number=} timestamp Evaluate the curve at a normalized version of this
//      *    time. If omitted, use current time. (Unix epoch time)
//      * @return {number|Object.<number|string, number>} beginning state
//      *    interpolated to this point in time.
//      */
//     Transitionable.prototype.get = function get(timestamp) {
//         if (this._engineInstance) {
//             if (this._engineInstance.getVelocity)
//                 this.velocity = this._engineInstance.getVelocity();
//             this.state = this._engineInstance.get(timestamp);
//         }
//         return this.state;
//     };

//     /**
//      * Is there at least one action pending completion?
//      *
//      * @method isActive
//      *
//      * @return {boolean}
//      */
//     Transitionable.prototype.isActive = function isActive() {
//         return !!this.currentAction;
//     };

//     /**
//      * Halt transition at current state and erase all pending actions.
//      *
//      * @method halt
//      */
//     Transitionable.prototype.halt = function halt() {
//         return this.set(this.get());
//     };

//     module.exports = Transitionable;
// });
