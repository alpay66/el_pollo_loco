class ThrowableObject extends MovableObject {
    ROTATED_SALSA_BOTTLE = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png'); // Ruft den Konstruktor von MovableObject auf
        this.x = x;
        this.y = y;
        this.height = 90;
        this.width = 70;
        this.throwBottle();
    }

    throwBottle() {
        this.speedY = 30;
        this.applyGravity();
        setInterval(( ) => {
            this.x += 10;
        }, 25);
    }
}
