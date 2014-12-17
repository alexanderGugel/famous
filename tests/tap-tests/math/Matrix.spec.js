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

        t.end();
    });
    
    t.test('transpose method', function(t) {
        t.equal(typeof Matrix.prototype.transpose, 'function', 'Matrix.transpose should be a function');

        t.end();
    });

    t.test('clone method', function(t) {
        t.equal(typeof Matrix.prototype.clone, 'function', 'Matrix.clone should be a function');

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

//     /**
//      * Creates a Matrix which is the transpose of this matrix.
//      *   Note: This sets the internal matrix register.  Current handles to the register
//      *   will see values changed.
//      *
//      * @method transpose
//      *
//      * @return {Matrix} result of transpose, as a handle to the internal register
//      */
//     Matrix.prototype.transpose = function transpose() {
//         var result = [];
//         var M = this.get();
//         for (var row = 0; row < 3; row++) {
//             for (var col = 0; col < 3; col++) {
//                 result[row][col] = M[col][row];
//             }
//         }
//         return _register.set(result);
//     };

//     /**
//      * Clones the matrix
//      *
//      * @method clone
//      * @return {Matrix} New copy of the original matrix
//      */
//     Matrix.prototype.clone = function clone() {
//         var values = this.get();
//         var M = [];
//         for (var row = 0; row < 3; row++)
//             M[row] = values[row].slice();
//         return new Matrix(M);
//     };
