export class Zona2 extends Phaser.Scene {
    constructor() {
        super({ key: 'niveles2' });
    }

    preload() {
        this.load.image('pantano', 'Imagenes/pantano.png');
        this.load.image('titulop', 'Imagenes/BotonP.png');
        this.load.image('player', 'Imagenes/flecha.png');
        this.load.image('botonp1', 'Imagenes/Botones2/Boton1.png');
        this.load.image('botonp2', 'Imagenes/Botones2/Boton2.png');
        this.load.image('botonp3', 'Imagenes/Botones2/Boton3.png');
        this.load.image('botonp4', 'Imagenes/Botones2/Boton4.png');
        this.load.image('botonp5', 'Imagenes/Botones2/Boton5.png');
        this.load.image('botonp6', 'Imagenes/Botones2/Boton6.png');
        this.load.image('botonp7', 'Imagenes/Botones2/Boton7.png');
        this.load.image('botonp8', 'Imagenes/Botones2/Boton8.png');
        this.load.image('botonp9', 'Imagenes/Botones2/Boton9.png');
        this.load.image('botonp10', 'Imagenes/Botones2/Boton10.png');
        this.load.image('botonp11', 'Imagenes/Botones2/Boton11.png');
        this.load.image('botonp12', 'Imagenes/Botones2/Boton12.png');
        this.load.image('botonp13', 'Imagenes/Botones2/Boton13.png');
        this.load.image('botonp14', 'Imagenes/Botones2/Boton14.png');
        this.load.image('botonp15', 'Imagenes/Botones2/Boton15.png');
        this.load.image('registrop', 'Imagenes/Botones2/Registro.png');
    }

    create() {
        this.add.image(735, 330, 'pantano');
        this.add.image(735, 175, 'titulop');
        this.add.image(427, 300, 'botonp1');
        this.add.image(577, 300, 'botonp2');
        this.add.image(727, 300, 'botonp3');
        this.add.image(877, 300, 'botonp4');
        this.add.image(1027, 300, 'botonp5');
        this.add.image(427, 400, 'botonp6');
        this.add.image(577, 400, 'botonp7');
        this.add.image(727, 400, 'botonp8');
        this.add.image(877, 400, 'botonp9');
        this.add.image(1027, 400, 'botonp10');
        this.add.image(427, 500, 'botonp11');
        this.add.image(577, 500, 'botonp12');
        this.add.image(727, 500, 'botonp13');
        this.add.image(877, 500, 'botonp14');
        this.add.image(1027, 500, 'botonp15');
        this.add.image(735, 605, 'registrop');

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
            const levelTime = localStorage.getItem(`level${i + 16}Time`);
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
            'np1', 'np2', 'np3', 'np4', 'np5',
            'np6', 'np7', 'np8', 'np9', 'np10',
            'np11', 'np12', 'np13', 'np14', 'np15',
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
            localStorage.removeItem(`level${i + 16}Time`);
        }
        
        // O también borrar los tiempos guardados en el arreglo `buttonTimes`
        this.buttonTimes = [];
    }
}