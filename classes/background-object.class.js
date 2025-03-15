/**
 * Hintergrundobjekt im Spiel.
 */
class BackgroundObject extends MovableObject {
    
    width = 720;
    height = 480;

    /**
     * Erstellt ein Hintergrundobjekt.
     * @param {string} imagePath - Bildpfad.
     * @param {number} x - X-Koordinate.
     */
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.y = 480 - this.height;
        this.x = x;
    }
}
