var MAP = (function() {
    var map = {};
    map.tile = {};

    map.createTile = function(hex) {
        // Geometry: http://threejs.org/docs/index.html#Reference/Extras.Geometries/CircleGeometry
        // TODO add color and/or texture from hex
        // TODO move tile to a separate object?
        var geometry = new THREE.CircleGeometry( 1, 6, Math.PI/2 );
        var material = new THREE.MeshBasicMaterial( { color: Math.random() * 0xffffff } );
        var tile = new THREE.Mesh( geometry, material );
        tile.position.x = 1 * Math.sqrt(3) * (hex.q + hex.r/2);
        tile.position.y = 1 * 3/2 * hex.r;
        tile.hex = hex;
        return tile;
    }

    map.buildRandom = function(h, w) {
        for (var i = -h; i <= h; i++) {
            for (var j = -w; j <= w; j++) {
                var key = i+':'+j;
                this.tile[key] = this.createTile(new Hex(i, j));
            }
        }
    }

    map.loadFromString = function(str) {
        // TODO load from a json string
    }

    map.addTilesToScene = function(scene) {
        for (var i in this.tile) {
            scene.add(this.tile[i]);
        }
    }

    return map;
}());
