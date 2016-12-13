var CONFIG = (function() {
    var config = {};

    config.get = function(key, def) {
        if (typeof config.data[key] !== 'undefined') {
            return config.data[key];
        }
        return def;
    }
    config.data = {
        'camera_max_zoom': 5,
    };

    return config;
}());
