import * as THREE from 'three'


export function createPlayer ( eventEmitter ) {
    
  const emitter = eventEmitter

  let mainObj
  let frontObj

  let camera
  let keys = null
  let isOn = true
  let speed = 1

  const initPlayer = () => {
    mainObj = new THREE.Object3D()
    mainObj.position.set(0, 100.722, 0)
    
    camera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 0.1, 1000 )
    camera.position.set(0, 0, 0)
    mainObj.add(camera)

    frontObj = new THREE.Object3D()
    frontObj.position.set(0, -4, -1)
    mainObj.add( frontObj )

    const light = new THREE.PointLight(0xffffff, 0.4)
    light.position.set(0, 35, 0)
    mainObj.add(light)

    emitter.subscribe('keyEvent', data => keys = data)
    emitter.subscribe('frameUpdate', update)
  }

  const update = () => {
    if ( !keys || !isOn ) {
      return;
    }
    if (keys['up'] === true) {            
          mainObj.translateZ( -speed )
    }
    if (keys['left'] === true) {
      mainObj.rotation.y += 0.02
    }
    if (keys['right'] === true) {
      mainObj.rotation.y -= 0.02
    }
  }

  return { 
    init () {
      initPlayer()
    },

    getObj: function() {
      return mainObj;
    },

    getCamera: function() {
      return camera;
    },

    getMesh () {
      return mesh;
    },

    disable () {
      isOn = false
    },
  }
}