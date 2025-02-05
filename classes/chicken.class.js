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

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.CHICKEN_WALKING);
        this.loadImages(this.CHICKEN_DEAD);
        this.animateChicken();

        this.x = 190 + Math.random() * 400;
        this.speed = 0.15 + Math.random() * 0.5;
    }
    
    animateChicken () {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        
        setInterval(() => {
            this.playAnimation(this.CHICKEN_WALKING);
        }, 150);
    }
}