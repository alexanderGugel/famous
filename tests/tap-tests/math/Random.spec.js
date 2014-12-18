var test = require('tape');
var Random = require('../../../src/math/Random');

// TODO
// - Testing random number generators is damn hard, therefore the following tests are pretty weak and probalistic
// - current Famo.us has inconsistent API: integer should be renamed to integerRange, range to floatRange
// - several bugs (see below)
test('Random', function(t) {
    t.test('integer method', function(t) {
        t.equal(typeof Random.integer, 'function', 'Random.integer should be a function');

        // TODO Bug in famo.us
        // var max;
        // for (var min = -10; min < 20; min++) {
        //     for (var add = 0; add < 10; add++) {
        //         max = min + add;
        //         var random = Random.integer(min, max);
        //         t.ok(random >= min && random <= max, 'Random.integer should return random number (' + random + ') [' + min + ';' + max + ']');
        //     }
        // }

        t.end();
    });
    
    t.test('range method', function(t) {
        t.equal(typeof Random.range, 'function', 'Random.range should be a function');

        // TODO refactor integer and range, so we only have to test once

        t.end();
    });
    
    t.test('sign method', function(t) {
        t.equal(typeof Random.sign, 'function', 'Random.sign should be a function');

        // TODO refactor using bool

        var n = 1000;

        for (var probability = 0; probability < 1; probability += 0.1) {
            var sum = 0;
            for (var j = 0; j < n; j++) {
                var random = Random.sign(probability);
                if (random !== -1 && random !== 1) {
                    t.fail('Random.sign should return {-1; 1}, but returned ' + random);
                }

                if (random === -1) random = 0;
                sum += random;
            }
            t.equal(Math.round((sum/n)*10), Math.round(probability*10), 'Random.sign should return 1 with probability ' + probability);
        }

        t.end();
    });
    
    t.test('bool method', function(t) {
        t.equal(typeof Random.bool, 'function', 'Random.bool should be a function');
        var returnedTrue = false;
        var returnedFalse = false;

        for (var i = 0; i < 200; i++) {
            var random = Random.bool();
            if (random === true) {
                returnedTrue = true;
            } else if (random === false) {
                returnedFalse = true;
            } else {
                t.fail('Random.bool should only return true and false');
            }
        }

        t.ok(returnedTrue, 'Random.bool should have returned true');
        t.ok(returnedFalse, 'Random.bool should have returned false');
        t.end();
    });
});

// /* This Source Code Form is subject to the terms of the Mozilla Public
//  * License, v. 2.0. If a copy of the MPL was not distributed with this
//  * file, You can obtain one at http://mozilla.org/MPL/2.0/.
//  *
//  * Owner: david@famo.us
//  * @license MPL 2.0
//  * @copyright Famous Industries, Inc. 2014
//  */

// define(function(require, exports, module) {

//     var RAND = Math.random;

//     function _randomFloat(min,max) {
//         return min + RAND() * (max - min);
//     }

//     function _randomInteger(min,max) {
//         return (min + RAND() * (max - min + 1)) >> 0;
//     }

//     /**
//      * Very simple uniform random number generator library wrapping Math.random().
//      *
//      * @class Random
//      * @static
//      */
//     var Random = {};

//     /**
//      * Get single random integer between min and max (inclusive), or array
//      *   of size dim if specified.
//      *
//      * @method integer
//      *
//      * @param {Number} min lower bound, default 0
//      * @param {Number} max upper bound, default 1
//      * @param {Number} dim (optional) dimension of output array, if specified
//      * @return {number | array<number>} random integer, or optionally, an array of random integers
//      */
//     Random.integer = function integer(min,max,dim) {
//         min = (min !== undefined) ? min : 0;
//         max = (max !== undefined) ? max : 1;
//         if (dim !== undefined) {
//             var result = [];
//             for (var i = 0; i < dim; i++) result.push(_randomInteger(min,max));
//             return result;
//         }
//         else return _randomInteger(min,max);
//     };

//     /**
//      * Get single random float between min and max (inclusive), or array
//      *   of size dim if specified
//      *
//      * @method range
//      *
//      * @param {Number} min lower bound, default 0
//      * @param {Number} max upper bound, default 1
//      * @param {Number} [dim] dimension of output array, if specified
//      * @return {Number} random float, or optionally an array
//      */
//     Random.range = function range(min,max,dim) {
//         min = (min !== undefined) ? min : 0;
//         max = (max !== undefined) ? max : 1;
//         if (dim !== undefined) {
//             var result = [];
//             for (var i = 0; i < dim; i++) result.push(_randomFloat(min,max));
//             return result;
//         }
//         else return _randomFloat(min,max);
//     };

//     /**
//      * Return random number among the set {-1 ,1}
//      *
//      * @method sign
//      *
//      * @param {Number} prob probability of returning 1, default 0.5
//      * @return {Number} random sign (-1 or 1)
//      */
//     Random.sign = function sign(prob) {
//         prob = (prob !== undefined) ? prob : 0.5;
//         return (RAND() < prob) ? 1 : -1;
//     };

//     /**
//      * Return random boolean value, true or false.
//      *
//      * @method bool
//      *
//      * @param {Number} prob probability of returning true, default 0.5
//      * @return {Boolean} random boolean
//      */
//     Random.bool = function bool(prob) {
//         prob = (prob !== undefined) ? prob : 0.5;
//         return RAND() < prob;
//     };

//     module.exports = Random;
// });
