class Coin extends DrawableObject {
    COIN_IMAGES = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];

    constructor(minX, maxX, y) {
        super();
        let randomCoin = this.COIN_IMAGES[Math.floor(Math.random() * this.COIN_IMAGES.length)];
        this.loadImage(randomCoin); // Zufälliges Coin-Bild laden
        this.x = Math.floor(Math.random() * (maxX - minX)) + minX;         // Zufällige X-Position zwischen minX und maxX
        this.y = y;
        this.width = 100;
        this.height = 100;

        if (randomCoin === 'img/8_coin/coin_2.png') {         // Falls der größere Coin gewählt wird, passe die Größe an
            this.width = 150;
            this.height = 150;
        }
        this.startCoinAnimation();
    }

    startCoinAnimation() {
        setInterval(() => {
            this.animateCoin();
        }, 1000); // Alle 1 Sekunde Animation starten
    }

    animateCoin() {
    let growSize = 10; // Um wie viel der Coin wachsen soll

    // Coin wächst
    this.width += growSize;
    this.height += growSize;
    this.x -= growSize / 2; // Damit es von der Mitte aus wächst
    this.y -= growSize / 2;

    // Nach 200ms zurück zur normalen Größe
    setTimeout(() => {
        this.width -= growSize;
        this.height -= growSize;
        this.x += growSize / 2;
        this.y += growSize / 2;
    }, 200);
}

}
