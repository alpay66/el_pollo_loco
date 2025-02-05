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
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png',);
        this.loadImages(this.SMALL_CHICKEN_WALKING);
        this.loadImages(this.SMALL_CHICKEN_DEAD);
        this.x = 190 + Math.random() * 400;
        this.speed = 0.15 + Math.random() * 1;
        
        this.animateSmallChicken();
    }
    
    animateSmallChicken () {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
        
        setInterval(() => {
            this.playAnimation(this.SMALL_CHICKEN_WALKING);
        }, 150);
    }
}