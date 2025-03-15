/**
 * Repräsentiert die Spielwelt, verwaltet alle Spielobjekte, Kollisionen und das Rendering.
 * @class
 */
class World {
    /** @type {Character} Der Hauptcharakter des Spiels. */
    character = new Character();

    /** @type {Healthbar} Die Gesundheitsleiste, die die Gesundheit des Charakters anzeigt. */
    healthBar = new Healthbar();

    /** @type {Coinbar} Die Münzenleiste, die die gesammelten Münzen anzeigt. */
    coinBar = new Coinbar();

    /** @type {Bottlebar} Die Flaschenleiste, die die gesammelten Flaschen anzeigt. */
    bottleBar = new Bottlebar();

    /** @type {Level} Das aktuelle Level des Spiels. */
    level = level_1;

    /** @type {HTMLCanvasElement} Das Canvas-Element für das Rendering des Spiels. */
    canvas;

    /** @type {CanvasRenderingContext2D} Der 2D-Rendering-Kontext des Canvas. */
    ctx;

    /** @type {Object} Der Tastatur-Eingabehandler. */
    keyboard;

    /** @type {number} Die x-Koordinate der Kamera für das Scrollen der Ansicht. */
    camera_x = 0;

    /** @type {Array<ThrowableObject>} Die Liste der werfbaren Objekte (z.B. Flaschen). */
    throwableObjects = [];

    /** @type {HTMLAudioElement} Der Sound, der abgespielt wird, wenn ein Gegner zerstampft wird. */
    stompSound = new Audio('audio/enemie_dead.mp3');

    /** @type {HTMLAudioElement} Der Sound, der abgespielt wird, wenn eine Flaschen gesammelt wird. */
    collectBottleSound = new Audio('audio/collect_bottle.mp3');

    /** @type {HTMLAudioElement} Der Sound, der abgespielt wird, wenn eine Münze gesammelt wird. */
    collectCoinSound = new Audio('audio/collect_coin.mp3');

    /**
     * Erstellt eine neue World-Instanz.
     * @constructor
     * @param {HTMLCanvasElement} canvas - Das Canvas-Element für das Rendering.
     * @param {Object} keyboard - Der Tastatur-Eingabehandler.
     */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.drawInWorld();
        this.setWorld();
        this.runCollisionCheck();
        this.runEndbossCollisionCheck();
        this.runChickenCollisionCheck();
    }

    /**
     * Stoppt alle Bewegungen in der Spielwelt.
     * @param {World} world - Die Spielwelt, die gestoppt werden soll.
     */
    stopAllMovement(world) {
        world.character.speed = 0;
        world.character.world.keyboard = {};
        world.level.enemies.forEach(enemy => enemy.speed = 0); 
        world.throwableObjects = [];
    }

    /**
     * Setzt die Weltreferenz für den Charakter und die Gegner.
     */
    setWorld() {
        this.character.world = this;
        this.level.enemies.forEach(enemy => {
            if (enemy instanceof Endboss) {
                enemy.world = this; 
            }
        });
    }

    /**
     * Führt die Kollisionsprüfung für Münzen, Flaschen und werfbare Objekte durch.
     */
    runCollisionCheck() {
        setInterval(() => {
            this.checkCoinCollisions();
            this.checkBottleCollisions();
            this.checkThrowableObjectCollisions();
        }, 50);
    }

    /**
     * Führt die Kollisionsprüfung für den Endboss und werfbare Objekte durch.
     */
    runEndbossCollisionCheck() {
        setInterval(() => {
            this.checkEndbossThrowableCollisions();
        }, 500);
    }

    /**
     * Führt die Kollisionsprüfung für Hühner und den Charakter durch.
     */
    runChickenCollisionCheck() {
        setInterval(() => {
            this.checkEnemyCollisions();
        }, 50);
    }

    /**
     * Überprüft Kollisionen zwischen dem Charakter und Münzen.
     */
    checkCoinCollisions() {
        this.level.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                this.level.coins.splice(index, 1);
                this.coinBar.setCoins(this.coinBar.collectedCoins + 1);
                this.playCollectCoinSound();
            }
        });
    }

    /**
     * Überprüft Kollisionen zwischen dem Charakter und Flaschen.
     */
    checkBottleCollisions() {
        this.level.bottles.forEach((bottle, index) => {
            if (this.character.isColliding(bottle)) {
                this.level.bottles.splice(index, 1);
                this.bottleBar.setBottles(this.bottleBar.collectedBottles + 1);
                this.playCollectBottleSound();
            }
        });
    }

    /**
     * Überprüft Kollisionen zwischen dem Charakter und Gegnern.
     */
    checkEnemyCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                if (this.character.isAboveEnemy(enemy) && (enemy instanceof Chicken || enemy instanceof SmallChicken)) {
                    this.killEnemy(enemy);
                    this.character.bounceOff();
                } 
                else if (enemy instanceof Endboss) {
                    enemy.dealDamage(this.character);
                } 
                else {
                    this.character.hit();
                }
    
                this.healthBar.setPercentage(this.character.energie);
    
                if (this.character.energie <= 0) {
                    this.endGame(this);
                    showEndscreen(false);
                }
            }
        });
    }
    
    /**
     * Tötet einen Gegner und spielt den Stomp-Sound ab.
     * @param {Enemy} enemy - Der Gegner, der getötet werden soll.
     */
    killEnemy(enemy) {
        if (enemy instanceof Chicken || enemy instanceof SmallChicken) {
            this.stompSound.currentTime = 0;
            this.stompSound.play();

            enemy.die();
            setTimeout(() => {
                this.removeEnemy(enemy);
            }, 500);
        }
    }
    
    /**
     * Überprüft Kollisionen zwischen werfbaren Objekten und Gegnern.
     */
    checkThrowableObjectCollisions() {
        this.throwableObjects.forEach((bottle) => {
            let hitEnemyIndex = this.level.enemies.findIndex(enemy =>
                bottle.isColliding(enemy) && !(enemy instanceof Endboss)
            );
            if (hitEnemyIndex !== -1) {
                let hitEnemy = this.level.enemies[hitEnemyIndex];
                if (hitEnemy instanceof Chicken || hitEnemy instanceof SmallChicken) {
                    this.handleChickenHit(bottle, hitEnemy);
                }
            }
        });
    }

    /**
     * Überprüft Kollisionen zwischen werfbaren Objekten und dem Endboss.
     */
    checkEndbossThrowableCollisions() {
        let endboss = this.level.enemies.find(enemy => enemy instanceof Endboss);
        if (endboss) {
            this.throwableObjects.forEach((bottle) => {
                if (bottle.isColliding(endboss)) {
                    this.handleEndbossHit(bottle, endboss);
                    
                    if (endboss.energie <= 0) {
                        setTimeout(() => {
                            this.endGame(this);
                            showEndscreen(true);
                        }, 2000);
                    }
                }
            });
        }
    }

    /**
     * Spielt den Sound ab, wenn eine Flasche gesammelt wird.
     */
    playCollectBottleSound() {
        this.collectBottleSound.currentTime = 0; // Setzt den Sound zurück
        this.collectBottleSound.play().catch(error => console.log("Sound-Fehler:", error));
    }

    /**
     * Spielt den Sound ab, wenn eine Münze gesammelt wird.
     */
    playCollectCoinSound() {
        this.collectCoinSound.currentTime = 0; // Setzt den Sound zurück
        this.collectCoinSound.play().catch(error => console.log("Sound-Fehler:", error));
    }
    
    /**
     * Beendet das Spiel und stoppt alle Bewegungen und Animationen.
     * @param {World} world - Die Spielwelt, die beendet werden soll.
     */
    endGame(world) {
        this.stopAllMovement(world);
        cancelAnimationFrame(world.animationFrame);
        clearInterval(world.gameLoop);
        stopAllChickenSounds();
        world.level.enemies = [];
    }

    /**
     * Verarbeitet die Kollision zwischen einem werfbaren Objekt und einem Huhn.
     * @param {ThrowableObject} bottle - Das werfbare Objekt.
     * @param {Chicken} chicken - Das Huhn, das vom werfbaren Objekt getroffen wurde.
     */
    handleChickenHit(bottle, chicken) {
        bottle.splash();
        chicken.die();
        setTimeout(() => {
            this.removeEnemy(chicken);
        }, 500);
    }

    /**
     * Verarbeitet die Kollision zwischen einem werfbaren Objekt und dem Endboss.
     * @param {ThrowableObject} bottle - Das werfbare Objekt.
     * @param {Endboss} endboss - Der Endboss, der vom werfbaren Objekt getroffen wurde.
     */
    handleEndbossHit(bottle, endboss) {
        bottle.splash();
        endboss.takeDamage();
    
        if (endboss.energie <= 0 && !endboss.isDead) {
            endboss.die(); 
        }
    }
    
    /**
     * Entfernt einen Gegner aus dem Level.
     * @param {Enemy} enemy - Der Gegner, der entfernt werden soll.
     */
    removeEnemy(enemy) {
        let indexToRemove = this.level.enemies.indexOf(enemy);
        if (indexToRemove !== -1) {
            this.level.enemies.splice(indexToRemove, 1);
        }
    }

    /**
     * Zeichnet alle Spielobjekte auf das Canvas.
     */
    drawInWorld() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.healthBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.bottleBar);
        let endboss = this.level.enemies.find(e => e instanceof Endboss);
        if (endboss) {
            this.addToMap(endboss.endbossBar);
        }
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.throwableObjects);
        this.addToMap(this.character);
        this.ctx.translate(-this.camera_x, 0);
        let self = this;
        requestAnimationFrame(function () {
            self.drawInWorld();
        });
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
}