/**
 * Repräsentiert die Lebensanzeige des Charakters im Spiel.
 */
class Healthbar extends DrawableObject {
    STATUSBAR_HEALTH_IMAGE = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png'
    ];
    percantege = 100;
    type;

    /**
     * Erstellt eine neue Lebensanzeige und lädt die entsprechenden Bilder.
     */
    constructor() {
        super();
        this.loadImages(this.STATUSBAR_HEALTH_IMAGE);
        this.x = 20;
        this.y = 20;
        this.width = 120;
        this.height = 40;
        this.setPercentage(100);
    }
    
    /**
     * Setzt die Lebensanzeige auf den angegebenen Wert.
     * @param {number} percantege - Der Prozentsatz der verbleibenden Lebenspunkte (0-100).
     */
    setPercentage(percantege) {
        this.percantege = percantege;
        let path = this.STATUSBAR_HEALTH_IMAGE[this.resolveImageIndex()];
        this.img = this.imgCache[path];
    }

    /**
     * Bestimmt den Index des anzuzeigenden Bildes basierend auf der aktuellen Lebensanzeige.
     * @returns {number} Der Index des passenden Bildes im `STATUSBAR_HEALTH_IMAGE`-Array.
     */
    resolveImageIndex() {
        if (this.percantege == 100) return 5;
        if (this.percantege >= 80) return 4;
        if (this.percantege >= 60) return 3;
        if (this.percantege >= 40) return 2;
        if (this.percantege >= 20) return 1;
        return 0;
    }
}
