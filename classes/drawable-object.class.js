/**
 * Basis-Klasse für alle Objekte, die im Spiel gezeichnet werden können.
 */
class DrawableObject {
    img;
    imgCache = [];
    currentImage = 0;
    x = 120;
    y = 320;
    height = 120;
    width = 100;

    /**
     * Lädt ein Bild in das Objekt.
     * @param {string} path - Der Pfad zum Bild.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Zeichnet das Bild des Objekts auf das übergebene Canvas-Rendering-Context.
     * @param {CanvasRenderingContext2D} ctx - Der Canvas-Rendering-Context.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * Lädt mehrere Bilder in den Bild-Cache des Objekts.
     * @param {string[]} imgCacheArray - Array mit Bildpfaden.
     */
    loadImages(imgCacheArray) {
        imgCacheArray.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imgCache[path] = img;
        });
    }
}
