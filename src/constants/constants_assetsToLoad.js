import '../assets/progress-img.png'
import '../assets/icon-map.png'

//import sceneSrc from '../assets/interier/scene.FBX'
//import floor01Src from '../assets/floor01.obj'

import pX from '../assets/env/pX.jpg'
import nX from '../assets/env/nX.jpg'
import pY from '../assets/env/pY.jpg'
import nY from '../assets/env/nY.jpg'
import pZ from '../assets/env/pZ.jpg'
import nZ from '../assets/env/nZ.jpg'

import bumpMap from '../assets/lettersMapBump.jpg'





export const ASSETS_TO_LOAD = [
    // {
    //     type: 'obj',
    //     filename: floor01Src,
    //     key: 'floor01'
    // },
    {
        type: 'cubeImg',
        filename: [pX, nX, pY, nY, pZ, nZ],
        key: 'env'
    },
    {
        type: 'img',
        filename: bumpMap,
        key: 'bumpMap'
    },
    // {
    //     type: 'img',
    //     filename: view2Src,
    //     key: 'view2'
    // },
    // {
    //     type: 'img',
    //     filename: view3Src,
    //     key: 'view3'
    // },
    // {
    //     type: 'img',
    //     filename: view4Src,
    //     key: 'view4'
    // },
]