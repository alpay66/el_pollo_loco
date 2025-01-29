class Bottlebar extends DrawableObject {
    BOTLLE_BAR_IMAGE = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png'
    ];

    collectedBottles = 0;

    constructor() {
        super();
        this.loadImages(this.BOTLLE_BAR_IMAGE);
        this.x = 480;
        this.y = 20; // Unter Coinbar
        this.width = 220;
        this.height = 40;
        this.setBottles(0);
    }

    setBottles(bottles) {
        this.collectedBottles = bottles;
        this.img = this.imgCache[this.BOTLLE_BAR_IMAGE[this.resolveImageIndex()]];
    }

    resolveImageIndex() {
        return Math.min(5, Math.floor(this.collectedBottles / 5)); // Maximal 100%
    }
}
