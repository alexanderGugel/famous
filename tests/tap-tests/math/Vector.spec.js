var test = require('tape');
var Vector = require('../../../src/math/Vector');
// var TypeList = require('../../utilities/TypeList');

test('Vector', function(t) {
    t.test('constructor', function(t) {
        t.equal(typeof Vector, 'function', 'Vector should be a function');

        var desired = [1, 2, 3];
        var vec1 = new Vector([1, 2, 3]);
        var vec2 = new Vector({x: 1, y: 2, z: 3});
        t.deepEqual(vec1.get(), desired, 'Vector constructor should accept objects and arrays');
        t.deepEqual(vec2.get(), desired, 'Vector constructor should accept objects and arrays');

        // var vec3 = new Vector();
        // var vec4 = new Vector([]);
        // var vec5 = new Vector({});

        // t.deepEqual(vec3.get(), [0, 0, 0], 'Vector state should default to [0, 0, 0]');
        // t.deepEqual(vec4.get(), [0, 0, 0], 'Vector state should default to [0, 0, 0]');
        // t.deepEqual(vec5.get(), [0, 0, 0], 'Vector state should default to [0, 0, 0]');

        t.end();
    });
    
    t.test('add method', function(t) {
        t.equal(typeof Vector.prototype.add, 'function', 'Vector.add should be a function');

        for (var x = -3; x < 3; x++) {
            for (var y = -3; y < 3; y++) {
                for (var z = -3; z < 3; z++) {
                    var vec1 = new Vector(x, y, z);
                    for (var x = -3; x < 3; x++) {
                        for (var y = -3; y < 3; y++) {
                            for (var z = -3; z < 3; z++) {
                                var vec2 = new Vector(x, y, z);
                                var add1 = vec1.add(vec2).get();
                                var add2 = vec2.add(vec1).get();
                                t.deepEqual(add1, add2, 'Vector.add Order of adding vectors should be irrelevant');
                            }
                        }
                    }
                }
            }
        }

        t.deepEqual((new Vector(0, 1, 0)).add(new Vector(0, 0, 1)).get(), [0, 1, 1], 'Vector.add should correctly add vectors');
        t.deepEqual((new Vector(1, 2, 3)).add(new Vector(4, 5, 6)).get(), [5, 7, 9], 'Vector.add should correctly add vectors');
        t.deepEqual((new Vector(1, 1, 1)).add(new Vector(2, 1, 1)).get(), [3, 2, 2], 'Vector.add should correctly add vectors');
        t.deepEqual((new Vector(3, 1, 2)).add(new Vector(5, 7, 1)).get(), [8, 8, 3], 'Vector.add should correctly add vectors');

        var vec3State = [0.3, 1.1, 0];
        var vec3 = new Vector(vec3State);
        var vec4State = [1.3, 9.5, 1.7];
        var vec4 = new Vector(vec4State);
        var expectedResult = [1.6, 10.6, 1.7];
        t.deepEqual(vec3.add(vec4).get(), expectedResult, 'Vector.add should correctly add vectors');

        t.deepEqual(vec3.get(), vec3State, 'Vector.add should not have any side effects');
        t.deepEqual(vec4.get(), vec4State, 'Vector.add should not have any side effects');

        t.end();
    });

    t.test('sub method', function(t) {
        t.equal(typeof Vector.prototype.sub, 'function', 'Vector.sub should be a function');

        t.deepEqual((new Vector(0, 1, 0)).sub(new Vector(0, 0, 1)).get(), [0, 1, -1], 'Vector.sub should correctly subtract vectors');
        t.deepEqual((new Vector(1, 2, 3)).sub(new Vector(4, 5, 6)).get(), [-3, -3, -3], 'Vector.sub should correctly subtract vectors');
        t.deepEqual((new Vector(1, 1, 1)).sub(new Vector(2, 1, 1)).get(), [-1, 0, 0], 'Vector.sub should correctly subtract vectors');
        t.deepEqual((new Vector(3, 1, 2)).sub(new Vector(5, 7, 1)).get(), [-2, -6, 1], 'Vector.sub should correctly subtract vectors');

        var vec3State = [0.3, 1.1, 0];
        var vec3 = new Vector(vec3State);
        var vec4State = [1.3, 9.5, 1.7];
        var vec4 = new Vector(vec4State);
        var expectedResult = [-1, -8.4, -1.7];
        t.deepEqual(vec3.sub(vec4).get(), expectedResult, 'Vector.sub should correctly sub vectors');

        t.deepEqual(vec3.get(), vec3State, 'Vector.sub should not have any side effects');
        t.deepEqual(vec4.get(), vec4State, 'Vector.sub should not have any side effects');

        t.end();
    });

    t.test('mult method', function(t) {
        t.equal(typeof Vector.prototype.mult, 'function', 'Vector.mult should be a function');

        t.deepEqual((new Vector(0, 1, 0)).mult(4).get(), [0, 4, 0], 'Vector.mult should correctly multiply vectors');
        t.deepEqual((new Vector(1, 2, 3)).mult(2).get(), [2, 4, 6], 'Vector.mult should correctly multiply vectors');
        t.deepEqual((new Vector(1, 1, 1)).mult(9).get(), [9, 9, 9], 'Vector.mult should correctly multiply vectors');
        t.deepEqual((new Vector(3, 1, 2)).mult(7).get(), [21, 7, 14], 'Vector.mult should correctly multiply vectors');

        var vecState = [0.3, 1, 0];
        var vec = new Vector(vecState);
        t.deepEqual(vec.mult(5.2).get(), [1.56, 5.2, 0], 'Vector.mult should correctly multiply vectors');

        t.deepEqual(vec.get(), vecState, 'Vector.mult should not have any side effects');

        t.end();
    });
    
    t.test('div method', function(t) {
        t.equal(typeof Vector.prototype.div, 'function', 'Vector.div should be a function');

        t.deepEqual((new Vector(0, 5, 0)).div(4).get(), [0, 1.25, 0], 'Vector.div should correctly divide vectors');
        t.deepEqual((new Vector(3, 7, 3)).div(2).get(), [1.5, 3.5, 1.5], 'Vector.div should correctly divide vectors');
        t.deepEqual((new Vector(2, 9, 1)).div(8).get(), [0.25, 1.125, 0.125], 'Vector.div should correctly divide vectors');
        t.deepEqual((new Vector(1, 3, 0)).div(7).get(), [0.14285714285714285, 0.42857142857142855, 0], 'Vector.div should correctly divide vectors');

        var vecState = [0.3, 1, 0];
        var vec = new Vector(vecState);
        t.deepEqual(vec.div(5).get(), [0.06, 0.2, 0], 'Vector.div should correctly divide vectors');

        t.deepEqual(vec.get(), vecState, 'Vector.div should not have any side effects');

        t.end();
    });

    t.test('cross method', function(t) {
        t.equal(typeof Vector.prototype.cross, 'function', 'Vector.cross should be a function');

        t.deepEqual((new Vector(0, 1, 0)).cross(new Vector(0, 0, 1)).get(), [-1, 0, 0], 'Vector.cross should correctly determine cross-product of vectors');
        t.deepEqual((new Vector(1, 2, 3)).cross(new Vector(4, 5, 6)).get(), [3, -6, 3], 'Vector.cross should correctly determine cross-product of vectors');
        t.deepEqual((new Vector(1, 1, 1)).cross(new Vector(2, 1, 1)).get(), [0, -1, 1], 'Vector.cross should correctly determine cross-product of vectors');
        t.deepEqual((new Vector(3, 1, 2)).cross(new Vector(5, 7, 1)).get(), [13, -7, -16], 'Vector.cross should correctly determine cross-product of vectors');

        var vec3State = [0.3, 1.1, 0];
        var vec3 = new Vector(vec3State);
        var vec4State = [1.3, 9.5, 1.7];
        var vec4 = new Vector(vec4State);
        var expectedResult = [-1.87, 0.51, -1.42];
        t.deepEqual(vec3.cross(vec4).get(), expectedResult, 'Vector.cross should correctly determine cross-product of vectors');

        t.deepEqual(vec3.get(), vec3State, 'Vector.cross should not have any side effects');
        t.deepEqual(vec4.get(), vec4State, 'Vector.cross should not have any side effects');

        t.end();
    });

    t.test('equals method', function(t) {
        t.equal(typeof Vector.prototype.equals, 'function', 'Vector.equals should be a function');

        t.equals((new Vector(0, 1, 0)).equals(new Vector(1, 2, 3)), false, 'Vector.equals should check if two vectors are equivalent');
        t.equals((new Vector(1, 2, 3)).equals(new Vector(1, 2, 3)), true, 'Vector.equals should check if two vectors are equivalent');
        t.equals((new Vector(0, 1, 0)).equals(new Vector(0, 1, 0)), true, 'Vector.equals should check if two vectors are equivalent');

        t.end();
    });


});


//     /**
//      * Rotate clockwise around x-axis by theta radians.
//      *   Note: This sets the internal result register, so other references to that vector will change.
//      * @method rotateX
//      * @param {number} theta radians
//      * @return {Vector} rotated vector
//      */
//     Vector.prototype.rotateX = function rotateX(theta) {
//         var x = this.x;
//         var y = this.y;
//         var z = this.z;

//         var cosTheta = Math.cos(theta);
//         var sinTheta = Math.sin(theta);

//         return _setXYZ.call(_register,
//             x,
//             y * cosTheta - z * sinTheta,
//             y * sinTheta + z * cosTheta
//         );
//     };

//     /**
//      * Rotate clockwise around y-axis by theta radians.
//      *   Note: This sets the internal result register, so other references to that vector will change.
//      * @method rotateY
//      * @param {number} theta radians
//      * @return {Vector} rotated vector
//      */
//     Vector.prototype.rotateY = function rotateY(theta) {
//         var x = this.x;
//         var y = this.y;
//         var z = this.z;

//         var cosTheta = Math.cos(theta);
//         var sinTheta = Math.sin(theta);

//         return _setXYZ.call(_register,
//             z * sinTheta + x * cosTheta,
//             y,
//             z * cosTheta - x * sinTheta
//         );
//     };

//     /**
//      * Rotate clockwise around z-axis by theta radians.
//      *   Note: This sets the internal result register, so other references to that vector will change.
//      * @method rotateZ
//      * @param {number} theta radians
//      * @return {Vector} rotated vector
//      */
//     Vector.prototype.rotateZ = function rotateZ(theta) {
//         var x = this.x;
//         var y = this.y;
//         var z = this.z;

//         var cosTheta = Math.cos(theta);
//         var sinTheta = Math.sin(theta);

//         return _setXYZ.call(_register,
//             x * cosTheta - y * sinTheta,
//             x * sinTheta + y * cosTheta,
//             z
//         );
//     };

//     /**
//      * Return dot product of this with a second Vector
//      * @method dot
//      * @param {Vector} v second vector
//      * @return {number} dot product
//      */
//     Vector.prototype.dot = function dot(v) {
//         return this.x * v.x + this.y * v.y + this.z * v.z;
//     };

//     /**
//      * Return squared length of this vector
//      * @method normSquared
//      * @return {number} squared length
//      */
//     Vector.prototype.normSquared = function normSquared() {
//         return this.dot(this);
//     };

//     /**
//      * Return length of this vector
//      * @method norm
//      * @return {number} length
//      */
//     Vector.prototype.norm = function norm() {
//         return Math.sqrt(this.normSquared());
//     };

//     /**
//      * Scale Vector to specified length.
//      *   If length is less than internal tolerance, set vector to [length, 0, 0].
//      *   Note: This sets the internal result register, so other references to that vector will change.
//      * @method normalize
//      *
//      * @param {number} length target length, default 1.0
//      * @return {Vector}
//      */
//     Vector.prototype.normalize = function normalize(length) {
//         if (arguments.length === 0) length = 1;
//         var norm = this.norm();

//         if (norm > 1e-7) return _setFromVector.call(_register, this.mult(length / norm));
//         else return _setXYZ.call(_register, length, 0, 0);
//     };

//     /**
//      * Make a separate copy of the Vector.
//      *
//      * @method clone
//      *
//      * @return {Vector}
//      */
//     Vector.prototype.clone = function clone() {
//         return new Vector(this);
//     };

//     /**
//      * True if and only if every value is 0 (or falsy)
//      *
//      * @method isZero
//      *
//      * @return {boolean}
//      */
//     Vector.prototype.isZero = function isZero() {
//         return !(this.x || this.y || this.z);
//     };

//     function _setXYZ(x,y,z) {
//         this.x = x;
//         this.y = y;
//         this.z = z;
//         return this;
//     }

//     function _setFromArray(v) {
//         return _setXYZ.call(this,v[0],v[1],v[2] || 0);
//     }

//     function _setFromVector(v) {
//         return _setXYZ.call(this, v.x, v.y, v.z);
//     }

//     function _setFromNumber(x) {
//         return _setXYZ.call(this,x,0,0);
//     }

//     /**
//      * Set this Vector to the values in the provided Array or Vector.
//      *
//      * @method set
//      * @param {object} v array, Vector, or number
//      * @return {Vector} this
//      */
//     Vector.prototype.set = function set(v) {
//         if (v instanceof Array) return _setFromArray.call(this, v);
//         if (typeof v === 'number') return _setFromNumber.call(this, v);
//         return _setFromVector.call(this, v);
//     };

//     Vector.prototype.setXYZ = function(x,y,z) {
//         return _setXYZ.apply(this, arguments);
//     };

//     Vector.prototype.set1D = function(x) {
//         return _setFromNumber.call(this, x);
//     };

//     /**
//      * Put result of last internal register calculation in specified output vector.
//      *
//      * @method put
//      * @param {Vector} v destination vector
//      * @return {Vector} destination vector
//      */

//     Vector.prototype.put = function put(v) {
//         if (this === _register) _setFromVector.call(v, _register);
//         else _setFromVector.call(v, this);
//     };

//     /**
//      * Set this vector to [0,0,0]
//      *
//      * @method clear
//      */
//     Vector.prototype.clear = function clear() {
//         return _setXYZ.call(this,0,0,0);
//     };

//     /**
//      * Scale this Vector down to specified "cap" length.
//      *   If Vector shorter than cap, or cap is Infinity, do nothing.
//      *   Note: This sets the internal result register, so other references to that vector will change.
//      *
//      * @method cap
//      * @return {Vector} capped vector
//      */
//     Vector.prototype.cap = function cap(cap) {
//         if (cap === Infinity) return _setFromVector.call(_register, this);
//         var norm = this.norm();
//         if (norm > cap) return _setFromVector.call(_register, this.mult(cap / norm));
//         else return _setFromVector.call(_register, this);
//     };

//     /**
//      * Return projection of this Vector onto another.
//      *   Note: This sets the internal result register, so other references to that vector will change.
//      *
//      * @method project
//      * @param {Vector} n vector to project upon
//      * @return {Vector} projected vector
//      */
//     Vector.prototype.project = function project(n) {
//         return n.mult(this.dot(n));
//     };

//     /**
//      * Reflect this Vector across provided vector.
//      *   Note: This sets the internal result register, so other references to that vector will change.
//      *
//      * @method reflectAcross
//      * @param {Vector} n vector to reflect across
//      * @return {Vector} reflected vector
//      */
//     Vector.prototype.reflectAcross = function reflectAcross(n) {
//         n.normalize().put(n);
//         return _setFromVector(_register, this.sub(this.project(n).mult(2)));
//     };

//     /**
//      * Convert Vector to three-element array.
//      *
//      * @method get
//      * @return {array<number>} three-element array
//      */
//     Vector.prototype.get = function get() {
//         return [this.x, this.y, this.z];
//     };

//     Vector.prototype.get1D = function() {
//         return this.x;
//     };

//     module.exports = Vector;

// });
