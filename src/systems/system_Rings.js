import * as THREE from 'three'
//import { createMesh } from '../entities/Arrow'


const { sin, cos, PI } = Math


export const createSystemRings = (root, assets) => {

    const mat =  new THREE.MeshPhongMaterial({
        color: 0x55FF00,
        emissive: 0x7795d3,
        specular: 0xffffff,
        shininess: 100,
        envMap: assets.env,
        bumpMap: assets.bumpMap,
        bumpScale: 0.3,
        reflectivity: .7,
        side: THREE.DoubleSide, 
        //transparent: true,
        //opacity: 0.8,
    })


    const DEFAULT_DATA = {
        TW: 10,
        HEIGHT: 5,
        BW: 5,
        R: 15,
        QUALITY: 60,
    }

    const geom = createGeom(DEFAULT_DATA)
    const mesh = new THREE.Mesh(geom, mat)
    root.studio.addToScene(mesh)

    root.emitter.subscribe('changeRing', data => {
        const { type, val } = data
        DEFAULT_DATA[type] = val

        let g = mesh.geometry
        mesh.geometry = createGeom(DEFAULT_DATA)
        mesh.geometry.needsUpdate = true
        g.dispose()
    }) 

    return {}
}






const createGeom = data => {

    const {
        TW,
        HEIGHT,
        BW,
        R,
        QUALITY,
    } = data

    
    const angle = PI * 2 / QUALITY 
    
    const pos = []
    const nor = []
    const uv = []

    for (let i = 0; i < QUALITY; ++i) {        
        const a1 = angle * i
        let a2 = angle * (i + 1)
        if (i === QUALITY - 1) {
            a2 = 0          
        }

        /** TOP GEOM ************************/ 
        pos.push(
            -TW, sin(a1) * R, cos(a1) * R,
            TW, sin(a1) * R, cos(a1) * R,
            TW, sin(a2) * R, cos(a2) * R,

            -TW, sin(a1) * R, cos(a1) * R,
            TW, sin(a2) * R, cos(a2) * R,
            -TW, sin(a2) * R, cos(a2) * R,
        ) 

        nor.push(
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
        )

        uv.push(
            0.0, 0.0,
            1.0, 0.0,
            1.0, 1.0,
    
            0.0, 0.0,
            1.0, 1.0,
            0.0, 1.0,
        )

        /** BOTTOM GEOM */ 

        const r2 = R - HEIGHT

        pos.push(
            -BW, sin(a1) * r2, cos(a1) * r2,
            BW, sin(a1) * r2, cos(a1) * r2,
            BW, sin(a2) * r2, cos(a2) * r2,

            -BW, sin(a1) * r2, cos(a1) * r2,
            BW, sin(a2) * r2, cos(a2) * r2,
            -BW, sin(a2) * r2, cos(a2) * r2,
        ) 

        nor.push(
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
        )

        uv.push(
            0.0, 0.0,
            1.0, 0.0,
            1.0, 1.0,
    
            0.0, 0.0,
            1.0, 1.0,
            0.0, 1.0,
        )

        /** LEFT GEOM */
        pos.push(
            -BW, sin(a2) * r2, cos(a2) * r2,
            -BW, sin(a1) * r2, cos(a1) * r2,
            -TW, sin(a1) * R, cos(a1) * R,

            -BW, sin(a2) * r2, cos(a2) * r2,
            -TW, sin(a1) * R, cos(a1) * R,
            -TW, sin(a2) * R, cos(a2) * R,
        ) 

        nor.push(
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
        )

        uv.push(
            0.0, 0.0,
            1.0, 0.0,
            1.0, 1.0,
    
            0.0, 0.0,
            1.0, 1.0,
            0.0, 1.0,
        )


        /** RIGHT GEOM */
        pos.push(
            BW, sin(a2) * r2, cos(a2) * r2,
            BW, sin(a1) * r2, cos(a1) * r2,
            TW, sin(a1) * R, cos(a1) * R,

            BW, sin(a2) * r2, cos(a2) * r2,
            TW, sin(a1) * R, cos(a1) * R,
            TW, sin(a2) * R, cos(a2) * R,
        ) 

        nor.push(
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
        )

        uv.push(
            0.0, 0.0,
            1.0, 0.0,
            1.0, 1.0,
    
            0.0, 0.0,
            1.0, 1.0,
            0.0, 1.0,
        )
    }

    const geom = new THREE.BufferGeometry()
    geom.addAttribute('position', new THREE.BufferAttribute( new Float32Array(pos), 3))				
    geom.addAttribute('normal', new THREE.BufferAttribute(new Float32Array(nor), 3))
    geom.addAttribute( 'uv', new THREE.BufferAttribute(new Float32Array(uv), 2))

    return geom
}



