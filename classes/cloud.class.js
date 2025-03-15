/**
 * Repräsentiert eine Wolke im Hintergrund des Spiels.
 */
class Cloud extends MovableObject {
    y = 40;
    width = 400;
    height = 200;

    /**
     * Erstellt eine neue Wolke an einer zufälligen X-Position.
     */
    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.x = Math.random() * 500;
        this.animate();
    }

    /**
     * Startet die Animation der Wolke, sodass sie sich nach links bewegt.
     */
    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    }
}
