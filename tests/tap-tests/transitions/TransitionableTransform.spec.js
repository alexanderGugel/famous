var test = require('tape');
var TransitionableTransform = require('../../../src/transitions/TransitionableTransform');

function _almost(array) {
    return array.map(function(number) {
        return Math.round(number*1000)/1000;
    });
}

test('TransitionableTransform', function(t) {
    t.test('constructor', function(t) {
        t.equal(typeof TransitionableTransform, 'function', 'TransitionableTransform should be a function');

        t.end();
    });

    t.test('setTranslate method', function(t) {
        t.plan(3);
        var transitionableTransform = new TransitionableTransform();
        t.equal(typeof transitionableTransform.setTranslate, 'function', 'transitionableTransform.setTranslate should be a function');

        var callback = function() {
            t.pass('transitionableTransform.setTranslate should accept and invoke callback function');
        };

        transitionableTransform.setTranslate(_almost([1, 2, 3]));
        t.deepEqual(_almost(transitionableTransform.get()), _almost([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 2, 3, 1]), 'transitionableTransform.setTranslate should correctly build the transform matrix');
        transitionableTransform.setTranslate(_almost([4, 5, 6]), { duration: 50 }, callback);
        setTimeout(function() {
            t.deepEqual(_almost(transitionableTransform.get()), _almost([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 2, 3, 1]), 'transitionableTransform.setTranslate should correctly build the transform matrix');
        }, 100);
    });

    t.test('setScale method', function(t) {
        t.plan(3);
        var transitionableTransform = new TransitionableTransform();
        t.equal(typeof transitionableTransform.setScale, 'function', 'transitionableTransform.setScale should be a function');

        var callback = function() {
            t.pass('transitionableTransform.setScale should accept and invoke callback function');
        };

        transitionableTransform.setScale(_almost([1, 2, 3]));
        t.deepEqual(_almost(transitionableTransform.get()), _almost([1, 0, 0, 0, 0, 2, 0, 0, 0, 0, 3, 0, 0, 0, 0, 1]), 'transitionableTransform.setScale should correctly build the transform matrix');
        transitionableTransform.setScale(_almost([4, 5, 6]), { duration: 50 }, callback);
        setTimeout(function() {
            t.deepEqual(_almost(transitionableTransform.get()), _almost([1, 0, 0, 0, 0, 2, 0, 0, 0, 0, 3, 0, 0, 0, 0, 1]), 'transitionableTransform.setScale should correctly build the transform matrix');
        }, 100);
    });

    t.test('setRotate method', function(t) {
        t.plan(3);
        var transitionableTransform = new TransitionableTransform();
        t.equal(typeof transitionableTransform.setRotate, 'function', 'transitionableTransform.setRotate should be a function');

        var callback = function() {
            t.pass('transitionableTransform.setRotate should accept and invoke callback function');
        };

        transitionableTransform.setRotate(_almost([Math.PI, Math.PI*0.5, Math.PI*0.3]));
        t.deepEqual(_almost(transitionableTransform.get()), _almost([3.599146639029984e-17, -0.8090169943749472, 0.5877852522924734, 0, -4.9538003630854574e-17, -0.5877852522924734, -0.8090169943749472, 0, 1, -7.498798913309288e-33, -6.123233995736766e-17, 0, 0, 0, 0, 1]), 'transitionableTransform.setRotate should correctly build the transform matrix');
        transitionableTransform.setRotate(_almost([4, 5, 6]), { duration: 100 }, callback);
        setTimeout(function() {
            t.deepEqual(_almost(transitionableTransform.get()), _almost([0, -0.809, 0.588, 0, 0, -0.588, -0.809, 0, 1, 0, 0, 0, 0, 0, 0, 1]), 'transitionableTransform.setRotate should correctly build the transform matrix');
        }, 200);
    });

    t.test('setSkew method', function(t) {
        t.plan(3);
        var transitionableTransform = new TransitionableTransform();
        t.equal(typeof transitionableTransform.setSkew, 'function', 'transitionableTransform.setSkew should be a function');

        var callback = function() {
            t.pass('transitionableTransform.setSkew should accept and invoke callback function');
        };

        transitionableTransform.setSkew(_almost([1, 2, 3]));
        t.deepEqual(_almost(transitionableTransform.get()), _almost([1, -2.185039863261519, 0, 0, -0.1425465430742778, 1, 0, 0, 0, 1.557407724654902, 1, 0, 0, 0, 0, 1]), 'transitionableTransform.setSkew should correctly build the transform matrix');
        transitionableTransform.setSkew(_almost([4, 5, 6]), { duration: 50 }, callback);
        setTimeout(function() {
            t.deepEqual(_almost(transitionableTransform.get()), _almost([1, -2.185, 0, 0, -0.143, 1, 0, 0, 0, 1.557, 1, 0, 0, 0, 0, 1]), 'transitionableTransform.setSkew should correctly build the transform matrix');
        }, 100);
    });

    t.test('integration test: multiple transitions', function(t) {
        var transitionableTransform;
        transitionableTransform = new TransitionableTransform();


        t.end();
    });
});
