define(function(require, exports, module) {
    function kill(type) {
        window.addEventListener(type, function(event) {
            event.stopPropagation();
            return false;
        }, true);
    }

    kill('mousedown');
    kill('mousemove');
    kill('mouseup');
    kill('mouseleave');
});
