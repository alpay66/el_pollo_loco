class ThrowableObject extends MovableObject {
    ROTATED_SALSA_BOTTLE = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];
    SALSA_BOTTLE_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

    rotationSpeed = 0.5;
    height = 90;
    width = 70;
    hitSound = new Audio('audio/bottle-crack.mp3');

    constructor(x, y, speedX = 7) {
        super().loadImage(this.ROTATED_SALSA_BOTTLE[0]);
        this.loadImages(this.ROTATED_SALSA_BOTTLE);
        this.loadImages(this.SALSA_BOTTLE_SPLASH);
        this.x = x;
        this.y = y;
        this.speedX = speedX;
        this.world = world;
        this.throwBottle();
    }

    throwBottle() {
        this.speedY = 30;
        this.applyGravity();
        this.startThrowMovement();
        this.startBottleRotate();
    }

    startThrowMovement() {
        this.throwInterval = setInterval(() => {
            if (this.y < 360) {
                this.x += this.speedX;
            } else {
                this.splash();
            }
        }, 25);
    }

    startBottleRotate() {
        let rotationIndex = 0;
        this.rotationInterval = setInterval(() => {
            if (this.y < 360) {
                rotationIndex = (rotationIndex + this.rotationSpeed) % this.ROTATED_SALSA_BOTTLE.length;
                this.loadImage(this.ROTATED_SALSA_BOTTLE[Math.floor(rotationIndex)]);
            } else {
                clearInterval(this.rotationInterval);
            }
        }, 25);
    }

    splash() {
        this.clearBottleIntervals();
        this.playAnimation(this.SALSA_BOTTLE_SPLASH);
        this.splashSound();

        setTimeout(() => {
            this.loadImage(this.SALSA_BOTTLE_SPLASH[this.SALSA_BOTTLE_SPLASH.length - 1]);

            if (this.world) {
                let bottleIndex = this.world.throwableObjects.indexOf(this);
                if (bottleIndex !== -1) {
                    this.world.throwableObjects.splice(bottleIndex, 1);
                }
            }
        }, 400);
    }

    splashSound() {
        this.hitSound.currentTime = 0;
        this.hitSound.play();
    }

    clearBottleIntervals() {
        this.speedX = 0;
        this.speedY = 0;
        clearInterval(this.throwInterval);
        clearInterval(this.rotationInterval);
    }

}
