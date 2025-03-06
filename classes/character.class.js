class Character extends MovableObject {
    CHARACTER_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];
    CHARACTER_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];
    CHARACTER_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];
    CHARACTER_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];
    CHARACTER_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
    ];
    CHARACTER_LONG_IDLE = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];
    x = 120;
    y = 180;
    height = 260;
    width = 110;
    speed = 10;
    world;
    idleTimer = 0;
    idleInterval;
    canThrow = true;
    isWalking = false;
    lastDamageTime = 0;
    walkSound = new Audio('audio/walk.mp3');
    jumpSound = new Audio('audio/jump.mp3');
    hurtSound = new Audio('audio/hurt_sound.mp3');
    throwSound = new Audio('audio/throw.mp3');

    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.CHARACTER_WALKING);
        this.loadImages(this.CHARACTER_JUMPING);
        this.loadImages(this.CHARACTER_HURT);
        this.loadImages(this.CHARACTER_DEAD);
        this.loadImages(this.CHARACTER_IDLE);
        this.loadImages(this.CHARACTER_LONG_IDLE);
        this.hurtSound.volume = 0.5;
        this.applyGravity();
        this.animateCharacter();
    }

    animateCharacter() {
        setInterval(() => {
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.moveRight();
                this.otherDirection = false;
                this.playWalkSound();
                this.resetIdleTimer();
            }
            else if (this.world.keyboard.LEFT && this.x > 0) {
                this.moveLeft();
                this.otherDirection = true;
                this.playWalkSound();
                this.resetIdleTimer();
            } else {
                this.stopWalkSound();
            }

            if (this.world.keyboard.UP && !this.isAboveGround()) {
                this.jump();
                this.playJumpSound();
                this.resetIdleTimer();
            }
            if (this.world.keyboard.D) {
                this.throwBottle();
            }
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);

        setInterval(() => {

            if (this.isHurt()) {
                this.playAnimation(this.CHARACTER_HURT);
            } else
                if (this.isDead()) {
                    this.playAnimation(this.CHARACTER_DEAD);
                } else
                    if (this.isAboveGround()) {
                        this.playAnimation(this.CHARACTER_JUMPING);
                    } else
                        if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                            this.playAnimation(this.CHARACTER_WALKING);
                        }
        }, 50);
        this.startIdleCheck();
    }

    throwBottle() {
        if (this.canThrow && this.world.bottleBar.collectedBottles > 0) {
            this.canThrow = false;

            let bottleX = this.x + (this.otherDirection ? -20 : 20);
            let bottleY = this.y + 100;
            let bottleSpeed = this.otherDirection ? -7 : 7;

            let bottle = new ThrowableObject(bottleX, bottleY, bottleSpeed, this.world);
            this.world.throwableObjects.push(bottle);

            this.world.bottleBar.setBottles(this.world.bottleBar.collectedBottles - 1);

            this.throwSound.currentTime = 0;
            this.throwSound.play();

            setTimeout(() => {
                this.canThrow = true;
            }, 500);
        }
    }

    isAboveEnemy(enemy) {
        return this.y + this.height < enemy.y + enemy.height && this.speedY < 0;  // Der Charakter ist über dem Feind
    }

    bounceOff() {
        this.speedY = 15;  // Lasse den Charakter nach dem Aufprall abprallen
    }

    stopMovement() {
        this.speed = 0;
        this.world.keyboard = {};
    }

    resetIdleTimer() {
        this.idleTime = 0;
    }

    startIdleCheck() {
        this.idleInterval = setInterval(() => {
            this.idleTime += 1;

            if (this.idleTime >= 15) {
                this.playAnimation(this.CHARACTER_LONG_IDLE);
            } else if (this.idleTime >= 5) {
                this.playAnimation(this.CHARACTER_IDLE);
            }
        }, 500);
    }

    playWalkSound() {
        if (!this.isWalking) {
            this.isWalking = true;
            this.walkSound.play();
        }
    }

    stopWalkSound() {
        if (this.isWalking) {
            this.isWalking = false;
            this.walkSound.pause();
            this.walkSound.currentTime = 0;
        }
    }

    playJumpSound() {
        if (!this.isJumping) {
            this.isJumping = true;
            this.jumpSound.currentTime = 0;
            this.jumpSound.play();

            setTimeout(() => {
                this.isJumping = false;
            }, 500);
        }
    }
}