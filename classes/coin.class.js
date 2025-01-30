class Coin extends DrawableObject {
    COIN_IMAGES = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];

    constructor(x, y) {
        super();
        let randomCoin = this.COIN_IMAGES[Math.floor(Math.random() * this.COIN_IMAGES.length)];
        this.loadImage(randomCoin); // Zufälliges Coin-Bild laden
        this.x = x;
        this.y = y;
        this.width = 50; // Standardgröße
        this.height = 50;

        // Optional: Zufällige Größenvariation (falls gewünscht)
        if (randomCoin == 'img/8_coin/coin_2.png') {
            this.width = 100;
            this.height = 100;
        }
    }
}

