/**
 * Die Lebensanzeige des Endbosses.
 */
class EndbossBar extends DrawableObject {
    ENDBOSS_BAR_HEALTH_IMAGE = [
        'img/7_statusbars/2_statusbar_endboss/orange/orange0.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange20.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange40.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange60.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange80.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange100.png'
    ];
    percentage = 100;

    /**
     * Erstellt eine neue Endboss-Lebensanzeige.
     */
    constructor() {
        super();
        this.loadImages(this.ENDBOSS_BAR_HEALTH_IMAGE);
        this.x = 550;
        this.y = 25;
        this.width = 140;
        this.height = 40;
        this.setPercentage(100);
    }

    /**
     * Setzt die Lebensanzeige auf einen bestimmten Prozentsatz und aktualisiert das Bild.
     * @param {number} percentage - Der aktuelle Lebensprozentsatz (0-100).
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.ENDBOSS_BAR_HEALTH_IMAGE[this.resolveImageIndex()];
        this.img = this.imgCache[path];
    }

    /**
     * Bestimmt das passende Bild basierend auf dem Lebensprozentsatz.
     * @returns {number} Der Index des anzuzeigenden Bildes.
     */
    resolveImageIndex() {
        if (this.percentage == 100) return 5;
        if (this.percentage >= 80) return 4;
        if (this.percentage >= 60) return 3;
        if (this.percentage >= 40) return 2;
        if (this.percentage >= 20) return 1;
        return 0;
    }
}
