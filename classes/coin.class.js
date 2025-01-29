class Coin extends DrawableObject {
    COIN_IMAGES = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];

    constructor(x, y) {
        super();
        this.loadImage('img/8_coin/coin_1.png'); // Zufälliges Coin-Bild laden
        this.x = x;
        this.y = y;
        this.width = 50; // Standardgröße
        this.height = 50;
    }
}

