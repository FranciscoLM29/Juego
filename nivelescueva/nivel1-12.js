const TILE_SIZE = 75;  // Tamaño de cada casilla de la cuadrícula
const GRID_WIDTH = 11;  // Número de columnas
const GRID_HEIGHT = 7;  // Número de filas

export class Zona1N12 extends Phaser.Scene {
    constructor() {
        super({ key: 'nc12' });
        this.currentGrid = 1; // Valor predeterminado
        this.grids = [
            {
                background: 'cueva',
                ladders: [
                    { x: 6, y: 1, connectsTo: 2 },
                    { x: 4, y: 1, connectsTo: 3 }
                ],
                itemPosition: { x: 20, y: 20 },
                rocks: {
                    fixed: [
                        { x: 5, y: 0 },
                        { x: 5, y: 1 },
                        { x: 5, y: 2 },
                        { x: 5, y: 3 },
                        { x: 1, y: 2 },
                        { x: 2, y: 3 },
                        { x: 3, y: 4 },
                        { x: 4, y: 3 },
                        { x: 6, y: 3 },
                        { x: 7, y: 4 },
                        { x: 8, y: 3 },
                        { x: 9, y: 2 }
                    ],
                    pushable: [
                        { x: 1, y: 1 },
                        { x: 1, y: 5 },
                        { x: 1, y: 4 },
                        { x: 2, y: 0 },
                        { x: 3, y: 2 },
                        { x: 3, y: 5 },
                        { x: 3, y: 6 },
                        { x: 6, y: 5 },
                        { x: 4, y: 5 },
                        { x: 7, y: 6 },
                        { x: 7, y: 2 },
                        { x: 7, y: 5 },
                        { x: 8, y: 0 },
                        { x: 9, y: 1 },
                        { x: 9, y: 4 },
                        { x: 9, y: 5 }
                    ],
                },
            },
            {
                background: 'cueva',
                ladders: [
                    { x: 0, y: 0, connectsTo: 1 },
                    { x: 20, y: 20, connectsTo: 3 }
                ],
                itemPosition: { x: 2, y: 4 },
                rocks: {
                    fixed: [
                        { x: 0, y: 1 },
                        { x: 1, y: 1 },
                        { x: 2, y: 1 },
                        { x: 3, y: 1 },
                        { x: 4, y: 1 },
                        { x: 5, y: 1 },
                        { x: 6, y: 1 },
                        { x: 7, y: 1 },
                        { x: 9, y: 2 },
                        { x: 9, y: 1 },
                        { x: 9, y: 5 },
                        { x: 9, y: 3 },
                        { x: 8, y: 5 },
                        { x: 7, y: 5 },
                        { x: 6, y: 5 },
                        { x: 5, y: 5 },
                        { x: 4, y: 5 },
                        { x: 3, y: 5 },
                        { x: 2, y: 5 },
                        { x: 1, y: 3 },
                        { x: 1, y: 4 },
                        { x: 1, y: 5 },
                        { x: 2, y: 3 },
                        { x: 3, y: 3 },
                        { x: 4, y: 3 },
                        { x: 5, y: 3 },
                        { x: 6, y: 3 },
                        { x: 7, y: 3 }
                    ],
                    pushable: [
                        { x: 8, y: 1 },
                        { x: 9, y: 4 }
                    ],
                },
            },
            {
                background: 'cueva',
                ladders: [
                    { x: 10, y: 0, connectsTo: 1 },
                    { x: 20, y: 20, connectsTo: 2 }
                ],
                itemPosition: { x: 0, y: 0 },
                rocks: {
                    fixed: [
                        { x: 1, y: 0 },
                        { x: 1, y: 1 },
                        { x: 1, y: 2 },
                        { x: 1, y: 3 },
                        { x: 1, y: 4 },
                        { x: 3, y: 5 },
                        { x: 3, y: 6 },
                        { x: 3, y: 3 },
                        { x: 3, y: 2 },
                        { x: 3, y: 1 },
                        { x: 5, y: 2 },
                        { x: 5, y: 1 },
                        { x: 5, y: 4 },
                        { x: 5, y: 5 },
                        { x: 5, y: 0 },
                        { x: 7, y: 6 },
                        { x: 7, y: 5 },
                        { x: 7, y: 1 },
                        { x: 7, y: 3 },
                        { x: 7, y: 4 },
                        { x: 9, y: 4 },
                        { x: 9, y: 5 },
                        { x: 9, y: 2 },
                        { x: 9, y: 3 },
                        { x: 9, y: 0 }
                    ],
                    pushable: [
                        { x: 1, y: 5 },
                        { x: 5, y: 3 },
                        { x: 3, y: 4 },
                        { x: 7, y: 2 },
                        { x: 9, y: 1 }
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
        this.ladders = []; // Inicializar lista de escaleras
    
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
        this.gridPosition = { x: 5, y: 6 };
        const { x, y } = this.gridToPixel(this.gridPosition.x, this.gridPosition.y);
        this.player = this.add.sprite(x, y, 'slimi').play('idle').setDepth(2);
    
        // Obtener la cuadrícula actual
        const currentGrid = this.grids[this.currentGrid - 1];
    
        // Verificar si existen escaleras en la cuadrícula actual
        if (currentGrid && currentGrid.ladders && currentGrid.ladders.length > 0) {
            // Iterar sobre las escaleras en la cuadrícula actual
            this.ladders = currentGrid.ladders.map(ladder => {
                // Asegurarse de que las coordenadas sean válidas antes de crear la escalera
                if (ladder.x !== undefined && ladder.y !== undefined) {
                    const { x, y } = this.gridToPixel(ladder.x, ladder.y);
                    return {
                        ...ladder,
                        sprite: this.add.image(x, y, 'ladder').setOrigin(0.5).setDepth(2) // Establecer depth mayor
                    };
                } else {
                    console.warn('Coordenadas inválidas para la escalera:', ladder);
                    return null;
                }
            }).filter(ladder => ladder !== null); // Filtrar las escaleras inválidas
        } else {
            console.warn('No se encontraron escaleras en la cuadrícula actual.');
        }
    
        // Crear el objeto a recoger
        const itemPosition = currentGrid.itemPosition;
        const { x: itemX, y: itemY } = this.gridToPixel(itemPosition.x, itemPosition.y);
        this.item = this.add.image(itemX, itemY, 'item').setOrigin(0.5).setDepth(1); // depth menor que la escalera
    
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
        if (this.levelCompleted) return;
    
        // Iniciar temporizador
        if (this.startTime === null && (this.cursors.left.isDown || this.cursors.right.isDown || this.cursors.up.isDown || this.cursors.down.isDown)) {
            this.startTime = time;
        }
    
        // Actualizar el tiempo
        if (this.startTime !== null) {
            const elapsedTime = Math.floor((time - this.startTime) / 1000);
            this.timeText.setText(`Tiempo: ${elapsedTime}s`);
        }
    
        if (time - this.lastMoveTime < 200) return;
    
        // Dirección de movimiento
        let direction = null;
    
        if (this.cursors.left.isDown && this.gridPosition.x > 0) {
            direction = { x: -1, y: 0 };
            this.player.anims.play('move_horizontal', true);
        } else if (this.cursors.right.isDown && this.gridPosition.x < GRID_WIDTH - 1) {
            direction = { x: 1, y: 0 };
            this.player.anims.play('move_horizontal', true);
        } else if (this.cursors.up.isDown && this.gridPosition.y > 0) {
            direction = { x: 0, y: -1 };
            this.player.anims.play('move_vertical', true);
        } else if (this.cursors.down.isDown && this.gridPosition.y < GRID_HEIGHT - 1) {
            direction = { x: 0, y: 1 };
            this.player.anims.play('move_vertical', true);
        }
    
        if (direction) {
            const newPosition = {
                x: this.gridPosition.x + direction.x,
                y: this.gridPosition.y + direction.y,
            };
    
            // Verificar si el jugador pisa una escalera
            const currentGrid = this.grids[this.currentGrid - 1];
            const ladder = currentGrid.ladders.find(l => l.x === newPosition.x && l.y === newPosition.y);
            if (ladder) {
                this.previousGrid = this.currentGrid;
                this.switchGrid(ladder.connectsTo);
            } else {
                // Lógica para mover al jugador y empujar rocas
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
    
        // Lógica para recoger ítem
        const currentGrid = this.grids[this.currentGrid - 1];
        if (this.gridPosition.x === currentGrid.itemPosition.x && this.gridPosition.y === currentGrid.itemPosition.y) {
            this.item.destroy();
            console.log("¡Has recogido el ítem!");
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
    
        const currentGrid = this.grids[this.currentGrid - 1];
    
        // Validar que currentGrid tiene rocas definidas
        if (currentGrid && currentGrid.rocks) {
            // Crear rocas fijas
            currentGrid.rocks.fixed.forEach(position => {
                const { x: pixelX, y: pixelY } = this.gridToPixel(position.x, position.y);
                const fixedRock = this.add.image(pixelX, pixelY, 'rock_obstacle').setOrigin(0.5).setDepth(1);
                this.rocks.push({ type: 'obstacle', sprite: fixedRock, gridX: position.x, gridY: position.y });
            });
    
            // Crear rocas empujables
            currentGrid.rocks.pushable.forEach(position => {
                const { x: pixelXPush, y: pixelYPush } = this.gridToPixel(position.x, position.y);
                const pushableRock = this.add.image(pixelXPush, pixelYPush, 'rock_pushable').setOrigin(0.5).setDepth(1);
                this.rocks.push({ type: 'pushable', sprite: pushableRock, gridX: position.x, gridY: position.y });
            });
        } else {
            console.warn('No se encontraron rocas definidas en la cuadrícula actual.');
        }
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

    switchGrid(nextGrid) {
        this.currentGrid = nextGrid;
    
        // Eliminar elementos específicos de la cuadrícula actual
        this.rocks.forEach(rock => rock.sprite.destroy());
        this.ladders.forEach(ladder => ladder.sprite.destroy());
        this.item.destroy();
        this.player.destroy();
    
        // Actualizar el fondo
        this.add.image(735, 330, this.grids[this.currentGrid - 1].background);
    
        // Renderizar la cuadrícula
        this.renderGrid();
    
        const currentGrid = this.grids[this.currentGrid - 1];
    
        // Reposicionar al jugador en la escalera conectada
        const newLadder = currentGrid.ladders.find(l => l.connectsTo === this.previousGrid);
        this.gridPosition = { x: newLadder.x, y: newLadder.y };
        const { x, y } = this.gridToPixel(this.gridPosition.x, this.gridPosition.y);
        this.player = this.add.sprite(x, y, 'slimi').play('idle').setDepth(2);
    
        // Reposicionar las escaleras
        this.ladders = currentGrid.ladders.map(ladder => {
            const { x: ladderX, y: ladderY } = this.gridToPixel(ladder.x, ladder.y);
            return {
                ...ladder,
                sprite: this.add.image(ladderX, ladderY, 'ladder').setOrigin(0.5).setDepth(1)
            };
        });
    
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
        const previousTime = parseFloat(localStorage.getItem('level12Time')) || Infinity;
        if (elapsedTime < previousTime) {
            localStorage.setItem('level12Time', elapsedTime);
        }
    
        // Guardar el tiempo en el localStorage con el nombre del nivel
        localStorage.setItem('level12Time', elapsedTime); // Almacenar tiempo del nivel 6
    
        const victoryText = this.add.text(735, 330, `¡Nivel completado!\nTiempo: ${elapsedTime}s\nPresiona Enter para regresar`, {
            font: '24px Arial',
            fill: '#FFFFFF',
            align: 'center',
        }).setOrigin(0.5);
    
        victoryText.setDepth(10);
    
        this.input.keyboard.once('keydown-ENTER', () => {
            console.log('Regresando a niveles1...');
            this.scene.stop('nc12');
            this.scene.start('niveles1');
        });
    }
}