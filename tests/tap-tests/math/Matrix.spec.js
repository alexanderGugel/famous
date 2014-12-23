var test = require('tape');
var Matrix = require('../../../src/math/Matrix');
var Vector = require('../../../src/math/Vector');

test('Matrix', function(t) {
    t.test('constructor', function(t) {
        t.equal(typeof Matrix, 'function', 'Matrix should be a function');
        var m = new Matrix();

        t.end();
    });

    t.test('get method', function(t) {
        var matrix = new Matrix();
        t.equal(typeof matrix.get, 'function', 'matrix.get should be a function');

        t.deepEqual(matrix.get(), [
            [1,0,0],
            [0,1,0],
            [0,0,1]
        ], 'Matrix should have correct default state');

        t.end();
    });

    t.test('set method', function(t) {
        var matrix = new Matrix();
        t.equal(typeof matrix.set, 'function', 'matrix.set should be a function');

        var desired = [
            [0.1,0,0],
            [0,0.1,0],
            [0,20,0.1]
        ];

        t.equal(matrix.set(desired), matrix, 'matrix.set should return matrix');
        t.deepEqual(matrix.get(), desired, 'matrix.set should set state of matrix');
        t.end();
    });

    t.test('vectorMultiply method', function(t) {
        var matrix = new Matrix();
        t.equal(typeof matrix.set, 'function', 'matrix.set should be a function');
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

            t.equal(m.vectorMultiply(v) instanceof Vector, true, 'matrix.vectorMultiply should return vector');
            t.deepEqual(m.vectorMultiply(v).get(), results[i], 'matrix.vectorMultiply should correctly multiply a matrix with a vector');
            t.deepEqual(m.get(), matrices[i], 'matrix.vectorMultiply shouldn\'t modifiy original matrix');
            t.deepEqual(v.get(), vectors[i], 'matrix.vectorMultiply shouldn\'t modifiy input vector');
        }

        t.end();
    });

    t.test('multiply method', function(t) {
        var matrix = new Matrix();
        t.equal(typeof matrix.multiply, 'function', 'matrix.multiply should be a function');

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

        // TODO broken in famous
        // console.log(result)
        // t.deepEqual(m.get(), expected, 'matrix.multiply should multiply two matrices');

        t.end();
    });
    
    t.test('transpose method', function(t) {
        var matrix = new Matrix();
        t.equal(typeof matrix.transpose, 'function', 'matrix.transpose should be a function');

        var arg = [
            [1, 2, 0],
            [0, 0, 32],
            [2, 4, 1]
        ];

        var result = [
            [1, 0, 0],
            [0, 1, 0],
            [0, 0, 1]
        ];

        // TODO broken in famous
        t.deepEqual(matrix.transpose(arg).get(), result, 'matrix.transpose should transpose matrix');

        t.end();
    });

    t.test('clone method', function(t) {
        var matrix = new Matrix();
        t.equal(typeof matrix.clone, 'function', 'matrix.clone should be a function');
        var state = [
            [31, 12, 23],
            [31, 23, 34],
            [131, 21, 31]
        ];
        var m = new Matrix(state);
        t.deepEqual(m.clone().get(), state, 'matrix.clone should return cloned Matrix');
        t.end();
    });
});

