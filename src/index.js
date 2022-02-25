
import { showStartButton, hideStartScreen } from './ui/hideStartScreen'
import { createStudio } from './entities/Studio'
import { createEventEmitter } from './utils/createEventEmitter'
import { createLoadManager } from './helpers/LoadManager'
import { createCamera } from './entities/Camera'
import { startFrameUpater } from './utils/createFrameUpater'
import { ASSETS_TO_LOAD } from './constants/constants_assetsToLoad'
import { createSystemRings } from './systems/system_Rings'
import { createCreateRingGUI } from './ui/ringsGUI'


const root = {}



/** INIT  ***********************************************************/


const initApp = () => {
  root.emitter = createEventEmitter()
  root.frameUpdater = startFrameUpater(root.emitter)

  root.studio = createStudio(root.emitter)
  root.studio.initScene()


  root.camMovies = createCamera(root)
  root.studio.setCamera(root.camMovies.camera)

  root.loadManager = new createLoadManager()
  root.loadManager.startLoad(ASSETS_TO_LOAD).then(assets => {

    root.system_rings = createSystemRings(root, assets)
    root.ringGUI = createCreateRingGUI(root)
    hideStartScreen()
  })
}


window.addEventListener('load', initApp)

