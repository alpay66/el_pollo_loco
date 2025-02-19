class World {
    character = new Character();
    healthBar = new Healthbar();
    coinBar = new Coinbar();
    bottleBar = new Bottlebar();
    level = level_1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    throwableObjects = [];

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.drawInWorld();
        this.setWorld();
        this.run();
    }

    stopAllMovement(world) {
        world.character.speed = 0;
        world.character.world.keyboard = {}; // Steuerung deaktivieren
        world.level.enemies.forEach(enemy => enemy.speed = 0); // Gegner stoppen
        world.throwableObjects = []; // Flaschen entfernen
    }

    setWorld() {
        this.character.world = this;
        this.level.enemies.forEach(enemy => {
            if (enemy instanceof Endboss) {
                enemy.world = this; 
            }
        });
    }


    run() {
        setInterval(() => {
            this.checkCollisions();
        }, 500);
    }

    checkCollisions() {
        this.checkCoinCollisions();
        this.checkBottleCollisions();
        this.checkEnemyCollisions();
        this.checkThrowableObjectCollisions();
    }

    checkCoinCollisions() {
        this.level.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                this.level.coins.splice(index, 1);
                this.coinBar.setCoins(this.coinBar.collectedCoins + 1);
            }
        });
    }

    checkBottleCollisions() {
        this.level.bottles.forEach((bottle, index) => {
            if (this.character.isColliding(bottle)) {
                this.level.bottles.splice(index, 1);
                this.bottleBar.setBottles(this.bottleBar.collectedBottles + 1);
            }
        });
    }

    checkEnemyCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                if (enemy instanceof Endboss) {
                    enemy.dealDamage(this.character);
                } else {
                    this.character.hit();
                }

                this.healthBar.setPercentage(this.character.energie);
                console.log('Character hat noch', this.character.energie, 'Leben');

                if (this.character.energie <= 0) {
                    this.endGame(this);
                    showEndscreen(false);
                }
            }
        });
    }

    checkThrowableObjectCollisions() {
        this.throwableObjects.forEach((bottle) => {
            let hitEnemyIndex = this.level.enemies.findIndex(enemy => bottle.isColliding(enemy));

            if (hitEnemyIndex !== -1) {
                let hitEnemy = this.level.enemies[hitEnemyIndex];

                if (hitEnemy instanceof Chicken || hitEnemy instanceof SmallChicken) {
                    this.handleChickenHit(bottle, hitEnemy);
                }

                if (hitEnemy instanceof Endboss) {
                    this.handleEndbossHit(bottle, hitEnemy);                 
                }

                if (isEndbossDefeated(this.level.enemies)) {
                    setTimeout(() => {
                        this.endGame(this);
                        showEndscreen(true);
                    }, 2000);
                }
            }
        });
    }

    endGame(world) {
        this.stopAllMovement(world);
        cancelAnimationFrame(world.animationFrame);
        clearInterval(world.gameLoop); 
        world.level.enemies = [];
    }

    handleChickenHit(bottle, chicken) {
        bottle.splash();
        chicken.die();
        setTimeout(() => {
            this.removeEnemy(chicken);
        }, 500);
    }

    handleEndbossHit(bottle, endboss) {
        bottle.splash();
        endboss.takeDamage();
    
        if (endboss.energie <= 0 && !endboss.isDead) {
            endboss.die(); 
        }
    }
    
    removeEnemy(enemy) {
        let indexToRemove = this.level.enemies.indexOf(enemy);
        if (indexToRemove !== -1) {
            this.level.enemies.splice(indexToRemove, 1);
        }
    }

    drawInWorld() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        /////////////////
        this.ctx.translate(-this.camera_x, 0);
        // ------- space for fixed objects
        this.addToMap(this.healthBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.bottleBar);

        let endboss = this.level.enemies.find(e => e instanceof Endboss);
        if (endboss) {
            this.addToMap(endboss.endbossBar);
        }
        this.ctx.translate(this.camera_x, 0);
        /////////////////
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

    addObjectsToMap(objects) {
        objects.forEach(obj => {
            this.addToMap(obj);
        });
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }

        mo.draw(this.ctx);
        /* mo.drawFrame(this.ctx); */

        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}