class Bottle extends DrawableObject {
    BOTTLE_IMAGES = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];

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
