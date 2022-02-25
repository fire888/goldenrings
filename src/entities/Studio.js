import * as THREE from 'three'

const vSh = `varying vec3 vWorldPosition;

void main() {

vec4 worldPosition = modelMatrix * vec4( position, 1.0 );
vWorldPosition = worldPosition.xyz;

gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

}`


const fSh = `
uniform vec3 topColor;
uniform vec3 bottomColor;
uniform float offset;
uniform float exponent;

varying vec3 vWorldPosition;

void main() {

float h = normalize( vWorldPosition + offset ).y;
gl_FragColor = vec4( mix( bottomColor, topColor, max( pow( max( h , 0.0), exponent ), 0.0 ) ), 1.0 );

}`




export function createStudio (emitterLink) {
  const emitter = emitterLink

  let camera, scene, renderer,
  assets = null


  renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById( 'webgl-canvas' ),
    antialias: true
  })
  renderer.setClearColor( 0x696c6d)
  renderer.setPixelRatio( window.devicePixelRatio)
  renderer.setSize( window.innerWidth, window.innerHeight )
  scene = new THREE.Scene()
  //scene.background = 0x777777
  const lightA = new THREE.AmbientLight( 0xffffff, 0.7 )
  lightA.position.set( 5, 5, 5 )
  scene.add( lightA )
  const light = new THREE.PointLight( 0xffffff, 3.5, 1000 );
  light.position.set( 0, 50, 500);
  scene.add( light );
  scene.fog = new THREE.Fog(0x576066, 0, 400)
  const hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.6 );
  hemiLight.color.setHSL( 0.6, 1, 0.6 );
  hemiLight.groundColor.setHSL( 0.095, 1, 0.75 );
  hemiLight.position.set( 0, 50, 0 );
  scene.add( hemiLight );

  const vertexShader = vSh;
  const fragmentShader = fSh;
  const uniforms = {
    'topColor': { value: new THREE.Color( 0x7bb9e5 ) },
    'bottomColor': { value: new THREE.Color( 0x7a8e90) },
    'offset': { value: 66 },
    'exponent': { value: 0.6 }
  };

 // scene.fog.color.copy( uniforms[ 'bottomColor' ].value );

  const skyGeo = new THREE.SphereGeometry( 4000, 32, 15 );
  const skyMat = new THREE.ShaderMaterial( {
    uniforms: uniforms,
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    side: THREE.BackSide
  })

  const sky = new THREE.Mesh( skyGeo, skyMat )
  scene.add( sky )


  const resize = () => {
    const size = renderer.domElement.parentNode.getBoundingClientRect();
    renderer.setSize( size.width, size.height )
    if (camera) {
      camera.aspect = size.width/size.height
      camera.updateProjectionMatrix()
    }
  }
  window.addEventListener('resize', resize)



  emitter.subscribe('frameUpdate', () => {
    if (!camera ) {
      return;
    }
    renderer.render( scene, camera )
  })


  return {
    initScene: function () {
      resize()
    },

    setCamera: function (cam) {
      camera = cam
      camera.add(light)
      scene.add(camera)
    },

    getRenderer() {
      return renderer
    },

    addToScene: function (mesh) {
      scene.add(mesh)
    },

    removeFromScene: mesh => {
      scene.remove(mesh)
    } 
  }
}
