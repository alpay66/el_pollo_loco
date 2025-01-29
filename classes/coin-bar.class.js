class Coinbar extends DrawableObject {
    COIN_BAR_IMAGES = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png'
    ];
    collectedCoins = 0;

    constructor() {
        super();
        this.loadImages(this.COIN_BAR_IMAGES);
        this.x = 250;
        this.y = 20; // Unter Healthbar
        this.width = 220;
        this.height = 40;
        this.setCoins(0);
    }

    setCoins(coins) {
        this.collectedCoins = coins;
        this.img = this.imgCache[this.COIN_BAR_IMAGES[this.resolveImageIndex()]];
    }

    resolveImageIndex() {
        return Math.min(5, Math.floor(this.collectedCoins / 5)); // Maximal 100%
    }
}
