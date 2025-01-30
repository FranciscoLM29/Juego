const TILE_SIZE = 75;
const GRID_WIDTH = 16;
const GRID_HEIGHT = 8;
const PIPE_TYPES = [
    { name: 'straight-v', connections: ['up', 'down'] },
    { name: 'straight-h', connections: ['left', 'right'] },
    { name: 'corner-ur', connections: ['up', 'right'] },
    { name: 'corner-ul', connections: ['up', 'left'] },
    { name: 'corner-dr', connections: ['down', 'right'] },
    { name: 'corner-dl', connections: ['down', 'left'] },
    { name: 'cross', connections: ['up', 'down', 'left', 'right'] },
    { name: 'T_up', connections: ['up', 'left', 'right'] },
    { name: 'T_down', connections: ['down', 'left', 'right'] },
    { name: 'T_left', connections: ['up', 'down', 'left'] },
    { name: 'T_right', connections: ['up', 'down', 'right'] },
];
const INITIAL_PIPES = [
    { gridX: 11, gridY: 2, type: 'corner-dr', locked: true },
    { gridX: 10, gridY: 6, type: 'straight-v', locked: false },
    { gridX: 11, gridY: 4, type: 'straight-v', locked: false },
    { gridX: 1, gridY: 2, type: 'straight-h', locked: false },
    { gridX: 1, gridY: 6, type: 'straight-h', locked: false },
    { gridX: 7, gridY: 1, type: 'straight-h', locked: false },
    { gridX: 14, gridY: 4, type: 'straight-h', locked: false },
    { gridX: 8, gridY: 6, type: 'corner-ur', locked: false },
    { gridX: 2, gridY: 2, type: 'corner-dl', locked: false },
];
const FIXED_ROCKS_POSITIONS = [
    { x: 0, y: 0 },
    { x: 0, y: 7 },
    { x: 1, y: 4 },
    { x: 2, y: 4 },
    { x: 3, y: 4 },
    { x: 3, y: 5 },
    { x: 5, y: 2 },
    { x: 6, y: 2 },
    { x: 6, y: 5 },
    { x: 6, y: 6 },
    { x: 6, y: 7 },
    { x: 7, y: 5 },
    { x: 8, y: 0 },
    { x: 8, y: 1 },
    { x: 8, y: 2 },
    { x: 8, y: 5 },
    { x: 9, y: 5 },
    { x: 10, y: 5 },
    { x: 12, y: 4 },
    { x: 13, y: 5 },
    { x: 14, y: 6 },
    { x: 15, y: 7 },
    { x: 15, y: 0 }
];

export class Zona5N13 extends Phaser.Scene {
    constructor() {
        super({ key: 'nl13' });
    }

    preload() {
        this.load.image('laboratorio', 'Imagenes/laboratorio.png');
        this.load.image('tile5', 'Imagenes/Botones5/casilla.png');
        this.load.image('pipe-start', 'Imagenes/tuberias/pipe-start.png');
        this.load.image('pipe-end', 'Imagenes/tuberias/pipe-end.png');
        this.load.image('rock_obstacle5', 'Imagenes/Botones5/capsule.png');
        PIPE_TYPES.forEach(pipe => {
            this.load.image(pipe.name, `Imagenes/tuberias/${pipe.name}.png`);
        });
        this.load.spritesheet('slimi', 'Imagenes/slimi.png', {
            frameWidth: TILE_SIZE,
            frameHeight: TILE_SIZE,
        });
    }           

    create() {
        this.add.image(735, 330, 'laboratorio'); // Fondo
    
        // Calcular el desplazamiento inicial para centrar la cuadrícula
        this.gridOffset = {
            x: (this.scale.width - GRID_WIDTH * TILE_SIZE) / 2,
            y: (this.scale.height - GRID_HEIGHT * TILE_SIZE) / 2,
        };
    
        this.grid = this.createGrid(); // Crear cuadrícula
        this.startPipe = this.addInitialPipe(13, 7, 'pipe-start', ['up']);
        this.endPipe = this.addFinalPipe(15, 2, 'pipe-end', ['left']);
        this.pipes = []; // Inicializar el arreglo de tuberías
        this.rocks = []; // Inicializar el arreglo de rocas
    
        // Colocar las piedras en la cuadrícula
        FIXED_ROCKS_POSITIONS.forEach(position => {
            const { x: pixelX, y: pixelY } = this.gridToPixel(position.x, position.y);
            const fixedRock = this.add.image(pixelX, pixelY, 'rock_obstacle5').setOrigin(0.5).setDepth(1);
            this.rocks.push({ type: 'obstacle', sprite: fixedRock, gridX: position.x, gridY: position.y });
            this.grid[position.y][position.x] = { type: 'obstacle' }; // Marcar la posición en la cuadrícula
        });
    
        // Colocar las tuberías iniciales desde el arreglo INITIAL_PIPES
        INITIAL_PIPES.forEach(pipe => {
            this.addPipe(pipe.gridX, pipe.gridY, pipe.type, pipe.locked);
        });

        // Variables de tiempo
        this.lastMoveTime = 0;
        this.startTime = null;  // Tiempo comienza en null
        this.bestTime = localStorage.getItem('bestTime') || null;
    
        // Crear animaciones del jugador
        this.createPlayerAnimations();
    
        // Posición inicial del jugador
        this.gridPosition = { x: 13, y: 6 }; // Posición inicial del jugador
        const { x, y } = this.gridToPixel(this.gridPosition.x, this.gridPosition.y);
        this.player = this.add.sprite(x, y, 'slimi').play('idle');
        this.player.setDepth(3);

        this.cursors = this.input.keyboard.createCursorKeys();

        this.levelCompleted = false;

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
        if (this.startTime === null && 
            (this.cursors.left.isDown || this.cursors.right.isDown || this.cursors.up.isDown || this.cursors.down.isDown)) {
            this.startTime = time; // Iniciar el temporizador en el primer movimiento
        }
    
        // Si el temporizador ya ha comenzado, mostrar el tiempo transcurrido
        if (this.startTime !== null) {
            const elapsedTime = Math.max(0, Math.floor((time - this.startTime) / 1000)); // Asegurar que no sea NaN ni negativo
            this.timeText.setText(`Tiempo: ${elapsedTime}s`); // Actualizar el texto del tiempo
        }
    
        // Limitar la frecuencia de movimiento (esperar 200ms entre movimientos)
        if (time - this.lastMoveTime < 200) return;
    
        let moving = false;
        let newPosition = { x: this.gridPosition.x, y: this.gridPosition.y };
    
        // Determinar la nueva posición basada en la entrada del jugador
        if (this.cursors.left.isDown && this.gridPosition.x > 0) {
            newPosition.x--;
            moving = true;
            this.player.anims.play('move_horizontal', true);
        } else if (this.cursors.right.isDown && this.gridPosition.x < GRID_WIDTH - 1) {
            newPosition.x++;
            moving = true;
            this.player.anims.play('move_horizontal', true);
        } else if (this.cursors.up.isDown && this.gridPosition.y > 0) {
            newPosition.y--;
            moving = true;
            this.player.anims.play('move_vertical', true);
        } else if (this.cursors.down.isDown && this.gridPosition.y < GRID_HEIGHT - 1) {
            newPosition.y++;
            moving = true;
            this.player.anims.play('move_vertical', true);
        }
    
        if (!moving) {
            this.player.anims.play('idle', true); // Reproducir animación "idle" si no hay movimiento
            return;
        }
    
        // Evitar moverse a casillas con obstáculos inamovibles
        if (this.grid[newPosition.y][newPosition.x]?.type === 'obstacle') {
            return; // Evita que el jugador se mueva a una casilla con un obstáculo
        }
    
        // Comprobar si hay una tubería en la nueva posición
        const pipe = this.pipes.find(pipe => pipe.gridX === newPosition.x && pipe.gridY === newPosition.y);
    
        if (pipe) {
            // Intentar empujar la tubería
            const pipeMoved = this.pushPipe(pipe, this.gridPosition);
            if (pipeMoved) {
                this.gridPosition = newPosition; // Actualizar posición si la tubería fue movida
                const { x, y } = this.gridToPixel(this.gridPosition.x, this.gridPosition.y);
                this.player.x = x;
                this.player.y = y;
            }
        } else {
            // Actualizar posición si no hay tubería
            this.gridPosition = newPosition;
            const { x, y } = this.gridToPixel(this.gridPosition.x, this.gridPosition.y);
            this.player.x = x;
            this.player.y = y;
        }
    
        // Actualizar el tiempo del último movimiento
        this.lastMoveTime = time;
    
        // Verificar si el nivel se completó
        this.checkVictory(time);
    }

    createGrid() {
        const grid = [];
        for (let y = 0; y < GRID_HEIGHT; y++) {
            grid[y] = [];
            for (let x = 0; x < GRID_WIDTH; x++) {
                const { x: pixelX, y: pixelY } = this.gridToPixel(x, y);
                this.add.image(pixelX, pixelY, 'tile5').setOrigin(0.5).setDepth(0);
                grid[y][x] = null;
            }
        }
        return grid;
    }

    // Crear las animaciones del jugador (slimi)
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
            frameRate: 10,  // Puedes ajustar el frameRate para un movimiento más fluido
            repeat: -1,
        });

        this.anims.create({
            key: 'move_horizontal',
            frames: [{ key: 'slimi', frame: 3 }],
            frameRate: 10,  // Puedes ajustar el frameRate para un movimiento más fluido
            repeat: -1,
        });
    }

    getNeighbor(gridX, gridY, direction) {
        const offsets = { up: { x: 0, y: -1 }, down: { x: 0, y: 1 }, left: { x: -1, y: 0 }, right: { x: 1, y: 0 } };
        const offset = offsets[direction];
        const neighborX = gridX + offset.x;
        const neighborY = gridY + offset.y;

        if (neighborX < 0 || neighborX >= GRID_WIDTH || neighborY < 0 || neighborY >= GRID_HEIGHT) {
            return null;
        }

        return this.grid[neighborY][neighborX];
    }

    getOppositeDirection(direction) {
        const opposites = { up: 'down', down: 'up', left: 'right', right: 'left' };
        return opposites[direction];
    }

    addPipe(gridX, gridY, typeName, locked = false) {
        const pipeType = PIPE_TYPES.find(p => p.name === typeName);
        if (!pipeType) throw new Error(`Pipe type "${typeName}" not found`);
        
        const { x, y } = this.gridToPixel(gridX, gridY);
        const sprite = this.add.sprite(x, y, typeName).setDepth(2);
    
        const pipe = { gridX, gridY, sprite, connections: pipeType.connections, locked };
        this.grid[gridY][gridX] = pipe;
        this.pipes.push(pipe); // Agregar al arreglo de tuberías
    
        return pipe;
    }    

    addInitialPipe(gridX, gridY, typeName, connections) {
        const { x, y } = this.gridToPixel(gridX, gridY);
        const sprite = this.add.sprite(x, y, typeName).setDepth(2);
        const pipe = { gridX, gridY, sprite, connections, locked: true };
        this.grid[gridY][gridX] = pipe;
        return pipe;
    }
    
    addFinalPipe(gridX, gridY, typeName, connections) {
        const { x, y } = this.gridToPixel(gridX, gridY);
        const sprite = this.add.sprite(x, y, typeName).setDepth(2);
        const pipe = { gridX, gridY, sprite, connections, locked: true };
        this.grid[gridY][gridX] = pipe;
        return pipe;
    }

    isTileOccupied(gridX, gridY) {
        const tile = this.grid[gridY][gridX];
        return tile !== null && tile.type !== undefined;
    }

    isNearStartOrEnd(gridX, gridY) {
        const nearStart = Phaser.Math.Distance.Between(gridX, gridY, this.startPipe.gridX, this.startPipe.gridY) <= 1;
        const nearEnd = Phaser.Math.Distance.Between(gridX, gridY, this.endPipe.gridX, this.endPipe.gridY) <= 1;
        return nearStart || nearEnd;
    }

    gridToPixel(gridX, gridY) {
        return { 
            x: gridX * TILE_SIZE + TILE_SIZE / 2 + this.gridOffset.x,
            y: gridY * TILE_SIZE + TILE_SIZE / 2 + this.gridOffset.y
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

    getPushDirection(newX, newY) {
        const dx = newX - this.gridPosition.x;
        const dy = newY - this.gridPosition.y;
        if (dx === 1) return 'right';
        if (dx === -1) return 'left';
        if (dy === 1) return 'down';
        if (dy === -1) return 'up';
        return null;
    }

    pushPipe(pipe, playerPosition) {
        if (pipe.locked) {
            return false; // No se puede empujar una tubería bloqueada
        }
    
        let targetX = pipe.gridX;
        let targetY = pipe.gridY;
    
        // Determinar la dirección del empuje
        if (playerPosition.x < pipe.gridX) targetX++;
        else if (playerPosition.x > pipe.gridX) targetX--;
        else if (playerPosition.y < pipe.gridY) targetY++;
        else if (playerPosition.y > pipe.gridY) targetY--;
    
        // Verificar si la casilla objetivo está fuera de límites, ocupada o tiene una piedra o una tubería
        if (
            targetX < 0 || targetX >= GRID_WIDTH || 
            targetY < 0 || targetY >= GRID_HEIGHT ||
            this.grid[targetY][targetX]?.type === 'obstacle' || 
            this.grid[targetY][targetX]?.connections // Si ya hay una tubería en la posición objetivo
        ) {
            return false; // La tubería no puede ser empujada
        }
    
        // Limpiar la posición anterior en la cuadrícula
        this.grid[pipe.gridY][pipe.gridX] = null;
    
        // Actualizar la posición de la tubería
        pipe.gridX = targetX;
        pipe.gridY = targetY;
    
        // Actualizar la posición física del sprite
        pipe.sprite.x = this.gridToPixel(targetX, targetY).x;
        pipe.sprite.y = this.gridToPixel(targetX, targetY).y;
    
        // Registrar la nueva posición en la cuadrícula
        this.grid[targetY][targetX] = pipe;
    
        return true; // El tubo fue empujado correctamente
    }

    checkVictory(time) {
        const visited = new Set();
        const stack = [{ x: this.startPipe.gridX, y: this.startPipe.gridY }];
    
        while (stack.length > 0) {
            const { x, y } = stack.pop();
            const key = `${x},${y}`;
    
            if (visited.has(key)) continue;
            visited.add(key);
    
            const currentPipe = this.grid[y][x];
            if (!currentPipe) continue;
    
            currentPipe.connections.forEach(direction => {
                const neighbor = this.getNeighbor(x, y, direction);
                if (neighbor && neighbor.connections.includes(this.getOppositeDirection(direction))) {
                    stack.push({ x: neighbor.gridX, y: neighbor.gridY });
                }
            });
        }
    
        const isVictory = visited.has(`${this.endPipe.gridX},${this.endPipe.gridY}`);
        if (isVictory) {
            this.completeLevel(time); // Llama a completeLevel si el nivel se completó
        }
    }
    
    completeLevel(time) {
        this.levelCompleted = true;
    
        const elapsedTime = ((time - this.startTime) / 1000).toFixed(2);
        if (this.bestTime === null || elapsedTime < this.bestTime) {
            this.bestTime = elapsedTime;
            localStorage.setItem('bestTime', elapsedTime);
        }
    
        // Guardar el tiempo en el localStorage con el nombre del nivel
        localStorage.setItem('level73Time', elapsedTime); // Almacenar tiempo del nivel 1
    
        const victoryText = this.add.text(735, 330, `¡Nivel completado!\nTiempo: ${elapsedTime}s\nPresiona Enter para regresar`, {
            font: '24px Arial',
            fill: '#FFFFFF',
            align: 'center',
        }).setOrigin(0.5);
    
        victoryText.setDepth(10);
    
        this.input.keyboard.once('keydown-ENTER', () => {
            console.log('Regresando a niveles5...');
            this.scene.stop('nl13');
            this.scene.start('niveles5');
        });
    }
}