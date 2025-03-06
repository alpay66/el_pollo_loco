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
}