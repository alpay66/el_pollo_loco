/**
 * Repräsentiert eine Münze im Spiel, die vom Spieler gesammelt werden kann.
 */
class Coin extends DrawableObject {
    COIN_IMAGES = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];
    offset = {
        top: 60,
        bottom: 60,
        left: 60,
        right: 60
    };

    /**
     * Erstellt eine neue Münze mit zufälligem Erscheinungsbild und Position.
     * @param {number} minX - Die minimale X-Position der Münze.
     * @param {number} maxX - Die maximale X-Position der Münze.
     * @param {number} y - Die Y-Position der Münze.
     */
    constructor(minX, maxX, y) {
        super();
        let randomCoin = this.COIN_IMAGES[Math.floor(Math.random() * this.COIN_IMAGES.length)];
        this.loadImage(randomCoin);
        this.x = Math.floor(Math.random() * (maxX - minX)) + minX;
        this.y = y;
        this.width = 100;
        this.height = 100;

        if (randomCoin === 'img/8_coin/coin_2.png') {
            this.width = 150;
            this.height = 150;
        }
        this.startCoinAnimation();
    }

    /**
     * Startet die Animationsschleife für die Münze.
     */
    startCoinAnimation() {
        setInterval(() => {
            this.animateCoin();
        }, 1000);
    }

    /**
     * Lässt die Münze kurz größer und dann wieder kleiner werden.
     */
    animateCoin() {
        let growSize = 10;
        this.growCoin(growSize);

        setTimeout(() => {
            this.shrinkCoin(growSize);
        }, 200);
    }

    /**
     * Vergrößert die Münze um die angegebene Größe.
     * @param {number} size - Die Vergrößerung in Pixeln.
     */
    growCoin(size) {
        this.width += size;
        this.height += size;
        this.x -= size / 2;
        this.y -= size / 2;
    }

    /**
     * Verkleinert die Münze um die angegebene Größe.
     * @param {number} size - Die Verkleinerung in Pixeln.
     */
    shrinkCoin(size) {
        this.width -= size;
        this.height -= size;
        this.x += size / 2;
        this.y += size / 2;
    }
}
