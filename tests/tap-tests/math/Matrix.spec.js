var test = require('tape');
var Matrix = require('../../../src/math/Matrix');
var Vector = require('../../../src/math/Vector');

test('Matrix', function(t) {
    t.test('constructor', function(t) {
        var m = new Matrix();

        var desiredMethods = ['get', 'set', 'vectorMultiply', 'multiply', 'transpose', 'clone'];
        for (var i = 0; i < desiredMethods.length; i++) {
            var methodName = desiredMethods[i];
            t.equals(typeof m[methodName], 'function', 'Matrix should have ' + methodName + ' method');
        }

        t.end();
    });

    t.test('get method', function(t) {
        t.equal(typeof Matrix.prototype.get, 'function', 'Matrix.get should be a function');

        var m = new Matrix();
        t.deepEqual(m.get(), [
            [1,0,0],
            [0,1,0],
            [0,0,1]
        ], 'Matrix should have correct default state');

        t.end();
    });

    t.test('set method', function(t) {
        t.equal(typeof Matrix.prototype.set, 'function', 'Matrix.set should be a function');

        var m = new Matrix();
        var desired = [
            [0.1,0,0],
            [0,0.1,0],
            [0,20,0.1]
        ];
        m.set(desired);

        t.deepEqual(m.get(), desired, 'Matrix should have previously set state');

        t.end();
    });

    t.test('vectorMultiply method', function(t) {
        t.equal(typeof Matrix.prototype.set, 'function', 'Matrix.set should be a function');
        var vectors = [
            [1, 2, 3],
            [4, 5, 2],
        ];
        var matrices = [
            [
                [4.1,0,4],
                [0,3.1,0],
                [0,20,0.1]
            ],
            [
                [44,4,32],
                [432,31,34],
                [3,20,1.4]
            ]
        ];
        var results = [
            [16.1, 6.2, 40.3],
            [260, 1951, 114.8]
        ];

        for (var i = 0; i < matrices.length; i++) {
            var v = new Vector(vectors[i]);
            var m = new Matrix(matrices[i]);

            t.equal(m.vectorMultiply(v) instanceof Vector, true, 'Matrix.vectorMultiply should return vector');
            t.deepEqual(m.vectorMultiply(v).get(), results[i], 'Matrix.vectorMultiply should correctly multiply a matrix with a vector');
            t.deepEqual(m.get(), matrices[i], 'Matrix.vectorMultiply shouldn\'t modifiy original matrix');
            t.deepEqual(v.get(), vectors[i], 'Matrix.vectorMultiply shouldn\'t modifiy input vector');
        }

        t.end();
    });

    t.test('multiply method', function(t) {
        t.equal(typeof Matrix.prototype.multiply, 'function', 'Matrix.multiply should be a function');

        var m = new Matrix([
            [1, 2, 4],
            [1, 6, 4],
            [4, 5, 9]
        ]);

        var result = m.multiply([
            [5, 6, 7],
            [1, 3, 7],
            [0, 3, 5]
        ]);

        var expected = [
            [3, 5, 5],
            [3, 5, 5],
            [3, 5, 5]
        ];

        t.deepEqual(result, expected, 'Matrix.multiply should multiply two matrices');

        t.end();
    });
    
    t.test('transpose method', function(t) {
        t.equal(typeof Matrix.prototype.transpose, 'function', 'Matrix.transpose should be a function');

        var state = [
            [1, 2, 23],
            [1, 9, 32],
            [1, 34, 1]
        ];
        
        var arg = [
            [1, 2, 0],
            [0, 0, 32],
            [2, 4, 1]
        ];

        var result = [
            [1, 2, 3],
            [1, 9, 2],
            [1, 34, 1]
        ];

        // var m = new Matrix(state);
        // t.deepEqual(m.transpose(arg), result, 'Matrix.transpose should transpose matrix');

        t.end();
    });

    t.test('clone method', function(t) {
        t.equal(typeof Matrix.prototype.clone, 'function', 'Matrix.clone should be a function');
        var state = [
            [31, 12, 23],
            [31, 23, 34],
            [131, 21, 31]
        ];
        var m = new Matrix(state);
        t.deepEqual(m.clone().get(), state, 'Matrix.clone should return cloned Matrix');

        t.end();
    });
});



//     /**
//      * Multiply the provided matrix M2 with this matrix.  Result is (this) * (M2).
//      *   Note: This sets the internal matrix register.  Current handles to the register
//      *   will see values changed.
//      *
//      * @method multiply
//      *
//      * @param {Matrix} M2 input matrix to multiply on the right
//      * @return {Matrix} result of multiplication, as a handle to the internal register
//      */
//     Matrix.prototype.multiply = function multiply(M2) {
//         var M1 = this.get();
//         var result = [[]];
//         for (var i = 0; i < 3; i++) {
//             result[i] = [];
//             for (var j = 0; j < 3; j++) {
//                 var sum = 0;
//                 for (var k = 0; k < 3; k++) {
//                     sum += M1[i][k] * M2[k][j];
//                 }
//                 result[i][j] = sum;
//             }
//         }
//         return _register.set(result);
//     };
