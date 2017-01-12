(function() {
    var render = function () {
        requestAnimationFrame( render );

        input.update();

        renderer.render(scene, camera);
    };

    // TODO what is screen higher than width and set minimum size for info bar
    var canvasWidth = 0.7;

    var renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setClearColor( 0xdddddd, 1);
    renderer.setSize( window.innerWidth * canvasWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    // Scene and group
    var scene = new THREE.Scene();
    var tileGroup = new THREE.Group();
    scene.add(tileGroup);

    // Load definitions
    var tileDefinition = {
        'DTI00001': {
            'material': new THREE.MeshBasicMaterial({'color':0x00ff00})
        },
        'DTI00002': {
            'material': new THREE.MeshBasicMaterial({'color':0xff0000})
        },
        'DTI00003': {
            'material': new THREE.MeshBasicMaterial({'color':0x0000ff})
        },
    };

    // Camera
    // var camera = new THREE.PerspectiveCamera( 45, (window.innerWidth * canvasWidth) / window.innerHeight, 0.9, 1000 );
    var height = 10;
    var width = height * (window.innerWidth * canvasWidth) / window.innerHeight;
    var camera = new THREE.OrthographicCamera(
        width / -2,
        width / 2,
        height / 2,
        height / -2,
        1,
        21
    );

    var conf = CONFIG;
    var input = INPUT;
    var map = MAP;
    map.tileDefinition = tileDefinition;

    map.buildRandom(10, 10);
    // map.buildFromData();
    map.addTilesToScene(scene);

    // TODO lock the movement to the edge of the map
    camera.moveLeft = function() {
        camera.position.x -= 1;
    }
    camera.moveRight = function() {
        camera.position.x += 1;
    }
    camera.moveUp = function() {
        camera.position.y += 1;
    }
    camera.moveDown = function() {
        camera.position.y -= 1;
    }
    camera.zoomIn = function() {
        camera.zoom *= 1.1;
        camera.updateProjectionMatrix();
    }
    camera.zoomOut = function() {
        camera.zoom *= 0.9;
        if (camera.zoom < conf.get('camera_max_zoom', 0)) {
            camera.zoom = conf.get('camera_max_zoom', 0);
        }
        camera.updateProjectionMatrix();
    }
    camera.reset = function() {
        camera.position.set(0, 0, 20);
        camera.lookAt(new THREE.Vector3(0, 0, 0));
    }
    var clickAction = function(x, y) {
        console.log('Click happened at ', x, y);
    }

    input.registerKeyUpdate('a', camera.moveLeft);
    input.registerKeyUpdate('d', camera.moveRight);
    input.registerKeyUpdate('w', camera.moveUp);
    input.registerKeyUpdate('s', camera.moveDown);
    input.registerKeyUpdate('r', camera.zoomIn);
    input.registerKeyUpdate('f', camera.zoomOut);
    input.registerWheelAction('yDown', camera.zoomIn);
    input.registerWheelAction('yUp', camera.zoomOut);
    input.registerMouseAction('click', clickAction);
    input.registerKeyAction('p', camera.reset);

    // Reference Lines
    var geometryRefX = new THREE.Geometry();
    geometryRefX.vertices.push(new THREE.Vector3(0, 0, 0));
    geometryRefX.vertices.push(new THREE.Vector3(10, 0, 0));
    var lineRefX = new THREE.Line(geometryRefX, new THREE.LineBasicMaterial({
        color: 0xff0000
    }));
    scene.add(lineRefX);
    var geometryRefY = new THREE.Geometry();
    geometryRefY.vertices.push(new THREE.Vector3(0, 0, 0));
    geometryRefY.vertices.push(new THREE.Vector3(0, 10, 0));
    var lineRefY = new THREE.Line(geometryRefY, new THREE.LineBasicMaterial({
        color: 0x00ff00
    }));
    scene.add(lineRefY);

    // Sprite test
    group = new THREE.Group(); // This is to group items, can group tiles, units, etc...
    var textureLoader = new THREE.TextureLoader();
    var mapB = textureLoader.load( "textures/pink.png" );
    var materialB = new THREE.SpriteMaterial( { map: mapB, color: 0xffffff, fog: true } );
    // material = materialB.clone();
    // materialB.color.setHSL( 0.5 * Math.random(), 0.75, 0.5 );
    var sprite = new THREE.Sprite( materialB );
    sprite.position.set( 0, 0, 0 );
    sprite.position.normalize(); // Use to hold into 1*1*1 cube
    sprite.position.multiplyScalar( 4 ); // to extend to the correct size
    group.add( sprite );
    scene.add( group );

    // Text test
    // TODO find a good way to display text

    // Default camera position
    camera.reset();

    render();

    // Actions
    var zoom = function(deltaZ) {
        camera.position.z += deltaZ;
        if (camera.position.z < 1) {
            camera.position.z = 1;
        }
    }
}());
