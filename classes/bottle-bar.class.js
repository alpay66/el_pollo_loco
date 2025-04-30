/**
 * Statusleiste für gesammelte Flaschen.
 */
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

    /**
     * Erstellt die Bottlebar.
     */
    constructor() {
        super();
        this.loadImages(this.BOTLLE_BAR_IMAGE);
        this.x = 280;
        this.y = 20;
        this.width = 120;
        this.height = 40;
        this.setBottles(0);
    }

    /**
     * Aktualisiert die Flaschenanzahl und das Bild.
     * @param {number} bottles - Anzahl der gesammelten Flaschen.
     */
    setBottles(bottles) {
        this.collectedBottles = bottles;
        let path = this.BOTLLE_BAR_IMAGE[this.resolveImageIndex()];
        this.img = this.imgCache[path];
    }

    /**
     * Bestimmt das passende Bild für die Flaschenanzeige.
     * @returns {number} Index des Bildes.
     */
    resolveImageIndex() {
        return Math.min(5, Math.max(0, this.collectedBottles));
    }
}
