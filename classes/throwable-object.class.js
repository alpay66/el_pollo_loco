class ThrowableObject extends MovableObject {
    ROTATED_SALSA_BOTTLE = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    // speedX: horizontale Fluggeschwindigkeit, rotationSpeed: wie schnell die Bilder wechseln (Rotation)
    constructor(x, y, speedX = 7, rotationSpeed = 1) {

        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.x = x;
        this.y = y;
        this.height = 90;
        this.width = 70;
        this.speedX = speedX;
        this.rotationSpeed = rotationSpeed;
        this.throwBottle();
    }

    throwBottle() {
        this.speedY = 30;
        this.applyGravity();
        this.startThrowMovement();
        this.startRotationAnimation();
    }
    
    startThrowMovement() {
        setInterval(() => {
            this.x += this.speedX;
        }, 25);
    }
    
    startRotationAnimation() {
        let rotationIndex = 0;
        setInterval(() => {
            rotationIndex = (rotationIndex + this.rotationSpeed) % this.ROTATED_SALSA_BOTTLE.length;
            this.loadImage(this.ROTATED_SALSA_BOTTLE[Math.floor(rotationIndex)]);
        }, 25);
    }
    
}
