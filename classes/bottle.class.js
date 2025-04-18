/**
 * Repräsentiert eine Flasche im Spiel.
 */
class Bottle extends DrawableObject {
    BOTTLE_IMAGES = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];
    offset = {
        top: 10,
        bottom: 10,
        left: 20,
        right: 20
    };

    /**
     * Erstellt eine zufällige Flasche innerhalb eines Bereichs.
     * @param {number} minX - Minimale x-Position.
     * @param {number} maxX - Maximale x-Position.
     */
    constructor(minX, maxX) {
        super();
        let randomBottle = this.BOTTLE_IMAGES[Math.floor(Math.random() * this.BOTTLE_IMAGES.length)];
        this.loadImage(randomBottle);

        this.x = Math.floor(Math.random() * (maxX - minX)) + minX;
        this.y = 360;
        this.width = 90; 
        this.height = 90;
    }
}
