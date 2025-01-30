const TILE_SIZE = 75;
const GRID_WIDTH = 9;
const GRID_HEIGHT = 8;

export class Zona2N4 extends Phaser.Scene {
    constructor() {
        super({ key: 'np4' });
        this.visitedTiles = new Set();
        // Posiciones de rocas inamovibles
        this.fixedRocks = [
            { x: 0, y: 0 },
            { x: 1, y: 0 },
            { x: 2, y: 0 },
            { x: 1, y: 1 },
            { x: 2, y: 1 },
            { x: 0, y: 1 },
            { x: 0, y: 2 },
            { x: 1, y: 2 },
            { x: 2, y: 2 },
            { x: 0, y: 3 },
            { x: 1, y: 3 },
            { x: 2, y: 3 },
            { x: 1, y: 5 },
            { x: 1, y: 6 },
            { x: 1, y: 7 },
            { x: 4, y: 3 },
            { x: 5, y: 3 },
            { x: 3, y: 6 },
            { x: 5, y: 5 },
            { x: 5, y: 6 },
            { x: 5, y: 7 }
        ];
    }

    preload() {
        this.load.image('pantano', 'Imagenes/pantano.png');
        this.load.image('tile2', 'Imagenes/Botones2/casilla.png');
        this.load.image('visitedTile', 'Imagenes/Botones2/casillao.png');
        this.load.image('rock_obstacle2', 'Imagenes/Botones2/Arbol.png'); // Imagen de roca fija
        this.load.spritesheet('slimi', 'Imagenes/slimi.png', {
            frameWidth: TILE_SIZE,
            frameHeight: TILE_SIZE,
        });
    }

    create() {
        window.addEventListener('click', () => {
            if (this.sound.context.state === 'suspended') {
                this.sound.context.resume();
            }
        });

        this.add.image(735, 330, 'pantano');

        this.gridOffset = {
            x: (this.scale.width - GRID_WIDTH * TILE_SIZE) / 2,
            y: (this.scale.height - GRID_HEIGHT * TILE_SIZE) / 2,
        };

        this.tiles = this.renderGrid();
        this.createPlayerAnimations();

        this.gridPosition = { x: 0, y: 7 };
        const { x, y } = this.gridToPixel(this.gridPosition.x, this.gridPosition.y);
        this.player = this.add.sprite(x, y, 'slimi').play('idle');

        this.player.setDepth(1);

        // Crear rocas fijas
        this.createFixedRocks();

        this.cursors = this.input.keyboard.createCursorKeys();
        this.lastMoveTime = 0;
        this.startTime = null;
        this.levelCompleted = false;

        this.input.keyboard.on('keydown-ESC', () => {
            this.scene.restart(); // Reinicia la escena actual
        });

        // Inicializar el texto del tiempo
        this.timeText = this.add.text(10, 10, 'Tiempo: 0s', {
            font: '24px Arial',
            fill: '#FFFFFF',
        }).setDepth(10);  // Asegúrate de que el tiempo esté por encima de otros elementos
        this.visitedTiles = new Set();
        this.markTileAsVisited(this.gridPosition.x, this.gridPosition.y);
    }

    update(time) {
        if (this.levelCompleted) return;
    
        // Iniciar el temporizador solo cuando el jugador se mueva
        if (this.startTime === null && (this.cursors.left.isDown || this.cursors.right.isDown || this.cursors.up.isDown || this.cursors.down.isDown)) {
            this.startTime = time; // Iniciar el temporizador cuando el jugador hace su primer movimiento
        }
    
        // Si el temporizador ya ha comenzado, mostrar el tiempo transcurrido
        if (this.startTime !== null) {
            const elapsedTime = Math.floor((time - this.startTime) / 1000); // Convertir de milisegundos a segundos
            this.timeText.setText(`Tiempo: ${elapsedTime}s`); // Actualizar el texto del tiempo
        }
    
        if (time - this.lastMoveTime < 200) return;
    
        let moving = false;
        let direction = { x: 0, y: 0 }; // Declarar `direction` con valores iniciales
    
        let newPosition = { ...this.gridPosition };
    
        if (this.cursors.left.isDown && this.gridPosition.x > 0) {
            direction = { x: -1, y: 0 }; // Mover a la izquierda
            newPosition.x += direction.x; // Actualizar posición
            this.player.anims.play('move_horizontal', true);
        } else if (this.cursors.right.isDown && this.gridPosition.x < GRID_WIDTH - 1) {
            direction = { x: 1, y: 0 }; // Mover a la derecha
            newPosition.x += direction.x; // Actualizar posición
            this.player.anims.play('move_horizontal', true);
        } else if (this.cursors.up.isDown && this.gridPosition.y > 0) {
            direction = { x: 0, y: -1 }; // Mover hacia arriba
            newPosition.y += direction.y; // Actualizar posición
            this.player.anims.play('move_vertical', true);
        } else if (this.cursors.down.isDown && this.gridPosition.y < GRID_HEIGHT - 1) {
            direction = { x: 0, y: 1 }; // Mover hacia abajo
            newPosition.y += direction.y; // Actualizar posición
            this.player.anims.play('move_vertical', true);
        }
    
        if (
            newPosition.x !== this.gridPosition.x ||
            newPosition.y !== this.gridPosition.y
        ) {
            const newTileKey = `${newPosition.x},${newPosition.y}`;
            if (
                !this.visitedTiles.has(newTileKey) && // Verifica que no esté visitada
                !this.isTileOccupiedByRock(newPosition) // Verifica que no sea una roca
            ) {
                this.gridPosition = newPosition;
                const { x, y } = this.gridToPixel(this.gridPosition.x, this.gridPosition.y);
                this.player.x = x;
                this.player.y = y;
    
                this.lastMoveTime = time;
                this.markTileAsVisited(this.gridPosition.x, this.gridPosition.y);
    
                if (this.allTilesVisited()) {
                    this.completeLevel(time);
                }
                moving = true;
            }
        }
    
        if (!moving) {
            this.player.anims.play('idle', true);
        }
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

    renderGrid() {
        const tiles = [];
        for (let y = 0; y < GRID_HEIGHT; y++) {
            for (let x = 0; x < GRID_WIDTH; x++) {
                const { x: pixelX, y: pixelY } = this.gridToPixel(x, y);
                tiles.push(this.add.image(pixelX, pixelY, 'tile2').setOrigin(0.5));
            }
        }
        return tiles;
    }

    createFixedRocks() {
        this.fixedRocks.forEach((rock) => {
            const { x, y } = this.gridToPixel(rock.x, rock.y);
            this.add.image(x, y, 'rock_obstacle2').setOrigin(0.5).setDepth(1);
    
            // Marcar la casilla como visitada automáticamente
            this.markTileAsVisited(rock.x, rock.y);
        });
    }

    isTileOccupiedByRock(position) {
        return this.fixedRocks.some((rock) => rock.x === position.x && rock.y === position.y);
    }

    markTileAsVisited(gridX, gridY) {
        const key = `${gridX},${gridY}`;
        if (!this.visitedTiles.has(key)) {
            this.visitedTiles.add(key);
            const { x, y } = this.gridToPixel(gridX, gridY);
            this.add.image(x, y, 'visitedTile').setOrigin(0.5);
        }
    }

    allTilesVisited() {
        for (let x = 0; x < GRID_WIDTH; x++) {
            for (let y = 0; y < GRID_HEIGHT; y++) {
                // Ignorar casillas ocupadas por rocas fijas
                if (this.fixedRocks.some(rock => rock.x === x && rock.y === y)) {
                    continue;
                }
    
                // Si una casilla no está marcada como visitada, retornar false
                if (!this.visitedTiles.has(`${x},${y}`)) {
                    return false;
                }
            }
        }
    
        // Todas las casillas (excepto las de rocas fijas) han sido visitadas
        return true;
    }

    gridToPixel(gridX, gridY) {
        return {
            x: gridX * TILE_SIZE + TILE_SIZE / 2 + this.gridOffset.x,
            y: gridY * TILE_SIZE + TILE_SIZE / 2 + this.gridOffset.y,
        };
    }

    completeLevel(time) {
        this.levelCompleted = true;
    
        const elapsedTime = ((time - this.startTime) / 1000).toFixed(2);
        if (this.bestTime === null || elapsedTime < this.bestTime) {
            this.bestTime = elapsedTime;
            localStorage.setItem('bestTime', elapsedTime);
        }
    
        localStorage.setItem('level19Time', elapsedTime); // Almacenar tiempo del nivel
    
        const victoryText = this.add.text(735, 330, `¡Nivel completado!\nTiempo: ${elapsedTime}s\nPresiona Enter para regresar`, {
            font: '24px Arial',
            fill: '#FFFFFF',
            align: 'center',
        }).setOrigin(0.5);
    
        victoryText.setDepth(10);
    
        this.input.keyboard.once('keydown-ENTER', () => {
            console.log('Regresando a niveles2...');
            this.scene.stop('np4');
            this.scene.start('niveles2');
        });
    }
}