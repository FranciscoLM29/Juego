const TILE_SIZE = 75;  // Tamaño de cada casilla de la cuadrícula
const GRID_WIDTH = 7;  // Número de columnas
const GRID_HEIGHT = 4;  // Número de filas

export class Zona3N1 extends Phaser.Scene {
    constructor() {
        super({ key: 'nh1' });
    }

    preload() {
        // Cargar imágenes y sprites
        this.load.image('hielo', 'Imagenes/helado.png');
        this.load.image('tile3', 'Imagenes/Botones3/casilla.png');
        this.load.spritesheet('slimi', 'Imagenes/slimi.png', {
            frameWidth: TILE_SIZE,
            frameHeight: TILE_SIZE,
        });
        this.load.image('item', 'Imagenes/item.png');
        this.load.image('rock_obstacle3', 'Imagenes/Botones3/RocaIn.png'); // Roca fija
        this.load.image('rock_pushable3', 'Imagenes/Botones3/RocaM.png'); // Roca empujable
        this.load.image('snow', 'Imagenes/Botones3/snow.png');
    }

    create() {
        this.add.image(735, 330, 'hielo'); // Fondo del nivel
    
        // Inicializar la lista de rocas antes de usarla
        this.rocks = []; 
    
        // Calcular el desplazamiento inicial para centrar la cuadrícula
        this.gridOffset = {
            x: (this.scale.width - GRID_WIDTH * TILE_SIZE) / 2,
            y: (this.scale.height - GRID_HEIGHT * TILE_SIZE) / 2,
        };
    
        // Crear la cuadrícula
        this.renderGrid();

        this.isMoving = false; // Estado inicial del jugador
        this.canMove = true;   // Permitir movimiento al inicio
        this.moveDirection = { x: 0, y: 0 }; // Dirección inicial
    
        // Crear rocas
        this.createRocks();
        this.items = []; // Inicializar como un array vacío si aún no tienes elementos
    
        // Crear animaciones del jugador
        this.createPlayerAnimations();
    
        // Posición inicial del jugador
        this.gridPosition = { x: 6, y: 3 };
        const { x, y } = this.gridToPixel(this.gridPosition.x, this.gridPosition.y);
        this.player = this.add.sprite(x, y, 'slimi').play('idle');
    
        // Crear el objeto a recoger
        this.itemPosition = { x: 2, y: 0 }; // Ubicación del objeto en la cuadrícula
        const { x: itemX, y: itemY } = this.gridToPixel(this.itemPosition.x, this.itemPosition.y);
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
        if (this.levelCompleted) return;
    
        let moving = false;
    
        // Detectar dirección de movimiento
        if (this.canMove) {
            if (this.cursors.left.isDown) {
                this.moveDirection = { x: -1, y: 0 }; // Mover a la izquierda
                moving = true;
            } else if (this.cursors.right.isDown) {
                this.moveDirection = { x: 1, y: 0 }; // Mover a la derecha
                moving = true;
            } else if (this.cursors.up.isDown) {
                this.moveDirection = { x: 0, y: -1 }; // Mover hacia arriba
                moving = true;
            } else if (this.cursors.down.isDown) {
                this.moveDirection = { x: 0, y: 1 }; // Mover hacia abajo
                moving = true;
            }
        }
    
        // Iniciar el temporizador solo cuando se detecta el primer movimiento
        if (moving && this.startTime === null) {
            this.startTime = time; // Iniciar el temporizador solo una vez
        }
    
        // Manejar el movimiento
        if (!this.isMoving && moving) {
            this.isMoving = true;
            this.canMove = false;
            this.movePlayerContinuously();
        } else if (!moving) {
            // Si el jugador no se está moviendo, volver a la animación 'idle'
            if (this.moveDirection.x === 0 && this.moveDirection.y === 0) {
                this.player.anims.play('idle', true);
            }
        }
    
        // Verificar si el jugador recoge el ítem
        if (this.isPlayerOnItem()) {
            this.completeLevel(time);
        }
    
        // Actualizar el tiempo y mostrarlo
        if (this.startTime !== null) {
            const elapsedTime = Math.floor((time - this.startTime) / 1000); // Redondear a segundos
            this.timeText.setText('Tiempo: ' + elapsedTime + 's');
        }
    }

    isPlayerOnItem() {
        return (
            this.gridPosition.x === this.itemPosition.x &&
            this.gridPosition.y === this.itemPosition.y
        );
    }
    
    movePlayerContinuously() {
        const interval = setInterval(() => {
            const newPosition = {
                x: this.gridPosition.x + this.moveDirection.x,
                y: this.gridPosition.y + this.moveDirection.y,
            };
    
            // Verificar si el jugador se mueve hacia un montículo de nieve
            if (this.isTileOccupiedBySnow(newPosition)) {
                // Detener al jugador si hay nieve
                clearInterval(interval);
                this.player.anims.play('idle', true);
                return;
            } else if (this.isTileOccupiedByRock(newPosition)) {
                const rock = this.getRockAt(newPosition);
    
                if (rock.type === 'pushable') {
                    // Iniciar el empuje de la roca
                    const pushed = this.pushRock(rock, this.moveDirection);
    
                    // Detener al jugador independientemente del resultado
                    clearInterval(interval);
                    this.player.anims.play('idle', true);
                    return;
                } else {
                    // Detener el movimiento si es una roca fija
                    clearInterval(interval);
                    this.player.anims.play('idle', true);
                    return;
                }
            } else if (
                newPosition.x < 0 || 
                newPosition.x >= GRID_WIDTH || 
                newPosition.y < 0 || 
                newPosition.y >= GRID_HEIGHT
            ) {
                // Detener si alcanza el límite del mapa
                clearInterval(interval);
                this.player.anims.play('idle', true);
                return;
            }
    
            // Mover al jugador
            this.updatePlayerPosition(newPosition);
        }, 300); // Ajustar la velocidad (en ms)
    
        this.isMoving = false;
        this.canMove = true;
    }
    
    updatePlayerPosition(newPosition) {
        this.gridPosition = newPosition;
        const { x, y } = this.gridToPixel(newPosition.x, newPosition.y);
        this.player.x = x;
        this.player.y = y;
    
        // Reproducir animación de movimiento
        if (this.moveDirection.x !== 0) {
            this.player.anims.play('move_horizontal', true);
        } else if (this.moveDirection.y !== 0) {
            this.player.anims.play('move_vertical', true);
        }
    }

    renderGrid() {
        for (let y = 0; y < GRID_HEIGHT; y++) {
            for (let x = 0; x < GRID_WIDTH; x++) {
                const { x: pixelX, y: pixelY } = this.gridToPixel(x, y);
                this.add.image(pixelX, pixelY, 'tile3').setOrigin(0.5);
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
        const fixedRocksPositions = [
            { x: 0, y: 0 },
            { x: 1, y: 0 },
            { x: 0, y: 3 },
            { x: 6, y: 1 },
            { x: 3, y: 0 },
            { x: 6, y: 0 }
        ];
        
        fixedRocksPositions.forEach(position => {
            const { x: pixelX, y: pixelY } = this.gridToPixel(position.x, position.y);
            const fixedRock = this.add.image(pixelX, pixelY, 'rock_obstacle3').setOrigin(0.5).setDepth(1);
            this.rocks.push({ type: 'obstacle', sprite: fixedRock, gridX: position.x, gridY: position.y });
        });
    
        const pushableRocksPositions = [
            { x: 1, y: 2 }
        ];
    
        pushableRocksPositions.forEach(position => {
            const { x: pixelXPush, y: pixelYPush } = this.gridToPixel(position.x, position.y);
            const pushableRock = this.add.image(pixelXPush, pixelYPush, 'rock_pushable3').setOrigin(0.5).setDepth(1);
            this.rocks.push({ type: 'pushable', sprite: pushableRock, gridX: position.x, gridY: position.y });
        });

        const snowPositions = [
            { x: 4, y: 1 },
        ];

        snowPositions.forEach(position => {
            const { x: pixelXSnow, y: pixelYSnow } = this.gridToPixel(position.x, position.y);
            const snow = this.add.image(pixelXSnow, pixelYSnow, 'snow').setOrigin(0.5).setDepth(1);
            this.rocks.push({ type: 'snow', sprite: snow, gridX: position.x, gridY: position.y });
        });
    }

    isTileOccupiedByRock(tile) {
        return this.rocks.some(rock => rock.gridX === tile.x && rock.gridY === tile.y);
    }

    getRockAt(tile) {
        return this.rocks.find(rock => rock.gridX === tile.x && rock.gridY === tile.y);
    }

    pushRock(rock, direction) {
        const interval = setInterval(() => {
            const targetX = rock.gridX + direction.x;
            const targetY = rock.gridY + direction.y;
    
            // Verificar si la roca puede avanzar
            if (
                targetX >= 0 && targetX < GRID_WIDTH &&
                targetY >= 0 && targetY < GRID_HEIGHT
            ) {
                const nextTile = { x: targetX, y: targetY };
    
                if (this.isTileOccupiedBySnow(nextTile)) {
                    // Si hay nieve, destruirla y continuar
                    const snow = this.getSnowAt(nextTile);
                    this.destroySnow(snow);
                } else if (this.isTileOccupiedByRock(nextTile)) {
                    // Detener si hay otra roca o un obstáculo
                    clearInterval(interval);
                    return;
                }
    
                // Mover la roca
                rock.sprite.x += direction.x * TILE_SIZE;
                rock.sprite.y += direction.y * TILE_SIZE;
                rock.gridX = targetX;
                rock.gridY = targetY;
            } else {
                // Detener el movimiento si hay un obstáculo o el límite del mapa
                clearInterval(interval);
            }
        }, 300); // Ajustar la velocidad (en ms)
    
        return true; // Devolver true para indicar que se inició el empuje
    }

    // Detectar si la casilla está ocupada por nieve
    isTileOccupiedBySnow(tile) {
        return this.rocks.some(rock => rock.type === 'snow' && rock.gridX === tile.x && rock.gridY === tile.y);
    }

    // Obtener el objeto de nieve en la casilla
    getSnowAt(tile) {
        return this.rocks.find(rock => rock.type === 'snow' && rock.gridX === tile.x && rock.gridY === tile.y);
    }

    // Destruir el montículo de nieve
    destroySnow(snow) {
        snow.sprite.destroy();  // Destruir el sprite
        this.rocks = this.rocks.filter(rock => rock !== snow);  // Eliminarlo de la lista de rocas
    }
    
    completeLevel(time) {
        this.levelCompleted = true;
    
        this.item.destroy();
    
        const elapsedTime = ((time - this.startTime) / 1000).toFixed(2);
        if (this.bestTime === null || elapsedTime < this.bestTime) {
            this.bestTime = elapsedTime;
            localStorage.setItem('bestTime', elapsedTime);
        }
    
        // Guardar el tiempo en el localStorage con el nombre del nivel
        localStorage.setItem('level31Time', elapsedTime); // Almacenar tiempo del nivel 1
    
        const victoryText = this.add.text(735, 330, `¡Nivel completado!\nTiempo: ${elapsedTime}s\nPresiona Enter para regresar`, {
            font: '24px Arial',
            fill: '#FFFFFF',
            align: 'center',
        }).setOrigin(0.5);
    
        victoryText.setDepth(10);
    
        this.input.keyboard.once('keydown-ENTER', () => {
            console.log('Regresando a niveles3...');
            this.scene.stop('nh1');
            this.scene.start('niveles3');
        });
    }
}