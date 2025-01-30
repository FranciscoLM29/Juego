export class Zona4 extends Phaser.Scene {
    constructor() {
        super({ key: 'niveles4' });
    }

    preload() {
        this.load.image('templo', 'Imagenes/templo.png');
        this.load.image('titulot', 'Imagenes/BotonT.png');
        this.load.image('player', 'Imagenes/flecha.png');
        this.load.image('botont1', 'Imagenes/Botones4/Boton1.png');
        this.load.image('botont2', 'Imagenes/Botones4/Boton2.png');
        this.load.image('botont3', 'Imagenes/Botones4/Boton3.png');
        this.load.image('botont4', 'Imagenes/Botones4/Boton4.png');
        this.load.image('botont5', 'Imagenes/Botones4/Boton5.png');
        this.load.image('botont6', 'Imagenes/Botones4/Boton6.png');
        this.load.image('botont7', 'Imagenes/Botones4/Boton7.png');
        this.load.image('botont8', 'Imagenes/Botones4/Boton8.png');
        this.load.image('botont9', 'Imagenes/Botones4/Boton9.png');
        this.load.image('botont10', 'Imagenes/Botones4/Boton10.png');
        this.load.image('botont11', 'Imagenes/Botones4/Boton11.png');
        this.load.image('botont12', 'Imagenes/Botones4/Boton12.png');
        this.load.image('botont13', 'Imagenes/Botones4/Boton13.png');
        this.load.image('botont14', 'Imagenes/Botones4/Boton14.png');
        this.load.image('botont15', 'Imagenes/Botones4/Boton15.png');
        this.load.image('registrot', 'Imagenes/Botones4/Registro.png');
    }

    create() {
        this.add.image(735, 330, 'templo');
        this.add.image(735, 175, 'titulot');
        this.add.image(427, 300, 'botont1');
        this.add.image(577, 300, 'botont2');
        this.add.image(727, 300, 'botont3');
        this.add.image(877, 300, 'botont4');
        this.add.image(1027, 300, 'botont5');
        this.add.image(427, 400, 'botont6');
        this.add.image(577, 400, 'botont7');
        this.add.image(727, 400, 'botont8');
        this.add.image(877, 400, 'botont9');
        this.add.image(1027, 400, 'botont10');
        this.add.image(427, 500, 'botont11');
        this.add.image(577, 500, 'botont12');
        this.add.image(727, 500, 'botont13');
        this.add.image(877, 500, 'botont14');
        this.add.image(1027, 500, 'botont15');
        this.add.image(735, 605, 'registrot');

        // Crear botones y punteros
        const buttonPositions = [
            { x: 427, y: 300 },
            { x: 577, y: 300 },
            { x: 727, y: 300 },
            { x: 877, y: 300 },
            { x: 1027, y: 300 },
            { x: 427, y: 400 },
            { x: 577, y: 400 },
            { x: 727, y: 400 },
            { x: 877, y: 400 },
            { x: 1027, y: 400 },
            { x: 427, y: 500 },
            { x: 577, y: 500 },
            { x: 727, y: 500 },
            { x: 877, y: 500 },
            { x: 1027, y: 500 },
        ];

        this.pointers = buttonPositions.map(pos => this.add.image(pos.x + 70, pos.y, 'player').setVisible(false));
        this.pointers[0].setVisible(true); // Mostrar solo el primer puntero

        this.input.keyboard.on('keydown-ESC', () => {
            this.scene.start('menu'); // Cambia a la escena del menú
        });

        // Tiempos asociados a los botones
        this.buttonTimes = Array(15).fill(0); // Inicializa los tiempos con 0

        // Obtener y actualizar los tiempos de los niveles desde localStorage
        for (let i = 0; i < 15; i++) {
            const levelTime = localStorage.getItem(`level${i + 46}Time`);
            if (levelTime) {
                this.buttonTimes[i] = levelTime;
            }
        }

        this.input.keyboard.on('keydown-D', () => {
            this.clearLevelTimes();
            console.log('Tiempos borrados.');
        });

        // Índice actual del puntero
        this.currentIndex = 0;

        // Texto dinámico para mostrar el tiempo
        this.timeText = this.add.text(735, 580, '', {
            font: '20px Arial',
            fill: '#ffffff',
        }).setOrigin(0.5);

        // Entrada del teclado
        this.cursors = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.UP,
            down: Phaser.Input.Keyboard.KeyCodes.DOWN,
            left: Phaser.Input.Keyboard.KeyCodes.LEFT,
            right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
            enter: Phaser.Input.Keyboard.KeyCodes.ENTER,
        });

        // Mapa de índices a escenas
        this.scenes = [
            'nt1', 'nt2', 'nt3', 'nt4', 'nt5',
            'nt6', 'nt7', 'nt8', 'nt9', 'nt10',
            'nt11', 'nt12', 'nt13', 'nt14', 'nt15',
        ];

        // Mostrar tiempo inicial del botón actual
        this.updateTimeText();
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.cursors.left)) {
            this.changePointer(-1);
        }
        if (Phaser.Input.Keyboard.JustDown(this.cursors.right)) {
            this.changePointer(1);
        }
        if (Phaser.Input.Keyboard.JustDown(this.cursors.up)) {
            this.changePointer(-5);
        }
        if (Phaser.Input.Keyboard.JustDown(this.cursors.down)) {
            this.changePointer(5);
        }
        if (Phaser.Input.Keyboard.JustDown(this.cursors.enter)) {
            this.startScene();
        }
    }

    changePointer(offset) {
        // Oculta el indicador actual
        this.pointers[this.currentIndex].setVisible(false);

        // Calcula el nuevo índice
        this.currentIndex = (this.currentIndex + offset + this.pointers.length) % this.pointers.length;

        // Muestra el nuevo indicador
        this.pointers[this.currentIndex].setVisible(true);

        // Actualiza el texto del tiempo
        this.updateTimeText();
    }

    updateTimeText() {
        const currentTime = this.buttonTimes[this.currentIndex];
        this.timeText.setText(`Tiempo: ${currentTime}s`);
    }

    startScene() {
        const sceneToStart = this.scenes[this.currentIndex];
        if (sceneToStart) {
            this.scene.start(sceneToStart);
        }
    }

    clearLevelTimes() {
        // Borrar todos los tiempos de los niveles
        for (let i = 0; i < 15; i++) {
            localStorage.removeItem(`level${i + 46}Time`);
        }
        
        // O también borrar los tiempos guardados en el arreglo `buttonTimes`
        this.buttonTimes = [];
    }
}