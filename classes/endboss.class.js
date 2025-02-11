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
    speed = 2.5;

    isAlerted = false;
    isAttacking = false;
    isHurt = false;
    isDead = false;

    constructor() {
        super().loadImage('img/4_enemie_boss_chicken/2_alert/G5.png');
        this.loadImages(this.ENDBOSS_WALKING);
        this.loadImages(this.ENDBOSS_ALERT);
        this.loadImages(this.ENDBOSS_ATTACK);
        this.loadImages(this.ENDBOSS_HURT);
        this.loadImages(this.ENDBOSS_DEAD);
        this.x = 1200;
        this.world = null;
        this.endbossBar = new EndbossBar();
        this.animateEndboss(); 
    }

    animateEndboss() {
        setInterval(() => {
            this.checkPlayerDistance(); // Prüft, ob der Spieler in Reichweite ist
    
            if (this.isDead) {
                this.playAnimation(this.ENDBOSS_DEAD);
            } else if (this.isHurt) {
                this.playAnimation(this.ENDBOSS_HURT);
            } else if (this.isAttacking) {
                this.playAnimation(this.ENDBOSS_ATTACK);
            } else if (this.isAlerted) {
                this.playAnimation(this.ENDBOSS_WALKING);
                this.moveToPlayer();
            } else {
                this.playAnimation(this.ENDBOSS_ALERT);
                
            }
        }, 150);
    }
    
    moveToPlayer() {
        if (!this.world || !this.world.character) return;

        let playerX = this.world.character.x;
        let distance = Math.abs(playerX - this.x);

        if (distance > 50) { // Nur bewegen, wenn der Charakter nicht zu nah ist
            if (playerX < this.x) {
                this.x -= this.speed;
                this.otherDirection = false;
            } else {
                this.x += this.speed;
                this.otherDirection = true;
            }
        } else {
            this.attack(); // Wenn nah genug → Angriff starten
        }
    }
    

    checkPlayerDistance() {
        if (!this.world || !this.world.character) return;

        let distance = Math.abs(this.world.character.x - this.x);
        if (distance < 300 && !this.isAlerted) {
            this.alert();
        }
    }
    

    alert() {
        this.isAlerted = true;
        this.playAnimation(this.ENDBOSS_ALERT);
    
        setTimeout(() => {
            if (this.isAlerted && !this.isDead) {
                this.moveToPlayer(); 
            }
        }, 1000); // 1 Sekunde warten, dann beginnt er zu laufen
    }
    

    attack() {
        if (!this.isDead && !this.isAttacking) {
            this.isAttacking = true;
            this.isAlerted = false;
            this.isHurt = false;

            this.playAnimation(this.ENDBOSS_ATTACK);

            setTimeout(() => {
                if (this.isAttacking) {
                    this.isAttacking = false; // Nach der Attacke zurücksetzen
                }
            }, 700);
        }
    }

    takeDamage() {
        if (!this.isDead) {
            this.energie -= 20;
            this.isHurt = true;
            this.endbossBar.setPercentage(this.energie);
            console.log("⚔️ Endboss getroffen! Energie:", this.energie);

            setTimeout(() => {
                this.isHurt = false;
            }, 500);

            if (this.energie <= 0) {
                this.die();
            }
        }
    }

    die() {
        if (!this.isDead) { // Stelle sicher, dass die Methode nur einmal ausgeführt wird
            this.isDead = true;
            this.speed = 0;
            console.log("💀 Endboss besiegt!");
    
            this.playAnimation(this.ENDBOSS_DEAD); // Nur einmal abspielen
    
            setTimeout(() => {
                this.removeEndboss();
            }, 1000); // Warte 1 Sekunde, dann entfernen
        }
    }
    

    removeEndboss() {
        if (this.world && this.world.level) { // Überprüfe, ob world noch existiert
            let index = this.world.level.enemies.indexOf(this);
            if (index !== -1) {
                this.world.level.enemies.splice(index, 1);
            }
        }
    }
    
}