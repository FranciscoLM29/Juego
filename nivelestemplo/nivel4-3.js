const TILE_SIZE = 75;
const GRID_WIDTH = 12;
const GRID_HEIGHT = 6;
const ITEMS = ['blue', 'red', 'green', 'yellow', 'purple'];  // Items a empujar
const PLATFORM_COLOR_MAP = {
    blue: 'platformBlue',
    red: 'platformRed',
    green: 'platformGreen',
    yellow: 'platformYellow',
    purple: 'platformPurple',
};

export class Zona4N3 extends Phaser.Scene {
    constructor() {
        super({ key: 'nt3' });
    }

    preload() {
        this.load.image('templo', 'Imagenes/templo.png');
        this.load.image('tile4', 'Imagenes/Botones4/casilla.png');
        this.load.spritesheet('slimi', 'Imagenes/slimi.png', {
            frameWidth: TILE_SIZE,
            frameHeight: TILE_SIZE,
        });
        // Cargar sprites para los ítems
        ITEMS.forEach(item => {
            this.load.image(item, `Imagenes/Botones4/${item}.png`);
            this.load.image(PLATFORM_COLOR_MAP[item], `Imagenes/Botones4/${item}Platform.png`);
        });
        this.load.image('rock_obstacle4', 'Imagenes/Botones4/Escombro.png'); // Roca fija
        this.load.image('rock_pushable4', 'Imagenes/Botones4/Cofre.png'); // Roca empujable
    }

    create() {
        window.addEventListener('click', () => {
            if (this.sound.context.state === 'suspended') {
                this.sound.context.resume();
            }
        });

        this.add.image(735, 330, 'templo');

        // Calcular el desplazamiento inicial para centrar la cuadrícula
        this.gridOffset = {
            x: (this.scale.width - GRID_WIDTH * TILE_SIZE) / 2,
            y: (this.scale.height - GRID_HEIGHT * TILE_SIZE) / 2,
        };

        this.tiles = this.renderGrid();
        this.createPlayerAnimations();

        this.gridPosition = { x: 5, y: 5 };
        const { x, y } = this.gridToPixel(this.gridPosition.x, this.gridPosition.y);
        this.player = this.add.sprite(x, y, 'slimi').play('idle');
        this.player.setDepth(3); // Asegurarse de que el jugador esté por encima de todos los demás


        this.cursors = this.input.keyboard.createCursorKeys();
        this.lastMoveTime = 0;
        this.startTime = null;
        this.levelCompleted = false;

        // Crear los ítems
        this.items = [];
        this.platforms = [];
        this.rocks = [];
        
        // Crear ítems y plataformas
        this.createRocks();
        this.createItems();
        this.createPlatforms();

        this.input.keyboard.on('keydown-ESC', () => {
            this.scene.restart(); // Reinicia la escena actual
        });

        this.timeText = this.add.text(10, 10, 'Tiempo: 0s', {
            font: '24px Arial',
            fill: '#FFFFFF',
        }).setDepth(10);
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
        let newPosition = { x: this.gridPosition.x, y: this.gridPosition.y };
        let direction = { x: 0, y: 0 }; // Definir dirección
    
        // Determinar la nueva posición basada en la entrada del jugador
        if (this.cursors.left.isDown && this.gridPosition.x > 0) {
            newPosition.x--;
            direction.x = -1; // Dirección izquierda
            moving = true;
            this.player.anims.play('move_horizontal', true); // Animación de movimiento horizontal
        } else if (this.cursors.right.isDown && this.gridPosition.x < GRID_WIDTH - 1) {
            newPosition.x++;
            direction.x = 1; // Dirección derecha
            moving = true;
            this.player.anims.play('move_horizontal', true); // Animación de movimiento horizontal
        } else if (this.cursors.up.isDown && this.gridPosition.y > 0) {
            newPosition.y--;
            direction.y = -1; // Dirección arriba
            moving = true;
            this.player.anims.play('move_vertical', true); // Animación de movimiento vertical
        } else if (this.cursors.down.isDown && this.gridPosition.y < GRID_HEIGHT - 1) {
            newPosition.y++;
            direction.y = 1; // Dirección abajo
            moving = true;
            this.player.anims.play('move_vertical', true); // Animación de movimiento vertical
        }
    
        if (!moving) {
            this.player.anims.play('idle', true); // Reproducir animación "idle" si no hay movimiento
            return;
        }
    
        if (moving) {
            const targetPosition = {
                x: this.gridPosition.x + direction.x,
                y: this.gridPosition.y + direction.y,
            };
    
            const rock = this.getRockAt(targetPosition);
            const item = this.getItemAt(targetPosition);
    
            if (rock) {
                const rockMoved = this.pushRock(rock, direction);
                if (rockMoved) {
                    this.movePlayerTo(targetPosition);
                }
            } else if (item) {
                const itemMoved = this.pushItem(item, direction);
                if (itemMoved) {
                    this.movePlayerTo(targetPosition);
                }
            } else {
                this.movePlayerTo(targetPosition);
            }
        }
    
        this.lastMoveTime = time;
    
        if (this.checkVictory()) {
            this.completeLevel(time);
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
            frameRate: 10, // Aumenta el frameRate si es necesario para que sea más fluido
            repeat: -1,
        });
    
        this.anims.create({
            key: 'move_horizontal',
            frames: [{ key: 'slimi', frame: 3 }],
            frameRate: 10, // Aumenta el frameRate si es necesario para que sea más fluido
            repeat: -1,
        });
    }    

    renderGrid() {
        const tiles = [];
        for (let y = 0; y < GRID_HEIGHT; y++) {
            for (let x = 0; x < GRID_WIDTH; x++) {
                const { x: pixelX, y: pixelY } = this.gridToPixel(x, y);
                tiles.push(this.add.image(pixelX, pixelY, 'tile4').setOrigin(0.5).setDepth(0)); // setDepth for the grid
            }
        }
        return tiles;
    }

    createItems() {
        // Posiciones predefinidas para los ítems
        const itemPositions = [
            { item: 'blue', x: 5, y: 3 },
            { item: 'red', x: 5, y: 4 },
            { item: 'green', x: 5, y: 1 }
        ];
    
        itemPositions.forEach(position => {
            const { item, x, y } = position;
            const { x: pixelX, y: pixelY } = this.gridToPixel(x, y);
            const sprite = this.add.image(pixelX, pixelY, item).setOrigin(0.5).setDepth(2); // Colocar los ítems sobre las plataformas
            this.items.push({ name: item, x: pixelX, y: pixelY, sprite, gridX: x, gridY: y });
        });
    }

    createPlatforms() {
        // Posiciones predefinidas para las plataformas
        const platformPositions = [
            { item: 'blue', x: 4, y: 3 },
            { item: 'red', x: 5, y: 0 },
            { item: 'green', x: 6, y: 1 }
        ];
        
        platformPositions.forEach(position => {
            const { item, x, y } = position;
            const { x: pixelX, y: pixelY } = this.gridToPixel(x, y);
            const platformSprite = this.add.image(pixelX, pixelY, PLATFORM_COLOR_MAP[item]).setOrigin(0.5).setDepth(1);
            this.platforms.push({ name: item, sprite: platformSprite, gridX: x, gridY: y }); // Almacena la plataforma
        });
    }

    createRocks() {
        const fixedRocksPositions = [
            { x: 2, y: 4 },
            { x: 3, y: 4 }, 
            { x: 4, y: 4 },
            { x: 6, y: 4 },
            { x: 7, y: 4 }, 
            { x: 8, y: 4 },
            { x: 9, y: 4 },
            { x: 2, y: 3 },
            { x: 2, y: 1 },
            { x: 4, y: 0 }, 
            { x: 4, y: 2 },
            { x: 6, y: 0 },
            { x: 6, y: 2 },
            { x: 8, y: 3 }, 
            { x: 9, y: 2 },
            { x: 9, y: 0 },
            { x: 10, y: 0 }
        ];
        
        fixedRocksPositions.forEach(position => {
            const { x: pixelX, y: pixelY } = this.gridToPixel(position.x, position.y);
            const fixedRock = this.add.image(pixelX, pixelY, 'rock_obstacle4').setOrigin(0.5).setDepth(1);
            this.rocks.push({ type: 'obstacle', sprite: fixedRock, gridX: position.x, gridY: position.y });
        });
    
        const pushableRocksPositions = [
            { x: 0, y: 4 }, 
            { x: 0, y: 1 },
            { x: 1, y: 2 },
            { x: 1, y: 0 }, 
            { x: 10, y: 2 },
            { x: 10, y: 3 },
            { x: 11, y: 2 } 
        ];
    
        pushableRocksPositions.forEach(position => {
            const { x: pixelXPush, y: pixelYPush } = this.gridToPixel(position.x, position.y);
            const pushableRock = this.add.image(pixelXPush, pixelYPush, 'rock_pushable4').setOrigin(0.5).setDepth(1);
            this.rocks.push({ type: 'pushable', sprite: pushableRock, gridX: position.x, gridY: position.y });
        });
    }

    movePlayerTo(position) {
        this.gridPosition = position;
        const { x, y } = this.gridToPixel(this.gridPosition.x, this.gridPosition.y);
        this.player.x = x;
        this.player.y = y;
    }

    pushRock(rock, direction) {
        const targetX = rock.gridX + direction.x;
        const targetY = rock.gridY + direction.y;
    
        // Verificar si la roca es inamovible
        if (rock.type === 'obstacle') {
            return false; // No mover rocas inamovibles
        }
    
        if (
            targetX >= 0 && targetX < GRID_WIDTH &&
            targetY >= 0 && targetY < GRID_HEIGHT
        ) {
            // Verificar si la casilla siguiente está ocupada por otro objeto (ítem o roca)
            const blockingItem = this.getItemAt({ x: targetX, y: targetY });
            const blockingRock = this.getRockAt({ x: targetX, y: targetY });
            if (blockingItem || blockingRock) {
                return false; // No se puede mover si la casilla está ocupada por otro objeto
            }
    
            // Mover la roca si la casilla está libre
            if (!this.isTileOccupied({ x: targetX, y: targetY })) {
                rock.sprite.x += direction.x * TILE_SIZE;
                rock.sprite.y += direction.y * TILE_SIZE;
                rock.gridX = targetX;
                rock.gridY = targetY;
                return true;
            }
        }
    
        return false;
    }
    
    pushItem(item, direction) {
        const targetX = item.gridX + direction.x;
        const targetY = item.gridY + direction.y;
    
        if (
            targetX >= 0 && targetX < GRID_WIDTH &&
            targetY >= 0 && targetY < GRID_HEIGHT
        ) {
            // Verificar si la casilla siguiente está ocupada por otro objeto (ítem o roca)
            const blockingItem = this.getItemAt({ x: targetX, y: targetY });
            const blockingRock = this.getRockAt({ x: targetX, y: targetY });
            if (blockingItem || blockingRock) {
                return false; // No se puede mover si la casilla está ocupada por otro objeto
            }
    
            // Mover el ítem si la casilla está libre
            if (!this.isTileOccupied({ x: targetX, y: targetY })) {
                item.sprite.x += direction.x * TILE_SIZE;
                item.sprite.y += direction.y * TILE_SIZE;
                item.gridX = targetX;
                item.gridY = targetY;
                return true;
            }
        }
    
        return false;
    }
    
    getItemAt(tile) {
        return this.items.find(item => item.gridX === tile.x && item.gridY === tile.y) || null;
    }
    
    getRockAt(tile) {
        return this.rocks.find(rock => rock.gridX === tile.x && rock.gridY === tile.y) || null;
    }

    checkItemPush(item) {
        // Verifica si el jugador está cerca de un ítem para empujarlos
        const playerBounds = this.player.getBounds();
        const itemBounds = item.sprite.getBounds();
        return Phaser.Geom.Intersects.RectangleToRectangle(playerBounds, itemBounds);
    }
    
    isTileOccupied(tile) {
        return this.items.some(item => item.gridX === tile.x && item.gridY === tile.y) ||
               this.rocks.some(rock => rock.gridX === tile.x && rock.gridY === tile.y);
    }

    checkVictory() {
        return this.items.every(item => {
            const platform = this.platforms.find(p => p.name === item.name);
            
            if (platform) {
                const distance = Phaser.Math.Distance.Between(item.sprite.x, item.sprite.y, platform.sprite.x, platform.sprite.y);
                return distance < TILE_SIZE / 2;
            }
            
            return false;
        });
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
    
        // Guardar el tiempo en el localStorage con el nombre del nivel
        localStorage.setItem('level48Time', elapsedTime); // Almacenar tiempo del nivel 1
    
        const victoryText = this.add.text(735, 330, `¡Nivel completado!\nTiempo: ${elapsedTime}s\nPresiona Enter para regresar`, {
            font: '24px Arial',
            fill: '#FFFFFF',
            align: 'center',
        }).setOrigin(0.5);
    
        victoryText.setDepth(10);
    
        this.input.keyboard.once('keydown-ENTER', () => {
            console.log('Regresando a niveles4...');
            this.scene.stop('nt3');
            this.scene.start('niveles4');
        });
    }
}