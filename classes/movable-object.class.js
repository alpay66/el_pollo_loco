class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2;
    offsetY = 0;
    energie = 100;
    lastHit = 0;

    isColliding(mo) {
        return (this.x + this.width) >= mo.x &&
            this.x <= (mo.x + mo.width) &&
            (this.y + this.offsetY + this.height) >= mo.y &&
            (this.y + this.offsetY) <= (mo.y + mo.height);
    }

    hit(damage = 5) { 
        this.energie -= damage;
        
        if (this instanceof Character) {
            this.hurtSound.currentTime = 0;
            this.hurtSound.play();
        }

        if (this.energie < 0) {
            this.energie = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }
    
    isDead() {
        return this.energie == 0;
    }

    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        timePassed = timePassed / 1000;
        return timePassed < 1;
    }

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 180;
        }
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imgCache[path];
        this.currentImage++;
    }

    moveRight() {
        this.x += this.speed;
        
    }

    moveLeft() {
        this.x -= this.speed;
        
    }

    jump() {
        this.speedY = 30;
    }
}