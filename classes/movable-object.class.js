/**
 * Repräsentiert ein bewegliches Objekt im Spiel mit Eigenschaften wie Geschwindigkeit, Gravitation und Kollisionserkennung.
 * Erbt von DrawableObject.
 */
class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2;
    offsetX = 0; 
    offsetY = 0;
    energie = 100;
    lastHit = 0;

    /**
     * Überprüft, ob dieses Objekt mit einem anderen kollidiert.
     * @param {MovableObject} mo - Das zu überprüfende Objekt.
     * @returns {boolean} `true`, wenn eine Kollision vorliegt, sonst `false`.
     */
    isColliding(mo) {
        let a = this.offset || { top: 0, bottom: 0, left: 0, right: 0 };
        let b = mo.offset || { top: 0, bottom: 0, left: 0, right: 0 };
    
        return (
            this.x + a.left < mo.x + mo.width - b.right &&
            this.x + this.width - a.right > mo.x + b.left &&
            this.y + a.top < mo.y + mo.height - b.bottom &&
            this.y + this.height - a.bottom > mo.y + b.top
        );
    }
    
    

    drawCollisionBox(ctx) {
        ctx.strokeStyle = 'red';
        ctx.strokeRect(this.x + this.offsetX, this.y + this.offsetY, this.width, this.height);
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
