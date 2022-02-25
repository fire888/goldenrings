import * as THREE from 'three'
import { OrbitControls }  from 'three/examples/jsm/controls/OrbitControls'
import { MapControls }  from 'three/examples/jsm/controls/MapControls'

export const createCamera = (root) => {
    const { studio, emitter } = root


    //const camera = new THREE.OrthographicCamera( window.innerWidth / - 35, window.innerWidth / 35, window.innerHeight / 35, window.innerHeight / -35, 0, 100000 );
    const camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 0.1, 10000 )
    camera.position.set(-90, 30, 0)
    camera.lookAt(new THREE.Vector3())


    /** Map Controls */
    // const controls = new MapControls(camera, studio.getRenderer().domElement)
    // controls.target.set( 0, 0, -16)

    // //controls.addEventListener('change', render) // call this only in static scenes (i.e., if there is no animation loop)
    // //controls.enableDamping = true // an animation loop is required when either damping or auto-rotation are enabled
    // //controls.dampingFactor = 0.01
    // controls.screenSpacePanning = false
    // controls.minDistance = 10
    // controls.maxDistance = 150
    // controls.maxPolarAngle = Math.PI / 2


    /** OrbitControls */ 
    const controls = new OrbitControls( camera, studio.getRenderer().domElement );
    controls.maxPolarAngle = Math.PI / 2
    controls.target.set( 0, 0, -15);
    controls.update()
    controls.enablePan = true;
    controls.enableDamping = true;
    controls.maxDistance = 100
    controls.enableRotate = true
    //controls.mouseButtons = { LEFT: THREE.MOUSE.RIGHT, MIDDLE: THREE.MOUSE.MIDDLE, RIGHT: THREE.MOUSE.LEFT };
    controls.screenSpacePanning = true
    //controls.autoRotate = true
    //controls.autoRotateSpeed = 0.2


    window.onresize = function () {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix()
    }


    emitter.subscribe('frameUpdate', () => {
        controls.update();
    })

    return {
        camera,
    } 
}