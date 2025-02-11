class Bottlebar extends DrawableObject {
    BOTLLE_BAR_IMAGE = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png'
    ];
    
    collectedBottles = 100;

    constructor() {
        super();
        this.loadImages(this.BOTLLE_BAR_IMAGE);
        this.x = 280;
        this.y = 20; // Unter Coinbar
        this.width = 120;
        this.height = 40;
        this.setBottles(100); // i set it for me on 100 to implate the splash effect
    }

    setBottles(bottles) {
        this.collectedBottles = bottles;
        let path = this.BOTLLE_BAR_IMAGE[this.resolveImageIndex()];
        this.img = this.imgCache[path];
    }

    resolveImageIndex() {
        if (this.collectedBottles >= 5) {
            return 5;
        } else if (this.collectedBottles >= 4) {
            return 4;
        } else if (this.collectedBottles >= 3) {
            return 3;
        } else if (this.collectedBottles >= 2) {
            return 2;
        } else if (this.collectedBottles >= 1) {
            return 1;
        } else {
            return 0;
        }
    }
}
