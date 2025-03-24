/**
 * Repräsentiert ein werfbares Salsa-Flaschen-Objekt im Spiel.
 * Erbt von MovableObject und implementiert Wurfbewegung, Rotation und Zersplittern.
 */
class ThrowableObject extends MovableObject {
    /** @type {string[]} Animation für die drehende Flasche. */
    ROTATED_SALSA_BOTTLE = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    /** @type {string[]} Animation für das Zersplittern der Flasche. */
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
    splashSound = new Audio('audio/bottle-crack.mp3');

    /**
     * Erstellt ein neues ThrowableObject mit Startposition und Geschwindigkeit.
     * @param {number} x - Startposition X-Achse.
     * @param {number} y - Startposition Y-Achse.
     * @param {number} [speedX=7] - Horizontale Geschwindigkeit der Flasche.
     */
    constructor(x, y, speedX = 7) {
        super().loadImage(this.ROTATED_SALSA_BOTTLE[0]);
        this.loadImages(this.ROTATED_SALSA_BOTTLE);
        this.loadImages(this.SALSA_BOTTLE_SPLASH);
        this.x = x;
        this.y = y;
        this.speedX = speedX;
        this.world = world;
        this.throwBottle();
        this.splashSound = new Audio('audio/bottle-crack.mp3');
        registerSound(this.splashSound);
    }

    /**
     * Löst den Wurf der Flasche aus, aktiviert Schwerkraft, Bewegung und Rotation.
     */
    throwBottle() {
        this.speedY = 30;
        this.applyGravity();
        this.startThrowMovement();
        this.startBottleRotate();
    }

    /**
     * Bewegt die Flasche nach vorne, bis sie auf den Boden trifft.
     */
    startThrowMovement() {
        this.throwInterval = setInterval(() => {
            if (this.y < 360) {
                this.x += this.speedX;
            } else {
                this.splash();
            }
        }, 25);
    }

    /**
     * Lässt die Flasche rotieren, solange sie sich bewegt.
     */
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

    /**
     * Beendet die Bewegung und spielt die Splash-Animation ab.
     */
    splash() {
        this.clearBottleIntervals();
        this.playAnimation(this.SALSA_BOTTLE_SPLASH);
        this.playSplashSound();

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

    /**
     * Spielt den Sound für das Zersplittern der Flasche.
     */
    playSplashSound() { 
        if (!isMuted) {
            this.splashSound.currentTime = 0;
            this.splashSound.play();
        }
    }

    /**
     * Stoppt alle Bewegungen der Flasche und beendet ihre Intervalls.
     */
    clearBottleIntervals() {
        this.speedX = 0;
        this.speedY = 0;
        clearInterval(this.throwInterval);
        clearInterval(this.rotationInterval);
    }
}
