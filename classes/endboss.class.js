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
    speed = 15.5;
    lastAttackTime = 0;
    lastDamageTime = 0; 
    damageAmount = 20;
    isAlerted = false;
    isAttacking = false;
    isHurt = false;
    isDead = false;
    endbossHurt = new Audio('audio/Endboss_hurt.mp3');
    endbossDead = new Audio('audio/endboss_defeat.mp3');
    offset = {
        top: 80,
        bottom: 80,
        left: 10,
        right: 10
    };

    /**
     * Erzeugt eine neue Endboss-Instanz.
     * Lädt alle benötigten Bilder und initialisiert die Position.
     */
    constructor() {
        super().loadImage('img/4_enemie_boss_chicken/2_alert/G5.png');
        this.loadImages(this.ENDBOSS_WALKING);
        this.loadImages(this.ENDBOSS_ALERT);
        this.loadImages(this.ENDBOSS_ATTACK);
        this.loadImages(this.ENDBOSS_HURT);
        this.loadImages(this.ENDBOSS_DEAD);
        allSounds.push(this.endbossHurt);
        allSounds.push(this.endbossDead);
        this.x = 2200;
        this.world = null;
        this.endbossBar = new EndbossBar();
        this.animateEndboss();
    }

    /**
     * Startet die Hauptanimation des Endbosses.
     * Überprüft regelmäßig die Distanz zum Spieler und aktualisiert den Zustand.
     */
    animateEndboss() {
        setInterval(() => {
            this.checkPlayerDistance();
            this.updateAnimationState();
        }, 150);
    }

    /**
     * Aktualisiert den Animationszustand basierend auf dem aktuellen Status.
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
     * Bewegt den Endboss in Richtung des Spielers, wenn dieser in Reichweite ist.
     * Führt einen Angriff aus, wenn der Spieler in Angriffsreichweite ist.
     */
    moveToPlayer() {
        if (!this.isWorldOrCharacterMissing()) return;
        
        const playerX = this.world.character.x;
        const distanceToPlayer = this.calculateDistanceTo(playerX);
        
        if (this.isPlayerInAttackRange(distanceToPlayer)) {
            this.attack();
        } else {
            this.moveTowards(playerX);
        }
    }

    /**
     * Überprüft, ob die Welt oder der Spieler fehlen.
     * @returns {boolean} True wenn Welt und Spieler existieren, sonst false
     */
    isWorldOrCharacterMissing() {
        return this.world && this.world.character;
    }

    /**
     * Berechnet die Distanz zum Spieler.
     * @param {number} playerX - X-Position des Spielers
     * @returns {number} Absolute Distanz zum Spieler
     */
    calculateDistanceTo(playerX) {
        return Math.abs(playerX - this.x);
    }

    /**
     * Überprüft ob der Spieler in Angriffsreichweite ist.
     * @param {number} distance - Distanz zum Spieler
     * @returns {boolean} True wenn in Reichweite, sonst false
     */
    isPlayerInAttackRange(distance) {
        return distance <= 50;
    }

    /**
     * Bewegt den Endboss in Richtung der gegebenen X-Position.
     * @param {number} playerX - Ziel-X-Position
     */
    moveTowards(playerX) {
        this.x += this.getMovementDirection(playerX);
        this.otherDirection = playerX > this.x;
    }

    /**
     * Bestimmt die Bewegungsrichtung basierend auf der Spielerposition.
     * @param {number} playerX - X-Position des Spielers
     * @returns {number} Bewegungsrichtung (-speed oder +speed)
     */
    getMovementDirection(playerX) {
        return playerX < this.x ? -this.speed : this.speed;
    }

    /**
     * Fügt dem Charakter Schaden zu.
     * @param {Character} character - Der zu schädigende Charakter
     */
    dealDamage(character) {
        character.hit(this.damageAmount);
    }

    /**
     * Überprüft die Distanz zum Spieler und löst Alarm aus wenn nötig.
     */
    checkPlayerDistance() {
        if (!this.world || !this.world.character) return;

        let distance = Math.abs(this.world.character.x - this.x);
        if (distance < 300 && !this.isAlerted) this.alert();
    }

    /**
     * Setzt den Endboss in Alarmbereitschaft.
     */
    alert() {
        this.isAlerted = true;
        this.playAnimation(this.ENDBOSS_ALERT);
        this.lastAttackTime = new Date().getTime();
    }

    /**
     * Führt einen Angriff aus.
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
     * Beendet den Angriff nach einer Verzögerung.
     */
    endAttackAfterDelay() {
        setTimeout(() => this.isAttacking = false, 700);
    }

    /**
     * Verarbeitet Schaden am Endboss.
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
     * Setzt den Verletzungsstatus für eine begrenzte Zeit.
     */
    setHurtState() {
        this.isHurt = true;
        setTimeout(() => this.isHurt = false, 500);
    }

    /**
     * Überprüft ob der Endboss gestorben ist.
     */
    checkDeath() {
        if (this.energie <= 0) this.die();
    }

    /**
     * Spielt den Verletzungssound ab.
     */
    playHurtSound() {
        if (this.endbossHurt.paused || this.endbossHurt.ended) {
            this.endbossHurt.currentTime = 0;
            this.endbossHurt.play().catch(error => console.log("Sound-Fehler:", error));
        }
    }

    /**
     * Verarbeitet den Tod des Endbosses.
     */
    die() {
        if (this.isDead) return;

        this.markAsDead();
        this.playDeathAnimation();
        this.playDeathSound();
        this.removeEndbossAfterDelay();
    }

    /**
     * Markiert den Endboss als tot und stoppt die Bewegung.
     */
    markAsDead() {
        this.isDead = true;
        this.speed = 0;
    }

    /**
     * Spielt die Todesanimation ab.
     */
    playDeathAnimation() {
        this.playAnimation(this.ENDBOSS_DEAD);
    }

    /**
     * Spielt den Todesound ab.
     */
    playDeathSound() {
        this.endbossDead.currentTime = 0;
        this.endbossDead.play().catch(error => console.log("Sound-Fehler:", error));
    }

    /**
     * Entfernt den Endboss nach einer Verzögerung.
     */
    removeEndbossAfterDelay() {
        setTimeout(() => this.removeFromWorld(), 1500);
    }

    /**
     * Entfernt den Endboss aus der Welt.
     */
    removeFromWorld() {
        if (this.world && this.world.level) {
            let index = this.world.level.enemies.indexOf(this);
            if (index !== -1) {
                this.world.level.enemies.splice(index, 1);
            }
        }
    }
}