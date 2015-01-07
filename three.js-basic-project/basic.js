// Basic elements.
var renderer, camera, scene;

// Controls
var controls;

// Objects

/*******************************************
 * Define your elements here.
 *
 * e.g.: var box, cube, ball;
 *
 *******************************************/


// Variables

/*******************************************
 * Define your variables used for animations here.
 *
 * e.g.: var angle = 0;
 *
 *******************************************/

init();
animate();

function init() {

    // WebGLRenderer
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild( renderer.domElement );

    // scene
    scene = new THREE.Scene();

    // camera
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1000000 );
    camera.position.set( 10, 10, 160 );
    camera.lookAt({ x:0, y:0, z:0 });
    scene.add( camera );

    // controls
    controls = new THREE.OrbitControls( camera, renderer.domElement );

    // ambient light
    scene.add( new THREE.AmbientLight( 0x404040 ));
    
    // axis
    scene.add( new THREE.AxisHelper( 1000 ) );

    
    /*******************************************
     * Create your elements here.
     *
     * e.g.: box = ...;
     *
     *******************************************/

    
    // Subscribe to the window resize event.
    window.addEventListener( 'resize', onWindowResize, false );
}

// Handles the window resize event to adjust the camera aspect and the size of the canvas.
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

    
    /*******************************************
     * Make changes to your elements here.
     *
     * e.g.: box.rotation.x += 1;
     *
     *******************************************/


    renderer.render( scene, camera );
}