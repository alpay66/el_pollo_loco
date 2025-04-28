/**
 * Repräsentiert das Chicken als Gegner im Spiel.
 */
class Chicken extends MovableObject {
    y = 335;
    height = 110;
    width = 80;
    isDead = false;
    CHICKEN_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];
    CHICKEN_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];
    chickenSound;
    offset = {
        top: 5,
        bottom: 5,
        left: 5,
        right: 5
    };

    /**
     * Erstellt ein neues Chicken mit zufälliger Position und Geschwindigkeit.
     */
    constructor() {
        super().loadImage(this.CHICKEN_WALKING[0]);
        this.loadImages(this.CHICKEN_WALKING);
        this.loadImages(this.CHICKEN_DEAD);
        this.x = 550 + Math.random() * 3600;
        this.speed = 0.85 + Math.random() * 1.9;
        this.offsetX = 0.2; 
        this.offsetY = 0.2;
        this.initChickenSound();
        this.animateChicken();
    }

    /**
     * Initialisiert den Chicken-Sound.
     */
    initChickenSound() {
        this.chickenSound = new Audio('audio/chicken.mp3');
        allSounds.push(this.chickenSound);

        if (isMuted) {
            this.chickenSound.volume = 0;
            this.chickenSound.pause();
        } else {
            this.chickenSound.volume = 0.1;
        }
    }

    /**
     * Startet die Animation und Bewegung des Chickens.
     */
    animateChicken() {
        this.walkingInterval = setInterval(() => {
            if (!this.chickenSoundPlaying) {
                this.playChickenSound();
            }
            this.moveLeft();
        }, 1000 / 30);

        this.animationInterval = setInterval(() => {
            this.playAnimation(this.CHICKEN_WALKING);
        }, 150);
    }

    /**
     * Spielt den Chicken-Sound ab.
     */
    playChickenSound() {
        if (!isMuted) {
            this.chickenSound.loop = true;
            this.chickenSound.play();
        }
        this.chickenSoundPlaying = true;
    }

    /**
     * Stoppt den Chicken-Sound.
     */
    stopChickenSound() {
        this.chickenSound.pause();
        this.chickenSound.currentTime = 0;
        this.chickenSoundPlaying = false;
    }

    /**
     * Beendet die Bewegung des Chickens und spielt die Sterbeanimation ab.
     */
    die() {
        this.isDead = true;
        this.stopChickenSound();
        clearInterval(this.walkingInterval);
        clearInterval(this.animationInterval);
        this.loadImage(this.CHICKEN_DEAD[0]);
    }
}
