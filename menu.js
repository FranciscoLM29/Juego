export class Menu extends Phaser.Scene {
    constructor() {
        super({ key: 'menu' });
    }

    preload() {
        this.load.image('background', 'Imagenes/FondoMenu.png');
        this.load.image('titulo', 'Imagenes/title.png');
        this.load.image('player', 'Imagenes/flecha.png');
        this.load.image('boton1', 'Imagenes/BotonI.png');
        this.load.image('boton2', 'Imagenes/BotonN.png');
        this.load.image('boton3', 'Imagenes/BotonP.png');
        this.load.image('boton4', 'Imagenes/BotonH.png');
        this.load.image('boton5', 'Imagenes/BotonT.png');
        this.load.image('boton6', 'Imagenes/BotonE.png');
    }

    create() {
        this.add.image(735, 330, 'background');
        this.add.image(735, 100, 'titulo');
        this.add.image(335, 310, 'boton1');
        this.add.image(725, 310, 'boton2');
        this.add.image(1115, 310, 'boton3');
        this.add.image(335, 530, 'boton4');
        this.add.image(725, 530, 'boton5');
        this.add.image(1115, 530, 'boton6');

        this.pointers = [
            this.add.image(540, 310, 'player'),
            this.add.image(920, 310, 'player'),
            this.add.image(1310, 310, 'player'),
            this.add.image(540, 530, 'player'),
            this.add.image(920, 530, 'player'),
            this.add.image(1310, 530, 'player'),
        ];

        // Inicializa todos los indicadores como invisibles excepto el primero
        this.pointers.forEach((pointer, index) => {
            pointer.visible = index === 0;
        });

        // Índice del indicador actual
        this.currentIndex = 0;

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
            'tutorial', // Escena asociada a p1
            'niveles1', // Escena asociada a p2
            'niveles2', // Escena asociada a p3
            'niveles3', // Escena asociada a p4
            'niveles4', // Escena asociada a p5
            'niveles5', // Escena asociada a p6
        ];
    }

    update() {
        // Mover a la izquierda
        if (Phaser.Input.Keyboard.JustDown(this.cursors.left)) {
            this.changePointer(-1);
        }

        // Mover a la derecha
        if (Phaser.Input.Keyboard.JustDown(this.cursors.right)) {
            this.changePointer(1);
        }

        // Mover hacia arriba
        if (Phaser.Input.Keyboard.JustDown(this.cursors.up)) {
            this.changePointer(-3); // Sube una fila
        }

        // Mover hacia abajo
        if (Phaser.Input.Keyboard.JustDown(this.cursors.down)) {
            this.changePointer(3); // Baja una fila
        }

        // Cambiar a una nueva escena al presionar Enter
        if (Phaser.Input.Keyboard.JustDown(this.cursors.enter)) {
            this.startScene();
        }
    }

    changePointer(offset) {
        // Oculta el indicador actual
        this.pointers[this.currentIndex].visible = false;

        // Calcula el nuevo índice con límites
        this.currentIndex = (this.currentIndex + offset + this.pointers.length) % this.pointers.length;

        // Muestra el nuevo indicador
        this.pointers[this.currentIndex].visible = true;
    }

    startScene() {
        const sceneToStart = this.scenes[this.currentIndex];
        if (sceneToStart) {
            this.scene.start(sceneToStart);
        }
    }
}

