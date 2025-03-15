/**
 * Repräsentiert ein Level im Spiel mit Gegnern, Umgebungselementen und Sammelobjekten.
 */
class Level {
    /** @type {MovableObject[]} Liste der Gegner im Level. */
    enemies;

    /** @type {Cloud[]} Liste der Wolken im Level. */
    clouds;

    /** @type {BackgroundObject[]} Liste der Hintergrundobjekte im Level. */
    backgroundObjects;

    /** @type {Coin[]} Liste der Münzen im Level. */
    coins;

    /** @type {Bottle[]} Liste der Flaschen im Level. */
    bottles;

    /** @type {number} Die x-Koordinate, an der das Level endet. */
    level_end_x = 2000;

    /**
     * Erstellt ein neues Level mit Gegnern, Wolken, Hintergrundobjekten, Münzen und Flaschen.
     * @param {MovableObject[]} enemies - Liste der Gegner.
     * @param {Cloud[]} clouds - Liste der Wolken.
     * @param {BackgroundObject[]} backgroundObjects - Liste der Hintergrundobjekte.
     * @param {Coin[]} coins - Liste der Münzen.
     * @param {Bottle[]} bottles - Liste der Flaschen.
     */
    constructor(enemies, clouds, backgroundObjects, coins, bottles) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.bottles = bottles;
    }
}
