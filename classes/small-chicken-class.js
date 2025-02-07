class SmallChicken extends MovableObject {
    y = 343;
    height = 100;
    width = 70;
    SMALL_CHICKEN_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];
    SMALL_CHICKEN_DEAD = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];

    constructor() {
        super().loadImage(this.SMALL_CHICKEN_WALKING[0]);
        this.loadImages(this.SMALL_CHICKEN_WALKING);
        this.loadImages(this.SMALL_CHICKEN_DEAD);
        this.x = 1900 + Math.random() * 400;
        this.speed = 0.15 + Math.random() * 1;
        this.animateSmallChicken();
    }
    
    animateSmallChicken() {
        this.walkingInterval = setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
        
        this.animationInterval = setInterval(() => {
            this.playAnimation(this.SMALL_CHICKEN_WALKING);
        }, 150);
    }

    die() {
        clearInterval(this.walkingInterval);
        clearInterval(this.animationInterval);
        this.loadImage(this.SMALL_CHICKEN_DEAD[0]); // Todesbild setzen
    }
}
