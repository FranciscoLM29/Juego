import { Menu } from './menu.js';
import { Zona1 } from './menus/zona1.js';
import { Zona2 } from './menus/zona2.js';
import { Zona3 } from './menus/zona3.js';
import { Zona4 } from './menus/zona4.js';
import { Zona5 } from './menus/zona5.js';
import { Tutorial } from './menus/tutorial.js';
import { Zona1N1 } from './nivelescueva/nivel1-1.js';
import { Zona1N2 } from './nivelescueva/nivel1-2.js';
import { Zona1N3 } from './nivelescueva/nivel1-3.js';
import { Zona1N4 } from './nivelescueva/nivel1-4.js';
import { Zona1N5 } from './nivelescueva/nivel1-5.js';
import { Zona1N6 } from './nivelescueva/nivel1-6.js';
import { Zona1N7 } from './nivelescueva/nivel1-7.js';
import { Zona1N8 } from './nivelescueva/nivel1-8.js';
import { Zona1N9 } from './nivelescueva/nivel1-9.js';
import { Zona1N10 } from './nivelescueva/nivel1-10.js';
import { Zona1N11 } from './nivelescueva/nivel1-11.js';
import { Zona1N12 } from './nivelescueva/nivel1-12.js';
import { Zona1N13 } from './nivelescueva/nivel1-13.js';
import { Zona1N14 } from './nivelescueva/nivel1-14.js';
import { Zona1N15 } from './nivelescueva/nivel1-15.js';
import { Zona2N1 } from './nivelespantano/nivel2-1.js';
import { Zona2N2 } from './nivelespantano/nivel2-2.js';
import { Zona2N3 } from './nivelespantano/nivel2-3.js';
import { Zona2N4 } from './nivelespantano/nivel2-4.js';
import { Zona2N5 } from './nivelespantano/nivel2-5.js';
import { Zona2N6 } from './nivelespantano/nivel2-6.js';
import { Zona2N7 } from './nivelespantano/nivel2-7.js';
import { Zona2N8 } from './nivelespantano/nivel2-8.js';
import { Zona2N9 } from './nivelespantano/nivel2-9.js';
import { Zona2N10 } from './nivelespantano/nivel2-10.js';
import { Zona2N11 } from './nivelespantano/nivel2-11.js';
import { Zona2N12 } from './nivelespantano/nivel2-12.js';
import { Zona2N13 } from './nivelespantano/nivel2-13.js';
import { Zona2N14 } from './nivelespantano/nivel2-14.js';
import { Zona2N15 } from './nivelespantano/nivel2-15.js';
import { Zona3N1 } from './niveleshielo/nivel3-1.js';
import { Zona3N2 } from './niveleshielo/nivel3-2.js';
import { Zona3N3 } from './niveleshielo/nivel3-3.js';
import { Zona3N4 } from './niveleshielo/nivel3-4.js';
import { Zona3N5 } from './niveleshielo/nivel3-5.js';
import { Zona3N6 } from './niveleshielo/nivel3-6.js';
import { Zona3N7 } from './niveleshielo/nivel3-7.js';
import { Zona3N8 } from './niveleshielo/nivel3-8.js';
import { Zona3N9 } from './niveleshielo/nivel3-9.js';
import { Zona3N10 } from './niveleshielo/nivel3-10.js';
import { Zona3N11 } from './niveleshielo/nivel3-11.js';
import { Zona3N12 } from './niveleshielo/nivel3-12.js';
import { Zona3N13 } from './niveleshielo/nivel3-13.js';
import { Zona3N14 } from './niveleshielo/nivel3-14.js';
import { Zona3N15 } from './niveleshielo/nivel3-15.js';
import { Zona4N1 } from './nivelestemplo/nivel4-1.js';
import { Zona4N2 } from './nivelestemplo/nivel4-2.js';
import { Zona4N3 } from './nivelestemplo/nivel4-3.js';
import { Zona4N4 } from './nivelestemplo/nivel4-4.js';
import { Zona4N5 } from './nivelestemplo/nivel4-5.js';
import { Zona4N6 } from './nivelestemplo/nivel4-6.js';
import { Zona4N7 } from './nivelestemplo/nivel4-7.js';
import { Zona4N8 } from './nivelestemplo/nivel4-8.js';
import { Zona4N9 } from './nivelestemplo/nivel4-9.js';
import { Zona4N10 } from './nivelestemplo/nivel4-10.js';
import { Zona4N11 } from './nivelestemplo/nivel4-11.js';
import { Zona4N12 } from './nivelestemplo/nivel4-12.js';
import { Zona4N13 } from './nivelestemplo/nivel4-13.js';
import { Zona4N14 } from './nivelestemplo/nivel4-14.js';
import { Zona4N15 } from './nivelestemplo/nivel4-15.js';
import { Zona5N1 } from './niveleslaboratorio/nivel5-1.js';
import { Zona5N2 } from './niveleslaboratorio/nivel5-2.js';
import { Zona5N3 } from './niveleslaboratorio/nivel5-3.js';
import { Zona5N4 } from './niveleslaboratorio/nivel5-4.js';
import { Zona5N5 } from './niveleslaboratorio/nivel5-5.js';
import { Zona5N6 } from './niveleslaboratorio/nivel5-6.js';
import { Zona5N7 } from './niveleslaboratorio/nivel5-7.js';
import { Zona5N8 } from './niveleslaboratorio/nivel5-8.js';
import { Zona5N9 } from './niveleslaboratorio/nivel5-9.js';
import { Zona5N10 } from './niveleslaboratorio/nivel5-10.js';
import { Zona5N11 } from './niveleslaboratorio/nivel5-11.js';
import { Zona5N12 } from './niveleslaboratorio/nivel5-12.js';
import { Zona5N13 } from './niveleslaboratorio/nivel5-13.js';
import { Zona5N14 } from './niveleslaboratorio/nivel5-14.js';
import { Zona5N15 } from './niveleslaboratorio/nivel5-15.js';


const config = {
    type: Phaser.AUTO,
    width: 1470,
    height: 660,
    scene: [Menu, Zona1, Zona2, Zona3, Zona4, Zona5, Tutorial,
        Zona1N1, Zona1N2, Zona1N3, Zona1N4, Zona1N5,
        Zona1N6, Zona1N7, Zona1N8, Zona1N9, Zona1N10,
        Zona1N11, Zona1N12, Zona1N13, Zona1N14, Zona1N15,
        Zona2N1, Zona2N2, Zona2N3, Zona2N4, Zona2N5,
        Zona2N6, Zona2N7, Zona2N8, Zona2N9, Zona2N10,
        Zona2N11, Zona2N12, Zona2N13, Zona2N14, Zona2N15,
        Zona3N1, Zona3N2, Zona3N3, Zona3N4, Zona3N5,
        Zona3N6, Zona3N7, Zona3N8, Zona3N9, Zona3N10,
        Zona3N11, Zona3N12, Zona3N13, Zona3N14, Zona3N15,
        Zona4N1, Zona4N2, Zona4N3, Zona4N4, Zona4N5,
        Zona4N6, Zona4N7, Zona4N8, Zona4N9, Zona4N10,
        Zona4N11, Zona4N12, Zona4N13, Zona4N14, Zona4N15,
        Zona5N1, Zona5N2, Zona5N3, Zona5N4, Zona5N5,
        Zona5N6, Zona5N7, Zona5N8, Zona5N9, Zona5N10,
        Zona5N11, Zona5N12, Zona5N13, Zona5N14, Zona5N15],
    physics: {
        default: 'arcade',       
    }
}
var game = new Phaser.Game(config);