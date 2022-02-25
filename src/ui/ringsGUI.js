import { GUI } from 'three/examples/jsm/libs/dat.gui.module.js'

export const createCreateRingGUI = (root) => {
    console.log(GUI)

    const { emitter } = root

    const panel = new GUI( { width: 310 } );


    const folder = panel.addFolder('Params');

    const settings = {
        'R': 15,
        'HEIGHT': 5,
        'TW': 10,
        'BW': 5,
        'HEIGHT': 5,
        'QUALITY': 60,
    };

    const settingsVals = {
        'R': [5, 60, 1],
        'HEIGHT': [1, 30, 1],
        'TW': [1, 10, 0.1],
        'BW': [1, 10, 0.1],
        'HEIGHT': [1, 10, 0.1],
        'QUALITY': [4, 60, 1],
    };

    for (let key in settings) {
        folder.add( settings, key, ...settingsVals[key] ).listen().onChange(v => {
            emitter.emit('changeRing', {type: key, val: v }) 
        });
    }
    folder.open();

    return {}
}
