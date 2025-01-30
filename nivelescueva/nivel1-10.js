const TILE_SIZE = 75;  // Tamaño de cada casilla de la cuadrícula
const GRID_WIDTH = 15;  // Número de columnas
const GRID_HEIGHT = 7;  // Número de filas

export class Zona1N10 extends Phaser.Scene {
    constructor() {
        super({ key: 'nc10' });
        this.currentGrid = 1; // Valor predeterminado
        this.grids = [
            {
                background: 'cueva',
                ladder: { x: 12, y: 5 },
                itemPosition: { x: 20, y: 20 },
                rocks: {
                    fixed: [
                        { x: 5, y: 0 },
                        { x: 14, y: 1 },
                        { x: 9, y: 0 },
                        { x: 3, y: 2 },
                        { x: 7, y: 2 },
                        { x: 9, y: 2 },
                        { x: 12, y: 3 },
                        { x: 4, y: 3 },
                        { x: 2, y: 3 },
                        { x: 0, y: 5 },
                        { x: 6, y: 5 },
                        { x: 11, y: 4 },
                        { x: 14, y: 5 },
                        { x: 7, y: 6 },
                        { x: 3, y: 6 },
                        { x: 9, y: 6 },
                        { x: 13, y: 6 }
                    ],
                    pushable: [
                        { x: 1, y: 0 },
                        { x: 7, y: 0 },
                        { x: 3, y: 0 },
                        { x: 11, y: 0 },
                        { x: 13, y: 0 },
                        { x: 0, y: 1 },
                        { x: 4, y: 1 },
                        { x: 8, y: 1 },
                        { x: 6, y: 1 },
                        { x: 10, y: 1 },
                        { x: 12, y: 1 },
                        { x: 13, y: 2 },
                        { x: 11, y: 2 },
                        { x: 5, y: 2 },
                        { x: 1, y: 2 },
                        { x: 14, y: 3 },
                        { x: 10, y: 3 },
                        { x: 8, y: 3 },
                        { x: 6, y: 3 },
                        { x: 0, y: 3 },
                        { x: 3, y: 4 },
                        { x: 5, y: 4 },
                        { x: 1, y: 4 },
                        { x: 7, y: 4 },
                        { x: 9, y: 4 },
                        { x: 13, y: 4 },
                        { x: 2, y: 5 },
                        { x: 4, y: 5 },
                        { x: 8, y: 5 },
                        { x: 10, y: 5 },
                        { x: 11, y: 6 },
                        { x: 5, y: 6 }
                    ],
                },
            },
            {
                background: 'cueva',
                ladder: { x: 8, y: 2 },
                itemPosition: { x: 1, y: 1 },
                rocks: {
                    fixed: [
                        { x: 6, y: 0 },
                        { x: 7, y: 1 },
                        { x: 6, y: 2 },
                        { x: 7, y: 3 },
                        { x: 8, y: 4 },
                        { x: 11, y: 3 },
                        { x: 9, y: 3 },
                        { x: 8, y: 0 },
                        { x: 0, y: 0 },
                        { x: 5, y: 5 },
                        { x: 0, y: 6 },
                        { x: 10, y: 6 },
                        { x: 4, y: 0 },
                        { x: 14, y: 0 },
                        { x: 14, y: 6 },
                        { x: 14, y: 4 },
                        { x: 0, y: 2 },
                        { x: 12, y: 0 },
                        { x: 2, y: 4 }
                    ],
                    pushable: [
                        { x: 3, y: 1 },
                        { x: 11, y: 1 },
                        { x: 5, y: 1 },
                        { x: 9, y: 1 },
                        { x: 13, y: 1 },
                        { x: 2, y: 2 },
                        { x: 10, y: 0 },
                        { x: 2, y: 0 },
                        { x: 4, y: 2 },
                        { x: 10, y: 2 },
                        { x: 12, y: 2 },
                        { x: 14, y: 2 },
                        { x: 1, y: 3 },
                        { x: 3, y: 3 },
                        { x: 5, y: 3 },
                        { x: 13, y: 3 },
                        { x: 0, y: 4 },
                        { x: 4, y: 4 },
                        { x: 6, y: 4 },
                        { x: 10, y: 4 },
                        { x: 12, y: 4 },
                        { x: 1, y: 5 },
                        { x: 3, y: 5 },
                        { x: 7, y: 5 },
                        { x: 9, y: 5 },
                        { x: 11, y: 5 },
                        { x: 13, y: 5 },
                        { x: 2, y: 6 },
                        { x: 4, y: 6 },
                        { x: 6, y: 6 },
                        { x: 8, y: 6 },
                        { x: 12, y: 6 }
                    ],
                },
            },
        ];
    }
    
    init(data) {
        // Establecer la cuadrícula inicial desde los datos pasados
        this.currentGrid = data.startGrid || 1; // Por defecto la cuadrícula 1
    }

    preload() {
        // Cargar imágenes y sprites
        this.load.image('cueva', 'Imagenes/cueva.png');
        this.load.image('tile1', 'Imagenes/Botones1/casilla.png');
        this.load.spritesheet('slimi', 'Imagenes/slimi.png', {
            frameWidth: TILE_SIZE,
            frameHeight: TILE_SIZE,
        });
        this.load.image('item', 'Imagenes/item.png');
        this.load.image('rock_obstacle', 'Imagenes/Botones1/RonaIn.png'); // Roca fija
        this.load.image('rock_pushable', 'Imagenes/Botones1/RocaM.png'); // Roca empujable
        this.load.image('ladder', 'Imagenes/ladder.png'); // Escalera
    }

    create() {
        this.add.image(735, 330, 'cueva'); // Fondo del nivel
    
        // Inicializar la lista de rocas antes de usarla
        this.rocks = []; 
    
        // Calcular el desplazamiento inicial para centrar la cuadrícula
        this.gridOffset = {
            x: (this.scale.width - GRID_WIDTH * TILE_SIZE) / 2,
            y: (this.scale.height - GRID_HEIGHT * TILE_SIZE) / 2,
        };
    
        // Crear la cuadrícula
        this.renderGrid();
    
        // Crear rocas
        this.createRocks();
        this.items = []; // Inicializar como un array vacío si aún no tienes elementos
    
        // Crear animaciones del jugador
        this.createPlayerAnimations();
    
        // Posición inicial del jugador
        this.gridPosition = { x: 2, y: 1 };
        const { x, y } = this.gridToPixel(this.gridPosition.x, this.gridPosition.y);
        this.player = this.add.sprite(x, y, 'slimi').play('idle').setDepth(2);

        // Añadir la escalera
        const currentLadder = this.grids[this.currentGrid - 1].ladder;
        const { x: ladderX, y: ladderY } = this.gridToPixel(currentLadder.x, currentLadder.y);
        this.ladder = this.add.image(ladderX, ladderY, 'ladder').setOrigin(0.5).setDepth(1);
    
        // Crear el objeto a recoger
       // Crear el objeto a recoger
        const currentGrid = this.grids[this.currentGrid - 1]; // Accede a la cuadrícula actual
        const itemPosition = currentGrid.itemPosition; // Obtén la posición del ítem
        const { x: itemX, y: itemY } = this.gridToPixel(itemPosition.x, itemPosition.y);
        this.item = this.add.image(itemX, itemY, 'item').setOrigin(0.5);
    
        // Entrada de teclado
        this.cursors = this.input.keyboard.createCursorKeys();
    
        // Variables de tiempo
        this.lastMoveTime = 0;
        this.startTime = null;  // Tiempo comienza en null
        this.bestTime = localStorage.getItem('bestTime') || null;
    
        // Estado de nivel completado
        this.levelCompleted = false;

        this.input.keyboard.on('keydown-ESC', () => {
            this.scene.restart(); // Reinicia la escena actual
        });

        // Inicializar el texto del tiempo
        this.timeText = this.add.text(10, 10, 'Tiempo: 0s', {
            font: '24px Arial',
            fill: '#FFFFFF',
        }).setDepth(10);  // Asegúrate de que el tiempo esté por encima de otros elementos
    }

    update(time) {
        if (this.levelCompleted) return; // Si el nivel ya está completado, no procesamos más entradas
    
        // Iniciar el temporizador solo cuando el jugador se mueva
        if (this.startTime === null && (this.cursors.left.isDown || this.cursors.right.isDown || this.cursors.up.isDown || this.cursors.down.isDown)) {
            this.startTime = time; // Iniciar el temporizador cuando el jugador hace su primer movimiento
        }
    
        // Si el temporizador ya ha comenzado, mostrar el tiempo transcurrido
        if (this.startTime !== null) {
            const elapsedTime = Math.floor((time - this.startTime) / 1000); // Convertir de milisegundos a segundos
            this.timeText.setText(`Tiempo: ${elapsedTime}s`); // Actualizar el texto del tiempo
        }
    
        // Limitar la frecuencia de movimiento (esperar 200ms entre movimientos)
        if (time - this.lastMoveTime < 200) return;
    
        // Dirección de movimiento
        let direction = null;
    
        if (this.cursors.left.isDown && this.gridPosition.x > 0) {
            direction = { x: -1, y: 0 }; // Mover a la izquierda
            this.player.anims.play('move_horizontal', true);
        } else if (this.cursors.right.isDown && this.gridPosition.x < GRID_WIDTH - 1) {
            direction = { x: 1, y: 0 }; // Mover a la derecha
            this.player.anims.play('move_horizontal', true);
        } else if (this.cursors.up.isDown && this.gridPosition.y > 0) {
            direction = { x: 0, y: -1 }; // Mover hacia arriba
            this.player.anims.play('move_vertical', true);
        } else if (this.cursors.down.isDown && this.gridPosition.y < GRID_HEIGHT - 1) {
            direction = { x: 0, y: 1 }; // Mover hacia abajo
            this.player.anims.play('move_vertical', true);
        }
    
        if (direction) {
            const newPosition = {
                x: this.gridPosition.x + direction.x,
                y: this.gridPosition.y + direction.y,
            };
    
            // Cambiar de cuadrícula si el jugador pisa la escalera
            const currentLadder = this.grids[this.currentGrid - 1].ladder;
            if (newPosition.x === currentLadder.x && newPosition.y === currentLadder.y) {
                this.switchGrid();
            } else {
                // Lógica existente de movimiento del jugador
                if (this.isTileOccupiedByRock(newPosition)) {
                    const rock = this.getRockAt(newPosition);
                    if (rock.type === 'pushable') {
                        const pushed = this.pushRock(rock, direction);
                        if (pushed) {
                            this.movePlayer(newPosition);
                        }
                    }
                } else {
                    this.movePlayer(newPosition);
                }
            }
    
            this.lastMoveTime = time;
        } else {
            this.player.anims.play('idle', true);
        }
    
        // **Lógica para recoger ítem**
        if (
            this.gridPosition.x === this.grids[this.currentGrid - 1].itemPosition.x &&
            this.gridPosition.y === this.grids[this.currentGrid - 1].itemPosition.y
        ) {
            this.item.destroy(); // Eliminar el sprite del ítem
            console.log("¡Has recogido el ítem!");
    
            // Opcional: Completar el nivel o realizar otras acciones
            this.completeLevel(time);
        }
    }

    movePlayer(newPosition) {
        this.gridPosition = newPosition;
        const { x, y } = this.gridToPixel(newPosition.x, newPosition.y);
        this.player.x = x;
        this.player.y = y;
    }

    renderGrid() {
        for (let y = 0; y < GRID_HEIGHT; y++) {
            for (let x = 0; x < GRID_WIDTH; x++) {
                const { x: pixelX, y: pixelY } = this.gridToPixel(x, y);
                this.add.image(pixelX, pixelY, 'tile1').setOrigin(0.5);
            }
        }
    }

    // Definir la función gridToPixel
    gridToPixel(gridX, gridY) {
        return {
            x: gridX * TILE_SIZE + TILE_SIZE / 2 + this.gridOffset.x,
            y: gridY * TILE_SIZE + TILE_SIZE / 2 + this.gridOffset.y,
        };
    }

    createPlayerAnimations() {
        this.anims.create({
            key: 'idle',
            frames: [
                { key: 'slimi', frame: 0 },
                { key: 'slimi', frame: 1 },
            ],
            frameRate: 2,
            repeat: -1,
        });

        this.anims.create({
            key: 'move_vertical',
            frames: [{ key: 'slimi', frame: 2 }],
            frameRate: 1,
            repeat: -1,
        });

        this.anims.create({
            key: 'move_horizontal',
            frames: [{ key: 'slimi', frame: 3 }],
            frameRate: 1,
            repeat: -1,
        });
    }

    createRocks() {
        this.rocks = []; // Limpiar la lista de rocas antes de crear nuevas
    
        const currentRocks = this.grids[this.currentGrid - 1].rocks;
    
        // Crear rocas fijas
        currentRocks.fixed.forEach(position => {
            const { x: pixelX, y: pixelY } = this.gridToPixel(position.x, position.y);
            const fixedRock = this.add.image(pixelX, pixelY, 'rock_obstacle').setOrigin(0.5).setDepth(1);
            this.rocks.push({ type: 'obstacle', sprite: fixedRock, gridX: position.x, gridY: position.y });
        });
    
        // Crear rocas empujables
        currentRocks.pushable.forEach(position => {
            const { x: pixelXPush, y: pixelYPush } = this.gridToPixel(position.x, position.y);
            const pushableRock = this.add.image(pixelXPush, pixelYPush, 'rock_pushable').setOrigin(0.5).setDepth(1);
            this.rocks.push({ type: 'pushable', sprite: pushableRock, gridX: position.x, gridY: position.y });
        });
    }

    isTileOccupiedByRock(tile) {
        return this.rocks.some(rock => rock.gridX === tile.x && rock.gridY === tile.y);
    }

    getRockAt(tile) {
        return this.rocks.find(rock => rock.gridX === tile.x && rock.gridY === tile.y);
    }

    pushRock(rock, direction) {
        const targetX = rock.gridX + direction.x;
        const targetY = rock.gridY + direction.y;
    
        if (
            targetX >= 0 && targetX < GRID_WIDTH &&
            targetY >= 0 && targetY < GRID_HEIGHT &&
            !this.isTileOccupiedByRock({ x: targetX, y: targetY }) // Corregir aquí el nombre de la función
        ) {
            rock.sprite.x += direction.x * TILE_SIZE;
            rock.sprite.y += direction.y * TILE_SIZE;
            rock.gridX = targetX;
            rock.gridY = targetY;
            return true;
        }
    
        return false;
    }

    switchGrid() {
        this.currentGrid = this.currentGrid === 1 ? 2 : 1;
    
        // Eliminar elementos específicos de la cuadrícula actual
        this.rocks.forEach(rock => rock.sprite.destroy());
        this.ladder.destroy();
        this.item.destroy();
        this.player.destroy();
    
        // Actualizar el fondo
        this.add.image(735, 330, this.grids[this.currentGrid - 1].background);
    
        // Renderizar la cuadrícula
        this.renderGrid();
    
        const currentGrid = this.grids[this.currentGrid - 1];
    
        // Reposicionar el jugador
        const newLadder = currentGrid.ladder;
        this.gridPosition = { x: newLadder.x, y: newLadder.y };
        const { x, y } = this.gridToPixel(this.gridPosition.x, this.gridPosition.y);
        this.player = this.add.sprite(x, y, 'slimi').play('idle').setDepth(2);
    
        // Reposicionar la escalera
        const { x: ladderX, y: ladderY } = this.gridToPixel(newLadder.x, newLadder.y);
        this.ladder = this.add.image(ladderX, ladderY, 'ladder').setOrigin(0.5).setDepth(1);
    
        // Crear el ítem en su nueva posición
        const itemPosition = currentGrid.itemPosition;
        const { x: itemX, y: itemY } = this.gridToPixel(itemPosition.x, itemPosition.y);
        this.item = this.add.image(itemX, itemY, 'item').setOrigin(0.5).setDepth(1);
    
        // Recrear las rocas para la cuadrícula actual
        this.createRocks();
    }
    
    completeLevel(time) {
        this.levelCompleted = true;
    
        this.item.destroy();
    
        const elapsedTime = ((time - this.startTime) / 1000).toFixed(2);
        const previousTime = parseFloat(localStorage.getItem('level10Time')) || Infinity;
        if (elapsedTime < previousTime) {
            localStorage.setItem('level10Time', elapsedTime);
        }
    
        // Guardar el tiempo en el localStorage con el nombre del nivel
        localStorage.setItem('level10Time', elapsedTime); // Almacenar tiempo del nivel 6
    
        const victoryText = this.add.text(735, 330, `¡Nivel completado!\nTiempo: ${elapsedTime}s\nPresiona Enter para regresar`, {
            font: '24px Arial',
            fill: '#FFFFFF',
            align: 'center',
        }).setOrigin(0.5);
    
        victoryText.setDepth(10);
    
        this.input.keyboard.once('keydown-ENTER', () => {
            console.log('Regresando a niveles1...');
            this.scene.stop('nc10');
            this.scene.start('niveles1');
        });
    }
}