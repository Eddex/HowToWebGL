// Basic elements.
var renderer, camera, scene;

// controls
var controls;

// Objects
var text;


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
    scene.add( new THREE.AxisHelper( 1000 ) );
    
    // text
    var theText = "WebGL! :)";

    var text3d = new THREE.TextGeometry( theText, {
        
        size: 40,
        height: 6,
        curveSegments: 3,
        font: "helvetiker"

    });

    text3d.computeBoundingBox();
    
    var textMaterial = new THREE.MeshBasicMaterial( { color: Math.random() * 0xffffff } );
    text = new THREE.Mesh( text3d, textMaterial );
    
    var centerOffset = -0.5 * ( text3d.boundingBox.max.x );
    text.position.x = centerOffset;
    scene.add( text );
    
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
    
    renderer.render( scene, camera );
}