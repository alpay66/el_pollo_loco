/**
 * Repräsentiert die Münz-Leiste im Spiel, die den Fortschritt der gesammelten Münzen anzeigt.
 */
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

    /**
     * Erstellt eine neue Münz-Leiste und lädt die Bilder.
     */
    constructor() {
        super();
        this.loadImages(this.COIN_BAR_IMAGES);
        this.x = 150;
        this.y = 20;
        this.width = 120;
        this.height = 40;
        this.setCoins(0);
    }

    /**
     * Aktualisiert die Münz-Leiste basierend auf der Anzahl der gesammelten Münzen.
     * @param {number} coins - Die aktuelle Anzahl gesammelter Münzen.
     */
    setCoins(coins) {
        this.collectedCoins = coins;
        let path = this.COIN_BAR_IMAGES[this.resolveImageIndex()];
        this.img = this.imgCache[path];
    }

    /**
     * Bestimmt das passende Bild für die Münz-Leiste basierend auf den gesammelten Münzen.
     * @returns {number} Der Index des Bildes aus dem COIN_BAR_IMAGES-Array.
     */
    resolveImageIndex() {
        if (this.collectedCoins >= 5) return 5;
        if (this.collectedCoins >= 4) return 4;
        if (this.collectedCoins >= 3) return 3;
        if (this.collectedCoins >= 2) return 2;
        if (this.collectedCoins >= 1) return 1;
        return 0;
    }
}
