class Endboss extends MovableObject {
    ENDBOSS_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];
    ENDBOSS_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];
    ENDBOSS_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'
    ];
    ENDBOSS_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];
    ENDBOSS_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png',
    ];
    height = 350;
    width = 250;
    y = 120;
    energie = 100;
    isAlerted = false;
    isAttacking = false;
    isHurt = false;
    isDead = false;

    constructor() {
        super().loadImage(this.ENDBOSS_WALKING[0]);
        this.loadImages(this.ENDBOSS_WALKING);
        this.loadImages(this.ENDBOSS_ALERT);
        this.loadImages(this.ENDBOSS_ATTACK);
        this.loadImages(this.ENDBOSS_HURT);
        this.loadImages(this.ENDBOSS_DEAD);
        this.x = 500;
        this.speed = 1;
        this.animateEndboss(); 
    }

    animateEndboss() {
        setInterval(() => {
            if (this.isDead) {
                this.playAnimation(this.ENDBOSS_DEAD);
            } else if (this.isHurt) {
                this.playAnimation(this.ENDBOSS_HURT);
            } else if (this.isAttacking) {
                this.playAnimation(this.ENDBOSS_ATTACK);
            } else if (this.isAlerted) {
                this.playAnimation(this.ENDBOSS_ALERT);
                this.moveLeft();
            } else {
                this.playAnimation(this.ENDBOSS_WALKING);
            }
        }, 150);
    }

    alert() {
        this.isAlerted = true;
        this.isAttacking = false;
        this.isHurt = false;
        this.isDead = false;
    }

    attack() {
        this.isAttacking = true;
        this.isAlerted = false;
        this.isHurt = false;
        this.isDead = false;
    }

    takeDamage() {
        if (!this.isDead) {
            this.isHurt = true;
            this.energie -= 20;
            setTimeout(() => {
                this.isHurt = false;
            }, 500);
            if (this.energie <= 0) {
                this.die();
            }
        }
    }

    die() {
        this.isDead = true;
        this.isAlerted = false;
        this.isAttacking = false;
        this.isHurt = false;
        setTimeout(() => {
            this.removeEndboss();
        }, 1000); // Endboss verschwindet nach 1 Sekunde
    }

    removeEndboss() {
        // Entfernt den Endboss aus dem Spiel
        let index = this.world.level.enemies.indexOf(this);
        if (index !== -1) {
            this.world.level.enemies.splice(index, 1);
        }
    }
    
}