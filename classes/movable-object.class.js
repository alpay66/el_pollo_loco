/**
 * Repräsentiert ein bewegliches Objekt im Spiel mit Eigenschaften wie Geschwindigkeit, Gravitation und Kollisionserkennung.
 * Erbt von DrawableObject.
 */
class MovableObject extends DrawableObject {
    /** @type {number} Bewegungsgeschwindigkeit des Objekts. */
    speed = 0.15;

    /** @type {boolean} Gibt an, ob das Objekt in die entgegengesetzte Richtung schaut. */
    otherDirection = false;

    /** @type {number} Vertikale Geschwindigkeit für Sprünge und Gravitation. */
    speedY = 0;

    /** @type {number} Beschleunigung für die Gravitation. */
    acceleration = 2;

    /** @type {number} Vertikaler Versatz für die Kollisionsberechnung. */
    offsetY = 0;

    /** @type {number} Lebenspunkte des Objekts. */
    energie = 100;

    /** @type {number} Zeitpunkt des letzten Treffers. */
    lastHit = 0;

    /**
     * Überprüft, ob dieses Objekt mit einem anderen kollidiert.
     * @param {MovableObject} mo - Das zu überprüfende Objekt.
     * @returns {boolean} `true`, wenn eine Kollision vorliegt, sonst `false`.
     */
    isColliding(mo) {
        return (this.x + this.width) >= mo.x &&
            this.x <= (mo.x + mo.width) &&
            (this.y + this.offsetY + this.height) >= mo.y &&
            (this.y + this.offsetY) <= (mo.y + mo.height);
    }

    /**
     * Verursacht Schaden am Objekt, falls die Mindestzeit zwischen Treffern eingehalten wurde.
     * @param {number} [damage=5] - Der Schaden, der zugefügt wird.
     */
    hit(damage = 5) { 
        let now = new Date().getTime();

        if (now - this.lastDamageTime < 500) return;
    
        this.lastDamageTime = now;
        this.energie -= damage;
    
        this.hurtSound.currentTime = 0;
        this.hurtSound.play();
    
        if (this.energie < 0) {
            this.energie = 0;
        } else {
            this.lastHit = now;
        }
    }

    /**
     * Überprüft, ob das Objekt keine Lebenspunkte mehr hat.
     * @returns {boolean} `true`, wenn das Objekt tot ist, sonst `false`.
     */
    isDead() {
        return this.energie == 0;
    }

    /**
     * Überprüft, ob das Objekt kürzlich Schaden erlitten hat.
     * @returns {boolean} `true`, wenn das Objekt verletzt ist, sonst `false`.
     */
    isHurt() {
        let timePassed = (new Date().getTime() - this.lastHit) / 1000;
        return timePassed < 1;
    }

    /**
     * Wendet die Schwerkraft auf das Objekt an und aktualisiert die vertikale Position.
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    /**
     * Überprüft, ob das Objekt sich über dem Boden befindet.
     * @returns {boolean} `true`, wenn das Objekt nicht auf dem Boden ist, sonst `false`.
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 180;
        }
    }

    /**
     * Spielt eine Animation ab, indem die nächste Bildquelle aus der Liste gesetzt wird.
     * @param {string[]} images - Liste der Bildpfade für die Animation.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imgCache[path];
        this.currentImage++;
    }

    /**
     * Bewegt das Objekt nach rechts.
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * Bewegt das Objekt nach links.
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * Lässt das Objekt springen, indem die vertikale Geschwindigkeit gesetzt wird.
     */
    jump() {
        this.speedY = 30;
    }
}
