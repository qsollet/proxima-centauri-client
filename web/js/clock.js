var CLOCK = (function() {
    var clock = {};
    var lastTime = date() / 1000;

    clock.time = function() {
        return date() / 1000;
    }

    clock.delta = function() {
        var oldTime = lastTime;
        lastTime = date() / 1000;
        return lastTime - oldTime;
    }

    return clock;
}());
