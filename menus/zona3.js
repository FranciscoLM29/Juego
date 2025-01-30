export class Zona3 extends Phaser.Scene {
    constructor() {
        super({ key: 'niveles3' });
    }

    preload() {
        this.load.image('hielo', 'Imagenes/helado.png');
        this.load.image('tituloh', 'Imagenes/BotonH.png');
        this.load.image('player', 'Imagenes/flecha.png');
        this.load.image('botonh1', 'Imagenes/Botones3/Boton1.png');
        this.load.image('botonh2', 'Imagenes/Botones3/Boton2.png');
        this.load.image('botonh3', 'Imagenes/Botones3/Boton3.png');
        this.load.image('botonh4', 'Imagenes/Botones3/Boton4.png');
        this.load.image('botonh5', 'Imagenes/Botones3/Boton5.png');
        this.load.image('botonh6', 'Imagenes/Botones3/Boton6.png');
        this.load.image('botonh7', 'Imagenes/Botones3/Boton7.png');
        this.load.image('botonh8', 'Imagenes/Botones3/Boton8.png');
        this.load.image('botonh9', 'Imagenes/Botones3/Boton9.png');
        this.load.image('botonh10', 'Imagenes/Botones3/Boton10.png');
        this.load.image('botonh11', 'Imagenes/Botones3/Boton11.png');
        this.load.image('botonh12', 'Imagenes/Botones3/Boton12.png');
        this.load.image('botonh13', 'Imagenes/Botones3/Boton13.png');
        this.load.image('botonh14', 'Imagenes/Botones3/Boton14.png');
        this.load.image('botonh15', 'Imagenes/Botones3/Boton15.png');
        this.load.image('registroh', 'Imagenes/Botones3/Registro.png');
    }

    create() {
        this.add.image(735, 330, 'hielo');
        this.add.image(735, 175, 'tituloh');
        this.add.image(427, 300, 'botonh1');
        this.add.image(577, 300, 'botonh2');
        this.add.image(727, 300, 'botonh3');
        this.add.image(877, 300, 'botonh4');
        this.add.image(1027, 300, 'botonh5');
        this.add.image(427, 400, 'botonh6');
        this.add.image(577, 400, 'botonh7');
        this.add.image(727, 400, 'botonh8');
        this.add.image(877, 400, 'botonh9');
        this.add.image(1027, 400, 'botonh10');
        this.add.image(427, 500, 'botonh11');
        this.add.image(577, 500, 'botonh12');
        this.add.image(727, 500, 'botonh13');
        this.add.image(877, 500, 'botonh14');
        this.add.image(1027, 500, 'botonh15');
        this.add.image(735, 605, 'registroh');

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
            const levelTime = localStorage.getItem(`level${i + 31}Time`);
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
            'nh1', 'nh2', 'nh3', 'nh4', 'nh5',
            'nh6', 'nh7', 'nh8', 'nh9', 'nh10',
            'nh11', 'nh12', 'nh13', 'nh14', 'nh15',
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
            localStorage.removeItem(`level${i + 31}Time`);
        }
        
        // O también borrar los tiempos guardados en el arreglo `buttonTimes`
        this.buttonTimes = [];
    }
}