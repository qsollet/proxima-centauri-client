var MAP = (function() {
    var map = {};
    map.tile = {};
    map.definition = {};
    map.tileDefinition = {};
    map.tileGeometry = new THREE.CircleGeometry( 1, 6, Math.PI/2 );

    map.createTile = function(hex) {
        // Geometry: http://threejs.org/docs/index.html#Reference/Extras.Geometries/CircleGeometry
        // TODO add color and/or texture from hex
        // TODO move tile to a separate object?
        tileTypeList = ['DTI00001', 'DTI00002', 'DTI00003']
        tileType = tileTypeList[Math.floor(Math.random()*tileTypeList.length)]
        var tile = new THREE.Mesh(
            this.tileGeometry,
            this.tileDefinition[tileType].material
        );
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

    map.buildFromData = function(data) {
        this.tile[key] = this.createTile(new Hex(data.x, data.y, data.ref))
    }

    map.loadFromString = function(str) {
        // TODO load from a json string
    }

    map.addTilesToScene = function(scene) {
        for (var i in this.tile) {
            scene.add(this.tile[i]);
        }
    }

    map.loadTexture = function(obj) {
        // TODO check structure?
        this.definition = obj;
    }

    return map;
}());
