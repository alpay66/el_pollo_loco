class DrawableObject {
    img;
    imgCache = [];
    currentImage = 0;
    x = 120;
    y = 320;
    height = 120;
    width = 100;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    loadImages(imgCacheArray) {
        imgCacheArray.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imgCache[path] = img;
        });
    }

    drawFrame(ctx) {
        if (this instanceof Character || 
            this instanceof Chicken || 
            this instanceof SmallChicken || 
            this instanceof Endboss || 
            this instanceof Coin) {
            ctx.beginPath();
            ctx.lineWidth = "2";
            ctx.strokeStyle = "red";
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }
}