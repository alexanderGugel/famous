/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Owner: mark@famo.us
 * @license MPL 2.0
 * @copyright Famous Industries, Inc. 2014
 */
// TODO fix func-style
/*eslint func-style: [0, "declaration"] */

define(function(require, exports, module) {
    /**
     * An internal library to reproduce javascript time-based scheduling.
     *   Using standard javascript setTimeout methods can have a negative performance impact
     *   when combined with the Famous rendering process, so instead require Timer and call
     *   Timer.setTimeout, Timer.setInterval, etc.
     *
     * @class Timer
     * @constructor
     */
    var FamousEngine = require('../core/Engine');

    var _event  = 'prerender';

    var timerFunctions = [];

    var getTime = (window.performance && window.performance.now) ?
        function() {
            return window.performance.now();
        }
        : function() {
            return Date.now();
        };

    /**
     * Add a function to be run on every prerender
     *
     * @method addTimerFunction
     *
     * @param {function} fn function to be run every prerender
     *
     * @return {function} function passed in as parameter
     */
    function addTimerFunction(fn) {
        FamousEngine.on(_event, fn);
        timerFunctions.push(fn);
        return fn;
    }

    /**
     * Wraps a function to be invoked after a certain amount of time.
     *  After a set duration has passed, it executes the function and
     *  removes it as a listener to 'prerender'.
     *
     * @method setTimeout
     *
     * @param {function} fn function to be run after a specified duration
     * @param {number} duration milliseconds from now to execute the function
     *
     * @return {function} function passed in as parameter
     */
    function setTimeout(fn, duration) {
        var callback = function() {
            if (timerFunction._paused) return;
            var t2 = getTime();
            if (t2 - timerFunction._started >= duration) {
                fn.apply(this, arguments);
                FamousEngine.removeListener(_event, callback);
            }
        };
        var timerFunction = addTimerFunction(callback);
        timerFunction._paused = 0;
        timerFunction._started = getTime();
        return timerFunction;
    }

    /**
     * Wraps a function to be invoked after a certain amount of time.
     *  After a set duration has passed, it executes the function and
     *  resets the execution time.
     *
     * @method setInterval
     *
     * @param {function} fn function to be run after a specified duration
     * @param {number} duration interval to execute function in milliseconds
     *
     * @return {function} function passed in as parameter
     */
    function setInterval(fn, duration) {
        var callback = function() {
            if (timerFunction._paused) return;
            var t2 = getTime();
            if (t2 - timerFunction._started >= duration) {
                fn.apply(this, arguments);
                timerFunction._started = getTime();
            }
        };
        var timerFunction = addTimerFunction(callback);
        timerFunction._paused = 0;
        timerFunction._started = getTime();
        return timerFunction;
    }

    /**
     * Wraps a function to be invoked after a certain amount of prerender ticks.
     *  Similar use to setTimeout but tied to the engine's run speed.
     *
     * @method after
     *
     * @param {function} fn function to be run after a specified amount of ticks
     * @param {number} numTicks number of prerender frames to wait
     *
     * @return {function} function passed in as parameter
     */
    function after(fn, numTicks) {
        if (numTicks === undefined) return undefined;
        var callback = function() {
            numTicks--;
            if (numTicks <= 0) { //in case numTicks is fraction or negative
                fn.apply(this, arguments);
                clear(callback);
            }
        };
        return addTimerFunction(callback);
    }

    /**
     * Wraps a function to be continually invoked after a certain amount of prerender ticks.
     *  Similar use to setInterval but tied to the engine's run speed.
     *
     * @method every
     *
     * @param {function} fn function to be run after a specified amount of ticks
     * @param {number} numTicks number of prerender frames to wait
     *
     * @return {function} function passed in as parameter
     */
    function every(fn, numTicks) {
        numTicks = numTicks || 1;
        var initial = numTicks;
        var callback = function() {
            numTicks--;
            if (numTicks <= 0) { //in case numTicks is fraction or negative
                fn.apply(this, arguments);
                numTicks = initial;
            }
        };
        return addTimerFunction(callback);
    }

    /**
     * Remove a function that gets called every prerender
     *
     * @method clear
     *
     * @param {function} fn event listener
     */
    function clear(fn) {
        if (Array.isArray(fn)) {
            var fns = fn.slice();
            for (var i = 0; i < fns.length; i++) {
                clear(fns[i]);
            }
            return;
        }
        var index = timerFunctions.indexOf(fn);
        if (index > -1) {
            timerFunctions.splice(index, 1);    
            FamousEngine.removeListener(_event, fn);
        }
    }

    /**
     * Executes a function after a certain amount of time. Makes sure
     *  the function is not run multiple times.
     *
     * @method debounce
     *
     * @param {function} func function to run after certain amount of time
     * @param {number} wait amount of time
     *
     * @return {function} function that is not able to debounce
     */
    function debounce(func, wait) {
        var timeout;
        var ctx;
        var timestamp;
        var result;
        var args;
        return function() {
            ctx = this;
            args = arguments;
            timestamp = getTime();

            var fn = function() {
                var last = getTime - timestamp;

                if (last < wait) {
                    timeout = setTimeout(fn, wait - last);
                } else {
                    timeout = null;
                    result = func.apply(ctx, args);
                }
            };

            clear(timeout);
            timeout = setTimeout(fn, wait);

            return result;
        };
    }

    function clearAll() {
        clear(timerFunctions);
    }

    function getAll() {
        return timerFunctions.slice();
    }

    function clearExcept(except) {
        for (var i = 0; i < timerFunctions.length; i++) {
            var fn = timerFunctions[i];
            if (fn !== except) {
                clear(fn);
            }
        }
    }

    function pause(timerFunction) {
        timerFunction._paused = getTime();
        return timerFunction;
    }

    function resume(timerFunction) {
        var progressBeforePause = timerFunction._paused - timerFunction._started;
        timerFunction._started = getTime() - progressBeforePause;
        timerFunction._paused = 0;
        return timerFunction;
    }

    function pauseAll() {
        for (var i = 0; i < timerFunctions.length; i++) {
            pause(timerFunctions[i]);
        }
    }
    
    function resumeAll() {
        for (var i = 0; i < timerFunctions.length; i++) {
            resume(timerFunctions[i]);
        }
    }

    module.exports = {
        setTimeout : setTimeout,
        setInterval : setInterval,
        debounce : debounce,
        after : after,
        every : every,
        clear : clear,
        clearAll : clearAll,
        getAll: getAll,
        clearExcept: clearExcept,
        pause : pause,
        pauseAll : pauseAll,
        resume : resume,
        resumeAll : resumeAll
    };

});