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

    constructor() {
        super().loadImage(this.CHICKEN_WALKING[0]);
        this.loadImages(this.CHICKEN_WALKING);
        this.loadImages(this.CHICKEN_DEAD);
        this.x = 350 + Math.random() * 1600;
        this.speed = 0.15 + Math.random() * 0.5;
        this.animateChicken();
    }
    
    animateChicken() {
        this.walkingInterval = setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
        
        this.animationInterval = setInterval(() => {
            this.playAnimation(this.CHICKEN_WALKING);
        }, 150);
        
    }

    die() {
        clearInterval(this.walkingInterval);
        clearInterval(this.animationInterval);
        this.loadImage(this.CHICKEN_DEAD[0]);
    }
}
