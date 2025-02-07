class Endboss extends MovableObject {
    height = 350;
    width = 250;
    y = 120;

    ENDBOSS_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    constructor() {
        super().loadImage(this.ENDBOSS_WALKING[0]);
        this.loadImages(this.ENDBOSS_WALKING);
        this.x = 1500;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.ENDBOSS_WALKING);
        }, 150);
    }
}