export class Tutorial extends Phaser.Scene {
    constructor() {
        super({ key: 'tutorial' });
        this.currentPage = 0; // Página inicial
    }

    preload() {
        // Cargar imágenes comunes y específicas de cada página
        this.load.image('background', 'Imagenes/FondoMenu.png');
        this.load.image('marco', 'Imagenes/Marco.png');
        this.load.image('teclas', 'Imagenes/teclas.png');
        this.load.image('esc', 'Imagenes/esc.png');
        this.load.image('rock_obstacle', 'Imagenes/Botones1/RonaIn.png');
        this.load.image('rock_obstacle2', 'Imagenes/Botones2/Arbol.png');
        this.load.image('rock_obstacle3', 'Imagenes/Botones3/RocaIn.png');
        this.load.image('rock_obstacle4', 'Imagenes/Botones4/Escombro.png');
        this.load.image('rock_obstacle5', 'Imagenes/Botones5/capsule.png');
        this.load.image('rock_pushable', 'Imagenes/Botones1/RocaM.png');
        this.load.image('rock_pushable4', 'Imagenes/Botones4/Cofre.png');
        this.load.image('blue', 'Imagenes/Botones4/blue.png');
        this.load.image('bluePlatform', 'Imagenes/Botones4/bluePlatform.png');
        this.load.image('cross', 'Imagenes/tuberias/cross.png');
        this.load.image('item', 'Imagenes/item.png');
        this.load.image('visitedTile', 'Imagenes/Botones2/casillao.png');
        this.load.image('pipe-start', 'Imagenes/tuberias/pipe-start.png');
        this.load.image('pipe-end', 'Imagenes/tuberias/pipe-end.png');
        this.load.image('ladder', 'Imagenes/ladder.png');
        this.load.image('rock_pushable3', 'Imagenes/Botones3/RocaM.png');
        this.load.image('snow', 'Imagenes/Botones3/snow.png');
        this.load.image('text1', 'Imagenes/text1.png');
        this.load.image('text2', 'Imagenes/text2.png');
        this.load.image('text3', 'Imagenes/text3.png');
        this.load.image('text4', 'Imagenes/text4.png');
        this.load.image('text5', 'Imagenes/text5.png');
        this.load.image('text6', 'Imagenes/text6.png');
        this.load.image('text7', 'Imagenes/text7.png');
        this.load.image('text8', 'Imagenes/text8.png');
        this.load.image('text9', 'Imagenes/text9.png');
        this.load.image('text10', 'Imagenes/text10.png');
        this.load.image('text11', 'Imagenes/text11.png');
        this.load.image('text12', 'Imagenes/text12.png');
    }

    create() {
        // Fondo y marco (siempre visibles)
        this.add.image(735, 330, 'background');
        this.add.image(735, 330, 'marco');

        // Configurar las páginas con sus imágenes y textos
        this.pages = [
            {
                images: [
                    { key: 'teclas', x: 105, y: 165 },
                    { key: 'esc', x: 840, y: 165 },
                    { key: 'rock_obstacle', x: 30, y: 420 },
                    { key: 'rock_obstacle2', x: 30, y: 570 },
                    { key: 'rock_obstacle3', x: 105, y: 495 },
                    { key: 'rock_obstacle4', x: 180, y: 420 },
                    { key: 'rock_obstacle5', x: 180, y: 570 },
                    { key: 'rock_pushable', x: 765, y: 420 },
                    { key: 'rock_pushable4', x: 765, y: 570 },
                    { key: 'blue', x: 915, y: 420 },
                    { key: 'cross', x: 915, y: 570 },
                    { key: 'text1', x: 475, y: 165 },
                    { key: 'text2', x: 1210, y: 165 },
                    { key: 'text3', x: 475, y: 495 },
                    { key: 'text4', x: 1210, y: 495 }
                ],
            },
            {
                images: [
                    { key: 'item', x: 105, y: 165 },
                    { key: 'visitedTile', x: 840, y: 165 },
                    { key: 'blue', x: 30, y: 495 },
                    { key: 'bluePlatform', x: 180, y: 495 },
                    { key: 'pipe-start', x: 765, y: 495 },
                    { key: 'pipe-end', x: 915, y: 495 },
                    { key: 'text5', x: 475, y: 165 },
                    { key: 'text6', x: 1210, y: 165 },
                    { key: 'text7', x: 475, y: 495 },
                    { key: 'text8', x: 1210, y: 495 }
                ],
            },
            {
                images: [
                    { key: 'ladder', x: 105, y: 165 },
                    { key: 'visitedTile', x: 840, y: 165 },
                    { key: 'rock_pushable3', x: 30, y: 495 },
                    { key: 'snow', x: 180, y: 495 },
                    { key: 'cross', x: 840, y: 495 },
                    { key: 'text9', x: 475, y: 165 },
                    { key: 'text10', x: 1210, y: 165 },
                    { key: 'text11', x: 475, y: 495 },
                    { key: 'text12', x: 1210, y: 495 }
                ],
            }
        ];

        // Grupo para las imágenes de la página actual
        this.pageImages = this.add.group();

        // Mostrar la primera página
        this.updatePage();

        // Configurar entrada de teclado
        this.input.keyboard.on('keydown-RIGHT', this.nextPage, this);
        this.input.keyboard.on('keydown-LEFT', this.previousPage, this);

        // Volver al menú con Enter
        this.input.keyboard.on('keydown-ENTER', () => {
            this.scene.start('menu'); // Cambiar a la escena 'menu'
        });
    }

    nextPage() {
        if (this.currentPage < this.pages.length - 1) {
            this.currentPage++;
            this.updatePage();
        }
    }

    previousPage() {
        if (this.currentPage > 0) {
            this.currentPage--;
            this.updatePage();
        }
    }

    updatePage() {
        // Limpiar imágenes de la página anterior
        this.pageImages.clear(true, true);

        // Añadir nuevas imágenes
        const currentPageData = this.pages[this.currentPage];
        currentPageData.images.forEach((imgData) => {
            const img = this.add.image(imgData.x, imgData.y, imgData.key);
            this.pageImages.add(img);
        });
    }
}
