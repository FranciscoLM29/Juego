export class Zona1 extends Phaser.Scene {
    constructor() {
        super({ key: 'niveles1' });
    }

    preload() {
        this.load.image('cueva', 'Imagenes/cueva.png');
        this.load.image('tituloc', 'Imagenes/BotonN.png');
        this.load.image('player', 'Imagenes/flecha.png');
        this.load.image('botonc1', 'Imagenes/Botones1/Boton1.png');
        this.load.image('botonc2', 'Imagenes/Botones1/Boton2.png');
        this.load.image('botonc3', 'Imagenes/Botones1/Boton3.png');
        this.load.image('botonc4', 'Imagenes/Botones1/Boton4.png');
        this.load.image('botonc5', 'Imagenes/Botones1/Boton5.png');
        this.load.image('botonc6', 'Imagenes/Botones1/Boton6.png');
        this.load.image('botonc7', 'Imagenes/Botones1/Boton7.png');
        this.load.image('botonc8', 'Imagenes/Botones1/Boton8.png');
        this.load.image('botonc9', 'Imagenes/Botones1/Boton9.png');
        this.load.image('botonc10', 'Imagenes/Botones1/Boton10.png');
        this.load.image('botonc11', 'Imagenes/Botones1/Boton11.png');
        this.load.image('botonc12', 'Imagenes/Botones1/Boton12.png');
        this.load.image('botonc13', 'Imagenes/Botones1/Boton13.png');
        this.load.image('botonc14', 'Imagenes/Botones1/Boton14.png');
        this.load.image('botonc15', 'Imagenes/Botones1/Boton15.png');
        this.load.image('registroc', 'Imagenes/Botones1/Registro.png');
    }

    create() {
        this.add.image(735, 330, 'cueva');
        this.add.image(735, 175, 'tituloc');
        this.add.image(427, 300, 'botonc1');
        this.add.image(577, 300, 'botonc2');
        this.add.image(727, 300, 'botonc3');
        this.add.image(877, 300, 'botonc4');
        this.add.image(1027, 300, 'botonc5');
        this.add.image(427, 400, 'botonc6');
        this.add.image(577, 400, 'botonc7');
        this.add.image(727, 400, 'botonc8');
        this.add.image(877, 400, 'botonc9');
        this.add.image(1027, 400, 'botonc10');
        this.add.image(427, 500, 'botonc11');
        this.add.image(577, 500, 'botonc12');
        this.add.image(727, 500, 'botonc13');
        this.add.image(877, 500, 'botonc14');
        this.add.image(1027, 500, 'botonc15');
        this.add.image(735, 605, 'registroc');
    
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
            const levelTime = localStorage.getItem(`level${i + 1}Time`);
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
            'nc1', 'nc2', 'nc3', 'nc4', 'nc5',
            'nc6', 'nc7', 'nc8', 'nc9', 'nc10',
            'nc11', 'nc12', 'nc13', 'nc14', 'nc15',
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
            localStorage.removeItem(`level${i + 1}Time`);
        }
        
        // O también borrar los tiempos guardados en el arreglo `buttonTimes`
        this.buttonTimes = [];
    }
}