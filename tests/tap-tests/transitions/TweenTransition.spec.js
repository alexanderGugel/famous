var test = require('tape');
var TweenTransition = require('../../../src/transitions/TweenTransition');

test('TweenTransition', function(t) {
    t.test('constructor', function(t) {
        t.equal(typeof TweenTransition, 'function', 'TweenTransition should be a function');

        var args = [undefined, 2, [1, 2],
            [1, 2, 3]
        ];

        t.doesNotThrow(function() {
            args.forEach(function(arg) {
                new TweenTransition(arg);
            });
        }, 'TweenTransition constructor should not throw an error');
        t.end();
    });

    t.test('registerCurve, getCurve, getCurves, unregisterCurve methods', function(t) {
        t.equal(typeof TweenTransition.registerCurve, 'function', 'TweenTransition.registerCurve should be a function');
        t.equal(typeof TweenTransition.getCurve, 'function', 'TweenTransition.getCurve should be a function');
        t.equal(typeof TweenTransition.getCurves, 'function', 'TweenTransition.getCurves should be a function');
        t.equal(typeof TweenTransition.unregisterCurve, 'function', 'TweenTransition.unregisterCurve should be a function');

        var fns = [function(t) {
            return t;
        }, function(t) {
            return Math.pow(t, 2);
        }];

        fns.forEach(function(fn, i) {
            TweenTransition.registerCurve('fn ' + i, fn);
        });

        fns.forEach(function(fn, i) {
            t.equal(TweenTransition.getCurve('fn ' + i), fn);
        });

        var registeredCurves = TweenTransition.getCurves();
        t.equal(typeof registeredCurves, 'object');
        fns.forEach(function(fn, i) {
            t.equal(registeredCurves['fn ' + i], fn);
        });

        fns.forEach(function(fn, i) {
            TweenTransition.unregisterCurve('fn ' + i);
        });

        fns.forEach(function(fn, i) {
            t.throws(function() {
                TweenTransition.getCurve('fn ' + i)
            }, /not registered/);
        });

        t.end();
    });

    t.test('getCurve method: default curves should be registered', function(t) {
        var defaultCurves = 'linear easeIn easeOut easeInOut easeOutBounce spring'.split(' ');
        defaultCurves.forEach(function(curveName) {
            t.equal(typeof TweenTransition.getCurve(curveName), 'function');
        });
        t.end();
    });

    t.test('set and get methods', function(t) {
        t.plan(4);
        var tweenTransition = new TweenTransition();
        t.equal(typeof tweenTransition.set, 'function', 'tweenTransition.set should be a function');
        t.equal(typeof tweenTransition.get, 'function', 'tweenTransition.get should be a function');

        tweenTransition.set(1);
        t.equal(tweenTransition.get(1), 1);

        tweenTransition.set(1, { duration: 500 });

        setTimeout(function() {
            t.equal(tweenTransition.get(1), 1);
        }, 600);
    });

    t.test('get method with time as argument', function(t) {
        t.plan(2);
        var tweenTransition = new TweenTransition();
        var now = Date.now();
        tweenTransition.set(1, { duration: 200 });
        t.equal(tweenTransition.get(now + 100), 100/200);
        t.equal(tweenTransition.get(now + 150), 150/200);
    });

    t.test('isActive method', function(t) {
        t.plan(4);
        var tweenTransition = new TweenTransition();
        t.equal(typeof tweenTransition.isActive, 'function', 'tweenTransition.isActive should be a function');

        tweenTransition.set(0);
        tweenTransition.set(1, { duration: 500 });
        t.ok(tweenTransition.isActive());

        setTimeout(function() {
            t.equal(tweenTransition.isActive(), true);
        }, 100);
        
        setTimeout(function() {
            tweenTransition.reset();
            t.equal(tweenTransition.isActive(), false);
        }, 700);
    });

    t.test('reset method', function(t) {
        t.plan(2);
        var tweenTransition = new TweenTransition();
        t.equal(typeof tweenTransition.reset, 'function', 'tweenTransition.reset should be a function');

        tweenTransition.set(1, { duratio: 500 });
        tweenTransition.reset();
        t.equal(tweenTransition.get(), undefined);
    });

    t.test('halt method', function(t) {
        t.plan(2);
        var tweenTransition = new TweenTransition();
        t.equal(typeof tweenTransition.halt, 'function', 'tweenTransition.halt should be a function');
        tweenTransition.set([0, 0, 0]);
        tweenTransition.set([1, 2, 3], { duration: 100 });
        setTimeout(function() {
            tweenTransition.halt();
            var value1 = tweenTransition.get();
            var value2 = tweenTransition.get();
            t.deepEqual(value1, value2);
        }, 50);
    });

    t.test('setOptions method', function(t) {
        t.plan(4);
        var tweenTransition = new TweenTransition();
        t.equal(typeof tweenTransition.setOptions, 'function', 'tweenTransition.setOptions should be a function');

        t.test('curve option', function(t) {
            t.plan(1);
            var tweenTransition = new TweenTransition();
            tweenTransition.setOptions({
                curve: function(t) { return 0.1234; }
            });
            tweenTransition.set(1, { duration: 20 });
            setTimeout(function() {
                t.equal(tweenTransition.get(), 0.1234);
            }, 10);
        });

        t.test('duration option', function(t) {
            t.plan(2);
            var tweenTransition = new TweenTransition();
            tweenTransition.setOptions({
                duration: 100
            });
            // tweenTransition.set(1); doesn't work
            tweenTransition.set(1, {});
            setTimeout(function() {
                t.equal(tweenTransition.get() < 1, true);
            }, 50);
            setTimeout(function() {
                t.equal(tweenTransition.get(), 1);
            }, 150);
        });

        t.test('speed option', function(t) {
            t.plan(1);
            var tweenTransition = new TweenTransition();
            tweenTransition.setOptions({
                speed: 100
            });

            tweenTransition.set(0);
            tweenTransition.set(1, {
                curve: function(t) { return t; },
                duration: 1000
            });

            setTimeout(function() {
                t.equal(tweenTransition.get(), 1);
            }, 100);
        });
    });

    t.test('customCurve method', function(t) {
        t.plan(1);
        t.equal(typeof TweenTransition.customCurve, 'function', 'TweenTransition.customCurve should be a function');
    });
});
