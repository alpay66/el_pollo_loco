/**
 * Repräsentiert das Chicken als Gegner im Spiel.
 */
class Chicken extends MovableObject {
    y = 335;
    height = 110;
    width = 80;
    CHICKEN_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];
    CHICKEN_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];
    chickenSound = new Audio('audio/chicken.mp3');

    /**
     * Erstellt ein neues Chicken mit zufälliger Position und Geschwindigkeit.
     */
    constructor() {
        super().loadImage(this.CHICKEN_WALKING[0]);
        this.loadImages(this.CHICKEN_WALKING);
        this.loadImages(this.CHICKEN_DEAD);
        this.x = 350 + Math.random() * 1600;
        this.speed = 0.45 + Math.random() * 1.5;
        this.animateChicken();
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
        }, 1000 / 60);
        
        this.animationInterval = setInterval(() => {
            this.playAnimation(this.CHICKEN_WALKING);
        }, 150);
    }

    /**
     * Spielt das Chicken-Sound ab.
     */
    playChickenSound() {
        this.chickenSound.volume = 0.2;
        this.chickenSound.loop = true;
        this.chickenSound.play();
        this.chickenSoundPlaying = true;
        console.log('Chicken sound playing');
    }

    /**
     * Stoppt das Chicken-Sound.
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
        this.stopChickenSound();
        clearInterval(this.walkingInterval);
        clearInterval(this.animationInterval);
        this.loadImage(this.CHICKEN_DEAD[0]);
    }
}
