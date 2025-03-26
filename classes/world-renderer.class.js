/**
 * Handelt das Rendering der Spielwelt auf dem Canvas.
 * @class
 */
class WorldRenderer {
    /**
     * Erstellt einen neuen WorldRenderer.
     * @param {World} world - Die zu rendernde Spielwelt.
     * @param {CanvasRenderingContext2D} ctx - Der Canvas-Kontext.
     * @param {HTMLCanvasElement} canvas - Das Canvas-Element.
     */
    constructor(world, ctx, canvas) {
        this.world = world;
        this.ctx = ctx;
        this.canvas = canvas;
        this.animationFrame = null;
    }

    /**
     * Haupt-Rendering-Methode.
     */
    drawInWorld() {
        this.clearCanvas();
        this.ctx.translate(this.world.camera_x, 0);
        this.drawBackground();
        this.drawGameObjects();
        this.drawCharacter();
        this.ctx.translate(-this.world.camera_x, 0);
        this.drawUI();
        this.scheduleNextFrame();
    }

    /**
     * Leert den gesamten Canvas-Bereich.
     */
    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    /**
     * Zeichnet alle Hintergrundobjekte des aktuellen Levels.
     */
    drawBackground() {
        this.addObjectsToMap(this.world.level.backgroundObjects);
    }

    /**
     * Zeichnet alle UI-Elemente:
     * - Gesundheitsleiste
     * - Münzen-Anzeige
     * - Flaschen-Anzeige
     * - Endboss-Gesundheitsleiste
     */
    drawUI() {
        this.addToMap(this.world.healthBar);
        this.addToMap(this.world.coinBar);
        this.addToMap(this.world.bottleBar);
        this.drawEndbossHealthbar();
    }

    /**
     * Zeichnet die Gesundheitsleiste des Endbosses, falls dieser im Level existiert.
     */
    drawEndbossHealthbar() {
        let endboss = this.world.level.enemies.find(e => e instanceof Endboss);
        if (endboss) {
            this.addToMap(endboss.endbossBar);
        }
    }

    /**
     * Zeichnet alle beweglichen Spielobjekte:
     * - Wolken
     * - Gegner
     * - Münzen
     * - Flaschen
     * - Geworfene Objekte
     */
    drawGameObjects() {
        this.addObjectsToMap(this.world.level.clouds);
        this.addObjectsToMap(this.world.level.enemies);
        this.addObjectsToMap(this.world.level.coins);
        this.addObjectsToMap(this.world.level.bottles);
        this.addObjectsToMap(this.world.throwableObjects);
    }

    /**
     * Zeichnet den Spielfigur-Charakter.
     */
    drawCharacter() {
        this.addToMap(this.world.character);
    }

    /**
     * Fügt mehrere Objekte zur Karte hinzu.
     * @param {Array<Object>} objects - Die Objekte, die zur Karte hinzugefügt werden sollen.
     */
    addObjectsToMap(objects) {
        objects.forEach(obj => {
            this.addToMap(obj);
        });
    }

    /**
     * Fügt ein einzelnes Objekt zur Karte hinzu.
     * @param {Object} mo - Das Objekt, das zur Karte hinzugefügt werden soll.
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
    
        // 🔴 Roter Rahmen: Bildrahmen
        this.ctx.beginPath();
        this.ctx.lineWidth = "1";
        this.ctx.strokeStyle = "red";
        this.ctx.rect(mo.x, mo.y, mo.width, mo.height);
        this.ctx.stroke();
    
        // 🟢 Grüner Rahmen: tatsächliche Kollisionsfläche
        if (mo.offset) {
            this.ctx.beginPath();
            this.ctx.lineWidth = "1";
            this.ctx.strokeStyle = "green";
            this.ctx.rect(
                mo.x + mo.offset.left,
                mo.y + mo.offset.top,
                mo.width - mo.offset.left - mo.offset.right,
                mo.height - mo.offset.top - mo.offset.bottom
            );
            this.ctx.stroke();
        }
    
        // Bild zeichnen
        mo.draw(this.ctx);
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
    
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }
    

    /**
     * Spiegelt das Bild horizontal.
     * @param {Object} mo - Das Objekt, dessen Bild gespiegelt werden soll.
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * Stellt das Bild nach dem Spiegeln wieder in seine ursprüngliche Ausrichtung zurück.
     * @param {Object} mo - Das Objekt, dessen Bild wiederhergestellt werden soll.
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    /**
     * Intern verwendete Funktion zur Planung des nächsten Animationsframes.
     * @private
     */
    scheduleNextFrame() {
        let self = this;
        requestAnimationFrame(function () {
            self.drawInWorld();
        });
    }
}
