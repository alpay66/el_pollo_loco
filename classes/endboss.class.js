/**
 * Repräsentiert den Endboss im Spiel, der verschiedene Animationen, Bewegungen und Angriffe hat.
 */
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
    speed = 10.5;
    lastAttackTime = 0;
    lastDamageTime = 0; 
    damageAmount = 20;
    isAlerted = false;
    isAttacking = false;
    isHurt = false;
    isDead = false;
    endbossHurt = new Audio('audio/Endboss_hurt.mp3');
    endbossDead = new Audio('audio/endboss_defeat.mp3');

    /**
     * Erstellt einen neuen Endboss mit vordefinierten Animationen und setzt ihn in die Welt.
     */
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

    /**
     * Startet die Animation und überprüft den Abstand zum Spieler.
     */
    animateEndboss() {
        setInterval(() => {
            this.checkPlayerDistance();
            this.updateAnimationState();
        }, 150);
    }

    /**
     * Aktualisiert den aktuellen Zustand des Endbosses und setzt die richtige Animation.
     */
    updateAnimationState() {
        if (this.isDead) this.playAnimation(this.ENDBOSS_DEAD);
        else if (this.isHurt) this.playAnimation(this.ENDBOSS_HURT);
        else if (this.isAttacking) this.playAnimation(this.ENDBOSS_ATTACK);
        else if (this.isAlerted) {
            this.playAnimation(this.ENDBOSS_WALKING);
            this.moveToPlayer();
        } else this.playAnimation(this.ENDBOSS_ALERT);
    }

    /**
     * Bewegt den Endboss auf den Spieler zu, falls er nah genug ist.
     */
    moveToPlayer() {
        if (!this.world || !this.world.character) return;

        let playerX = this.world.character.x;
        let distance = Math.abs(playerX - this.x);

        if (distance > 50) {
            this.x += playerX < this.x ? -this.speed : this.speed;
            this.otherDirection = playerX > this.x;
        } else {
            this.attack();
        }
    }

    /**
     * Fügt dem Spieler Schaden zu.
     * @param {Character} character - Das Charakterobjekt, das getroffen wird.
     */
    dealDamage(character) {
        character.hit(this.damageAmount);
    }

    /**
     * Überprüft die Entfernung zum Spieler und löst eine Alarmanimation aus.
     */
    checkPlayerDistance() {
        if (!this.world || !this.world.character) return;

        let distance = Math.abs(this.world.character.x - this.x);
        if (distance < 300 && !this.isAlerted) this.alert();
    }

    /**
     * Setzt den Endboss in den Alarmzustand.
     */
    alert() {
        this.isAlerted = true;
        this.playAnimation(this.ENDBOSS_ALERT);
        this.lastAttackTime = new Date().getTime();
    }

    /**
     * Führt einen Angriff aus, wenn der Endboss sich im Angriffsbereich befindet.
     */
    attack() {
        if (!this.isDead && !this.isAttacking) {
            this.isAttacking = true;
            this.isAlerted = false;
            this.isHurt = false;
            this.playAnimation(this.ENDBOSS_ATTACK);
            this.endAttackAfterDelay();
        }
    }

    /**
     * Beendet den Angriff nach einer bestimmten Zeit.
     */
    endAttackAfterDelay() {
        setTimeout(() => this.isAttacking = false, 700);
    }

    /**
     * Der Endboss nimmt Schaden und spielt die entsprechende Animation ab.
     */
    takeDamage() {
        if (!this.isDead) {
            this.energie -= 20;
            this.isHurt = true;
            this.endbossBar.setPercentage(this.energie);
        }
        this.playHurtSound();
        this.setHurtState();
        this.checkDeath();
    }

    /**
     * Setzt den Endboss in den Verletzungszustand für eine kurze Zeit.
     */
    setHurtState() {
        this.isHurt = true;
        setTimeout(() => this.isHurt = false, 500);
    }

    /**
     * Überprüft, ob der Endboss besiegt wurde.
     */
    checkDeath() {
        if (this.energie <= 0) this.die();
    }

    /**
     * Spielt den Verletzungssound des Endbosses ab.
     */
    playHurtSound() {
        if (this.endbossHurt.paused || this.endbossHurt.ended) {
            this.endbossHurt.currentTime = 0;
            this.endbossHurt.play().catch(error => console.log("Sound-Fehler:", error));
        }
    }

    /**
     * Markiert den Endboss als besiegt und entfernt ihn nach einer Verzögerung.
     */
    die() {
        if (this.isDead) return;

        this.markAsDead();
        this.playDeathAnimation();
        this.playDeathSound();
        this.removeeEndboss();
    }

    /**
     * Markiert den Endboss als tot und stoppt seine Bewegung.
     */
    markAsDead() {
        this.isDead = true;
        this.speed = 0;
    }

    /**
     * Spielt die Todesanimation des Endbosses.
     */
    playDeathAnimation() {
        this.playAnimation(this.ENDBOSS_DEAD);
    }

    /**
     * Spielt den Sound ab, wenn der Endboss besiegt wird.
     */
    playDeathSound() {
        this.endbossDead.currentTime = 0;
        this.endbossDead.play().catch(error => console.log("Sound-Fehler:", error));
    }

    /**
     * Entfernt den Endboss nach einer Verzögerung.
     */
    removeeEndboss() {
        setTimeout(() => this.removeEndboss(), 1500);
    }

    /**
     * Löscht den Endboss aus der Welt.
     */
    removeEndboss() {
        if (this.world && this.world.level) {
            let index = this.world.level.enemies.indexOf(this);
            if (index !== -1) {
                this.world.level.enemies.splice(index, 1);
            }
        }
    }
}