var INPUT = (function() {
    var input = {};
    input.mousePos = {x:0,y:0};

    // Actions
    var keyActions = {};
    var mouseActions = {};
    var wheelActions = {};

    // Updates
    var keyUpdates = {};
    var mouseUpdates = {};

    var keyDown = {};

    input.registerKeyAction = function(key, action) {
        keyActions[key] = action;
    };
    input.registerMouseAction = function(key, action) {
        mouseActions[key] = action;
    };
    input.registerWheelAction = function(key, action) {
        wheelActions[key] = action;
    };

    input.registerKeyUpdate = function(key, action) {
        keyUpdates[key] = action;
        keyDown[key] = false;
    };
    input.registerMouseUpdate = function(key, action) {
        mouseUpdates[key] = action;
    };

    input.update = function(time) {
        if (!time) {
            time = 1;
        }
        for (key in keyUpdates) {
            if (keyDown[key] === true) {
                keyUpdates[key](time);
            }
        }
    }

    // Keyboar event
    document.body.onkeydown = function(e) {
        if (typeof keyActions[e.key] !== 'undefined') {
            e.preventDefault();
            keyActions[e.key]();
        }
        if (typeof keyUpdates[e.key] !== 'undefined') {
            e.preventDefault();
            keyDown[e.key] = true;
        }
    };
    document.body.onkeyup = function(e) {
        if (typeof keyUpdates[e.key] !== 'undefined') {
            e.preventDefault();
            keyDown[e.key] = false;
        }
    };

    // Mouse event
    // e.pageX, e.pageY, e.button
    document.body.onclick = function(e) {
        if (typeof mouseActions['click'] !== 'undefined') {
            e.preventDefault();
            mouseActions['click'](e.pageX, e.pageY);
        }
    };
    // todo add mouse move as mouse update

    // Wheel event
    // yDown, yUp
    document.body.onwheel = function(e) {
        if (e.deltaY < 0 && typeof wheelActions['yDown'] !== 'undefined') {
            e.preventDefault();
            wheelActions['yDown'](e.deltaY);
        }
        if (e.deltaY > 0 && typeof wheelActions['yUp'] !== 'undefined') {
            e.preventDefault();
            wheelActions['yUp'](e.deltaY);
        }
    };

    return input;
}());
