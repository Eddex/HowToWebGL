// Basic elements.
var renderer, camera, scene;

// controls
var controls;

// Objects
var box, world;

// Variables
var angle = 0;

init();
animate();

function init() {

    // canvas
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild( renderer.domElement );

    // scene
    scene = new THREE.Scene();

    // camera
    var aspect = window.innerWidth / window.innerHeight;
    camera = new THREE.PerspectiveCamera(75, aspect, 1, 1000000);
    camera.position.set( 10, 10, 160);
    camera.lookAt({ x:0, y:0, z:0 });
    scene.add( camera );

    // controls
    controls = new THREE.OrbitControls( camera, renderer.domElement );

    // ambient light
    scene.add( new THREE.AmbientLight( 0x404040 ));
    
    // axis
    //scene.add( new THREE.AxisHelper( 1000 ) );
    
    // directional light
    var directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
    directionalLight.position.set( 30, 30, 90 );
    directionalLight.castShadow = true;
    scene.add( directionalLight );

    // box
    var boxTexture = THREE.ImageUtils.loadTexture('img/box.jpg');
    var boxMaterial = new THREE.MeshLambertMaterial({ map: boxTexture });
    var boxGeometry = new THREE.BoxGeometry( 10, 10, 10 );
    box = new THREE.Mesh( boxGeometry, boxMaterial );
    scene.add( box );

    // sphere:world
    var worldTexture = THREE.ImageUtils.loadTexture( 'img/earth.jpg' );
    var worldMaterial = new THREE.MeshBasicMaterial( { map: worldTexture } );
    var worldGeometry = new THREE.SphereGeometry( 20, 32, 32 );
    world = new THREE.Mesh( worldGeometry, worldMaterial );
    scene.add( world );

    // skybox
    var skyboxMaterials = [

        new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( 'img/skybox/clouds/px.jpg' ) } ), // right
        new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( 'img/skybox/clouds/nx.jpg' ) } ), // left
        new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( 'img/skybox/clouds/py.jpg' ) } ), // top
        new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( 'img/skybox/clouds/ny.jpg' ) } ), // bottom
        new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( 'img/skybox/clouds/pz.jpg' ) } ), // back
        new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( 'img/skybox/clouds/nz.jpg' ) } )  // front
    ];

    var skyBoxMaterial = new THREE.MeshFaceMaterial( skyboxMaterials );
    var skyBoxGeometry = new THREE.BoxGeometry( 10000, 10000, 10000 );
    var skyBox = new THREE.Mesh( skyBoxGeometry, skyBoxMaterial );
    skyBox.scale.x = - 1;
    skyBox.rotation.y = 3.5;
    scene.add( skyBox );

    // Subscribe to the window resize event.
    window.addEventListener( 'resize', onWindowResize, false );
}

// The window resize event handler.
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}

// the animations
function animate() {
    requestAnimationFrame( animate );

    // render elements
    render();

    // update controls
    controls.update();
}

// renders the scene
function render() {

    var worldRotation = world.rotation.y + 0.01;
    world.rotation.y = worldRotation;
    
    var boxRotation = box.rotation.y + 0.1;
    box.rotation.y = boxRotation;

    angle += 0.01;
    var r = 45;
    var newXY = Math.floor(r * Math.cos(angle));
    var newZ = Math.floor(r * Math.sin(angle));

    
    box.position.x = newXY;
    box.position.y = newXY;
    box.position.z = newZ;
    

    renderer.render( scene, camera );
}