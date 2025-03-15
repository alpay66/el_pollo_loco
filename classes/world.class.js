/**
 * Represents the game world, managing all game objects, collisions, and rendering.
 * @class
 */
class World {
    /** @type {Character} The main character of the game. */
    character = new Character();

    /** @type {Healthbar} The health bar displaying the character's health. */
    healthBar = new Healthbar();

    /** @type {Coinbar} The coin bar displaying the collected coins. */
    coinBar = new Coinbar();

    /** @type {Bottlebar} The bottle bar displaying the collected bottles. */
    bottleBar = new Bottlebar();

    /** @type {Level} The current level of the game. */
    level = level_1;

    /** @type {HTMLCanvasElement} The canvas element for rendering the game. */
    canvas;

    /** @type {CanvasRenderingContext2D} The 2D rendering context of the canvas. */
    ctx;

    /** @type {Object} The keyboard input handler. */
    keyboard;

    /** @type {number} The camera's x-coordinate for scrolling the view. */
    camera_x = 0;

    /** @type {Array<ThrowableObject>} The list of throwable objects (e.g., bottles). */
    throwableObjects = [];

    /** @type {HTMLAudioElement} The sound played when an enemy is stomped. */
    stompSound = new Audio('audio/enemie_dead.mp3');

    /**
     * Creates a new World instance.
     * @constructor
     * @param {HTMLCanvasElement} canvas - The canvas element for rendering.
     * @param {Object} keyboard - The keyboard input handler.
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
     * Stops all movement in the game world.
     * @param {World} world - The game world to stop.
     */
    stopAllMovement(world) {
        world.character.speed = 0;
        world.character.world.keyboard = {};
        world.level.enemies.forEach(enemy => enemy.speed = 0); 
        world.throwableObjects = [];
    }

    /**
     * Sets the world reference for the character and enemies.
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
     * Runs the collision check for coins, bottles, and throwable objects.
     */
    runCollisionCheck() {
        setInterval(() => {
            this.checkCoinCollisions();
            this.checkBottleCollisions();
            this.checkThrowableObjectCollisions();
        }, 50);
    }

    /**
     * Runs the collision check for the endboss and throwable objects.
     */
    runEndbossCollisionCheck() {
        setInterval(() => {
            this.checkEndbossThrowableCollisions();
        }, 500);
    }

    /**
     * Runs the collision check for chickens and the character.
     */
    runChickenCollisionCheck() {
        setInterval(() => {
            this.checkEnemyCollisions();
        }, 50);
    }

    /**
     * Checks for collisions between the character and coins.
     */
    checkCoinCollisions() {
        this.level.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                this.level.coins.splice(index, 1);
                this.coinBar.setCoins(this.coinBar.collectedCoins + 1);
            }
        });
    }

    /**
     * Checks for collisions between the character and bottles.
     */
    checkBottleCollisions() {
        this.level.bottles.forEach((bottle, index) => {
            if (this.character.isColliding(bottle)) {
                this.level.bottles.splice(index, 1);
                this.bottleBar.setBottles(this.bottleBar.collectedBottles + 1);
            }
        });
    }

    /**
     * Checks for collisions between the character and enemies.
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
     * Kills an enemy and plays the stomp sound.
     * @param {Enemy} enemy - The enemy to kill.
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
     * Checks for collisions between throwable objects and enemies.
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
     * Checks for collisions between throwable objects and the endboss.
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
     * Ends the game and stops all movement and animations.
     * @param {World} world - The game world to end.
     */
    endGame(world) {
        this.stopAllMovement(world);
        cancelAnimationFrame(world.animationFrame);
        clearInterval(world.gameLoop);
        stopAllChickenSounds();
        world.level.enemies = [];
    }

    /**
     * Handles the collision between a throwable object and a chicken.
     * @param {ThrowableObject} bottle - The throwable object.
     * @param {Chicken} chicken - The chicken hit by the throwable object.
     */
    handleChickenHit(bottle, chicken) {
        bottle.splash();
        chicken.die();
        setTimeout(() => {
            this.removeEnemy(chicken);
        }, 500);
    }

    /**
     * Handles the collision between a throwable object and the endboss.
     * @param {ThrowableObject} bottle - The throwable object.
     * @param {Endboss} endboss - The endboss hit by the throwable object.
     */
    handleEndbossHit(bottle, endboss) {
        bottle.splash();
        endboss.takeDamage();
    
        if (endboss.energie <= 0 && !endboss.isDead) {
            endboss.die(); 
        }
    }
    
    /**
     * Removes an enemy from the level.
     * @param {Enemy} enemy - The enemy to remove.
     */
    removeEnemy(enemy) {
        let indexToRemove = this.level.enemies.indexOf(enemy);
        if (indexToRemove !== -1) {
            this.level.enemies.splice(indexToRemove, 1);
        }
    }

    /**
     * Draws all game objects on the canvas.
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
     * Adds multiple objects to the map.
     * @param {Array<Object>} objects - The objects to add to the map.
     */
    addObjectsToMap(objects) {
        objects.forEach(obj => {
            this.addToMap(obj);
        });
    }

    /**
     * Adds a single object to the map.
     * @param {Object} mo - The object to add to the map.
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
     * Flips the image horizontally.
     * @param {Object} mo - The object whose image should be flipped.
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * Restores the image to its original orientation after flipping.
     * @param {Object} mo - The object whose image should be restored.
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}