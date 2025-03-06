class Coin extends DrawableObject {
    COIN_IMAGES = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];

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

    startCoinAnimation() {
        setInterval(() => {
            this.animateCoin();
        }, 1000);
    }

    animateCoin() {
        let growSize = 10;
        this.growCoin(growSize);

        setTimeout(() => {
            this.shrinkCoin(growSize);
        }, 200);
    }

    growCoin(size) {
        this.width += size;
        this.height += size;
        this.x -= size / 2;
        this.y -= size / 2;
    }

    shrinkCoin(size) {
        this.width -= size;
        this.height -= size;
        this.x += size / 2;
        this.y += size / 2;
    }
}
