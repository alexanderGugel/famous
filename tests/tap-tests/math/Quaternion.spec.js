var test = require('tape');
var Quaternion = require('../../../src/math/Quaternion');

test('Quaternion', function(t) {
    t.test('constructor', function(t) {
        t.equal(typeof Quaternion, 'function', 'Quaternion should be a function');

        t.doesNotThrow(function() {
	        new Quaternion(1, 2, 3, 4);
        }, 'Quaternion constructor should not throw an error');

        t.end();
    });

    t.test('add method', function(t) {
        t.plan(5);
        var quaternion = new Quaternion(Math.PI*0.5, 1, 2, 3);
        t.equal(typeof quaternion.add, 'function', 'quaternion.add should be a function');

        var summand = new Quaternion(Math.PI, 1, 2, 3);

        var sum = quaternion.add(summand);
        t.equal(sum.w, Math.PI*1.5);
        t.equal(sum.x, 2);
        t.equal(sum.y, 4);
        t.equal(sum.z, 6);
    });

    t.test('sub method', function(t) {
        t.plan(5);
        var quaternion = new Quaternion(Math.PI*0.2, 4, 5, 6);
        t.equal(typeof quaternion.sub, 'function', 'quaternion.sub should be a function');

        var subtrahend = new Quaternion(Math.PI, 1, 2, 3);

        var result = quaternion.sub(subtrahend);
        t.equal(result.w, -Math.PI*0.8);
        t.equal(result.x, 3);
        t.equal(result.y, 3);
        t.equal(result.z, 3);
   });

    t.test('scalarDivide method', function(t) {
        t.plan(5);
        var quaternion = new Quaternion(Math.PI*0.2, 4, 5, 6);
        t.equal(typeof quaternion.scalarDivide, 'function', 'quaternion.scalarDivide should be a function');

        var result = quaternion.scalarDivide(2);
        t.equal(result.w, Math.PI*0.1);
        t.equal(result.x, 2);
        t.equal(result.y, 2.5);
        t.equal(result.z, 3);
    });

    t.test('scalarMultiply method', function(t) {
        t.plan(5);
        var quaternion = new Quaternion(Math.PI*0.2, 4, 5, 6);
        t.equal(typeof quaternion.scalarMultiply, 'function', 'quaternion.scalarMultiply should be a function');

        var result = quaternion.scalarMultiply(2);
        t.equal(result.w, Math.PI*0.4);
        t.equal(result.x, 8);
        t.equal(result.y, 10);
        t.equal(result.z, 12);
    });

    t.test('multiply method', function(t) {
        t.plan(9);
        var quaternion = new Quaternion(Math.PI*0.2, 4, 5, 6);
        t.equal(typeof quaternion.multiply, 'function', 'quaternion.multiply should be a function');

        var result = quaternion.multiply(new Quaternion(0, 0, 0, 0));
        t.equal(result.w, 0);
        t.equal(result.x, 0);
        t.equal(result.y, 0);
        t.equal(result.z, 0);

        quaternion = new Quaternion(1, 2, 3, 4);
        result = quaternion.multiply(new Quaternion(1, 1, 1, 1));
        t.equal(result.w, -8);
        t.equal(result.x, 4);
        t.equal(result.y, 2);
        t.equal(result.z, 6);
    });
    
    t.test('rotateVector method', function(t) {
        t.plan(1);
        var quaternion = new Quaternion(Math.PI*0.2, 4, 5, 6);
        t.equal(typeof quaternion.rotateVector, 'function', 'quaternion.rotateVector should be a function');

        // TODO
    });
    
    t.test('inverse method', function(t) {
        t.plan(1);
        var quaternion = new Quaternion(Math.PI*0.2, 4, 5, 6);
        t.equal(typeof quaternion.inverse, 'function', 'quaternion.inverse should be a function');

        // TODO
    });
    
    t.test('negate method', function(t) {
        t.plan(2);
        var quaternion = new Quaternion(Math.PI*3, 4, 5, 6);
        t.equal(typeof quaternion.negate, 'function', 'quaternion.negate should be a function');

        t.deepEqual(quaternion.negate(), {w: -Math.PI*3, x: -4, y: -5, z: -6});
    });
    
    t.test('conj method', function(t) {
        t.plan(2);
        var quaternion = new Quaternion(Math.PI*0.5, 8, 1, 3);
        t.equal(typeof quaternion.conj, 'function', 'quaternion.conj should be a function');

        t.deepEqual(quaternion.conj(), {w: Math.PI*0.5, x: -8, y: -1, z: -3});
    });
    
    t.test('normalize method', function(t) {
        t.plan(1);
        var quaternion = new Quaternion(Math.PI*0.5, 8, 1, 3);
        t.equal(typeof quaternion.normalize, 'function', 'quaternion.normalize should be a function');

        // TODO
    });

    t.test('makeFromAngleAndAxis method', function(t) {
        t.plan(1);
        var quaternion = new Quaternion(Math.PI*0.5, 8, 1, 3);
        t.equal(typeof quaternion.makeFromAngleAndAxis, 'function', 'quaternion.makeFromAngleAndAxis should be a function');

        // TODO
    });

    t.test('setWXYZ method', function(t) {
        t.plan(1);
        var quaternion = new Quaternion(Math.PI*0.5, 8, 1, 3);
        t.equal(typeof quaternion.setWXYZ, 'function', 'quaternion.setWXYZ should be a function');

        // TODO
    });

    t.test('set method', function(t) {
       t.plan(1);
       var quaternion = new Quaternion(Math.PI*0.5, 8, 1, 3);
       t.equal(typeof quaternion.set, 'function', 'quaternion.setWXYZ should be a function');

       // TODO
    });

    t.test('put method', function(t) {
       t.plan(1);
       var quaternion = new Quaternion(Math.PI*0.5, 8, 1, 3);
       t.equal(typeof quaternion.put, 'function', 'quaternion.setWXYZ should be a function');

       // TODO
    });

    t.test('clone method', function(t) {
       t.plan(1);
       var quaternion = new Quaternion(Math.PI*0.5, 8, 1, 3);
       t.equal(typeof quaternion.clone, 'function', 'quaternion.setWXYZ should be a function');

       // TODO
    });

    t.test('clear method', function(t) {
       t.plan(1);
       var quaternion = new Quaternion(Math.PI*0.5, 8, 1, 3);
       t.equal(typeof quaternion.clear, 'function', 'quaternion.setWXYZ should be a function');

       // TODO
    });

    t.test('isEqual method', function(t) {
       t.plan(1);
       var quaternion = new Quaternion(Math.PI*0.5, 8, 1, 3);
       t.equal(typeof quaternion.isEqual, 'function', 'quaternion.setWXYZ should be a function');

       // TODO
    });

    t.test('dot method', function(t) {
       t.plan(1);
       var quaternion = new Quaternion(Math.PI*0.5, 8, 1, 3);
       t.equal(typeof quaternion.dot, 'function', 'quaternion.setWXYZ should be a function');

       // TODO
    });

    t.test('normSquared method', function(t) {
       t.plan(1);
       var quaternion = new Quaternion(Math.PI*0.5, 8, 1, 3);
       t.equal(typeof quaternion.normSquared, 'function', 'quaternion.setWXYZ should be a function');

       // TODO
    });

    t.test('norm method', function(t) {
       t.plan(1);
       var quaternion = new Quaternion(Math.PI*0.5, 8, 1, 3);
       t.equal(typeof quaternion.norm, 'function', 'quaternion.setWXYZ should be a function');

       // TODO
    });

    t.test('isZero method', function(t) {
       t.plan(1);
       var quaternion = new Quaternion(Math.PI*0.5, 8, 1, 3);
       t.equal(typeof quaternion.isZero, 'function', 'quaternion.setWXYZ should be a function');

       // TODO
    });

    t.test('getTransform method', function(t) {
       t.plan(1);
       var quaternion = new Quaternion(Math.PI*0.5, 8, 1, 3);
       t.equal(typeof quaternion.getTransform, 'function', 'quaternion.setWXYZ should be a function');

       // TODO
    });

    t.test('getMatrix method', function(t) {
       t.plan(1);
       var quaternion = new Quaternion(Math.PI*0.5, 8, 1, 3);
       t.equal(typeof quaternion.getMatrix, 'function', 'quaternion.setWXYZ should be a function');

       // TODO
    });

    t.test('slerp method', function(t) {
       t.plan(1);
       var quaternion = new Quaternion(Math.PI*0.5, 8, 1, 3);
       t.equal(typeof quaternion.slerp, 'function', 'quaternion.setWXYZ should be a function');

       // TODO
    });
});
