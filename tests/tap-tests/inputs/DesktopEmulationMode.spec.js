var test = require('tape');
var Engine = require('../../../src/core/Engine');
var Context = require('../../../src/core/Context');

test('DesktopEmulationMode', function(t) {
    // TODO Testing this is not hard, reversing it is
    
    // var event = new MouseEvent('click', {
    //     'view': window,
    //     'bubbles': true,
    //     'cancelable': true
    // });
    // var cb = document.getElementsByTagName('body')[0];
    // var canceled = !cb.dispatchEvent(event);

    t.end();
});

// define(function(require, exports, module) {
//     var hasTouch = 'ontouchstart' in window;

//     function kill(type) {
//         window.addEventListener(type, function(event) {
//             event.stopPropagation();
//             return false;
//         }, true);
//     }

//     if (hasTouch) {
//         kill('mousedown');
//         kill('mousemove');
//         kill('mouseup');
//         kill('mouseleave');
//     }
// });
