export class Zona5 extends Phaser.Scene {
    constructor() {
        super({ key: 'niveles5' });
    }

    preload() {
        this.load.image('laboratorio', 'Imagenes/laboratorio.png');
        this.load.image('titulol', 'Imagenes/BotonE.png');
        this.load.image('player', 'Imagenes/flecha.png');
        this.load.image('botonl1', 'Imagenes/Botones5/Boton1.png');
        this.load.image('botonl2', 'Imagenes/Botones5/Boton2.png');
        this.load.image('botonl3', 'Imagenes/Botones5/Boton3.png');
        this.load.image('botonl4', 'Imagenes/Botones5/Boton4.png');
        this.load.image('botonl5', 'Imagenes/Botones5/Boton5.png');
        this.load.image('botonl6', 'Imagenes/Botones5/Boton6.png');
        this.load.image('botonl7', 'Imagenes/Botones5/Boton7.png');
        this.load.image('botonl8', 'Imagenes/Botones5/Boton8.png');
        this.load.image('botonl9', 'Imagenes/Botones5/Boton9.png');
        this.load.image('botonl10', 'Imagenes/Botones5/Boton10.png');
        this.load.image('botonl11', 'Imagenes/Botones5/Boton11.png');
        this.load.image('botonl12', 'Imagenes/Botones5/Boton12.png');
        this.load.image('botonl13', 'Imagenes/Botones5/Boton13.png');
        this.load.image('botonl14', 'Imagenes/Botones5/Boton14.png');
        this.load.image('botonl15', 'Imagenes/Botones5/Boton15.png');
        this.load.image('registrol', 'Imagenes/Botones5/Registro.png');
    }

    create() {
        this.add.image(735, 330, 'laboratorio');
        this.add.image(735, 175, 'titulol');
        this.add.image(427, 300, 'botonl1');
        this.add.image(577, 300, 'botonl2');
        this.add.image(727, 300, 'botonl3');
        this.add.image(877, 300, 'botonl4');
        this.add.image(1027, 300, 'botonl5');
        this.add.image(427, 400, 'botonl6');
        this.add.image(577, 400, 'botonl7');
        this.add.image(727, 400, 'botonl8');
        this.add.image(877, 400, 'botonl9');
        this.add.image(1027, 400, 'botonl10');
        this.add.image(427, 500, 'botonl11');
        this.add.image(577, 500, 'botonl12');
        this.add.image(727, 500, 'botonl13');
        this.add.image(877, 500, 'botonl14');
        this.add.image(1027, 500, 'botonl15');
        this.add.image(735, 605, 'registrol');

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
    
        // Tiempos asociados a los botones (cargar desde localStorage)
        this.buttonTimes = Array(15).fill(0); // Inicializa los tiempos con 0
    
        // Obtener y actualizar los tiempos de los niveles desde localStorage
        for (let i = 0; i < 15; i++) {
            const levelTime = localStorage.getItem(`level${i + 61}Time`);
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
            'nl1', 'nl2', 'nl3', 'nl4', 'nl5',
            'nl6', 'nl7', 'nl8', 'nl9', 'nl10',
            'nl11', 'nl12', 'nl13', 'nl14', 'nl15',
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
            localStorage.removeItem(`level${i + 61}Time`);
        }
        
        // O también borrar los tiempos guardados en el arreglo `buttonTimes`
        this.buttonTimes = [];
    }
}