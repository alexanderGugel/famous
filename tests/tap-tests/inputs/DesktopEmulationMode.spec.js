var test = require('tape');

function _createEvent(eventName) {
    return new MouseEvent(eventName, {
        'view': window,
        'bubbles': true,
        'cancelable': true
    });
}

var EVENT_NAMES = ['mousedown', 'mousemove', 'mouseup', 'mouseleave'];

test('DesktopEmulationMode', function(t) {
    t.test('default', function(t) {
        t.plan(4);
        var element = document.createElement('div');
        document.body.appendChild(element);

        var listeners = [];

        EVENT_NAMES.forEach(function(eventName) {
            var listener = t.pass.bind(t, eventName);
            listeners.push(listener);
            window.addEventListener(eventName, listener);
        });

        EVENT_NAMES.forEach(function(eventName) {
            element.dispatchEvent(_createEvent(eventName));
        });

        EVENT_NAMES.forEach(function(eventName, i) {
            window.removeEventListener(eventName, listeners[i]);
        });
    });

    t.test('enables', function(t) {
        require('../../../src/inputs/DesktopEmulationMode');
        
        var element = document.createElement('div');
        document.body.appendChild(element);

        var listeners = [];

        require('../../../src/inputs/DesktopEmulationMode');

        EVENT_NAMES.forEach(function(eventName) {
            var listener = t.fail.bind(t, eventName);
            listeners.push(listener);
            window.addEventListener(eventName, listener);
        });

        EVENT_NAMES.forEach(function(eventName) {
            element.dispatchEvent(_createEvent(eventName));
        });

        EVENT_NAMES.forEach(function(eventName, i) {
            window.removeEventListener(eventName, listeners[i]);
        });

        t.end();
    });
});
