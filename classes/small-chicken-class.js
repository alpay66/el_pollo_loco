/**
 * Repräsentiert eine kleine, bewegliche Huhn-Einheit im Spiel.
 * Erbt von MovableObject.
 */
class SmallChicken extends MovableObject {
    y = 343;
    height = 100;
    width = 70;
    isDead = false;

    /** @type {string[]} Bilder für die Geh-Animation. */
    SMALL_CHICKEN_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    /** @type {string[]} Bild für das tote SmallChicken. */
    SMALL_CHICKEN_DEAD = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];

    /**
     * Erstellt ein neues SmallChicken mit zufälliger Position und Geschwindigkeit.
     */
    constructor() {
        super().loadImage(this.SMALL_CHICKEN_WALKING[0]);
        this.loadImages(this.SMALL_CHICKEN_WALKING);
        this.loadImages(this.SMALL_CHICKEN_DEAD);
        this.x = 550 + Math.random() * 4800;
        this.speed = 1.35 + Math.random() * 3.8;
        this.animateSmallChicken();
        this.offsetX = 10; // Beispielwert, anpassen nach Bedarf
        this.offsetY = 10; 
    }
    
    /**
     * Startet die Animation für die Bewegung und das Laufen des SmallChickens.
     */
    animateSmallChicken() {
        this.walkingInterval = setInterval(() => {
            this.moveLeft();
        }, 1000 / 30);
        
        this.animationInterval = setInterval(() => {
            this.playAnimation(this.SMALL_CHICKEN_WALKING);
        }, 150);
    }

    /**
     * Setzt das SmallChicken in den toten Zustand und stoppt alle Animationen.
     */
    die() {
        this.isDead = true;
        clearInterval(this.walkingInterval);
        clearInterval(this.animationInterval);
        this.loadImage(this.SMALL_CHICKEN_DEAD[0]);
    }
}
