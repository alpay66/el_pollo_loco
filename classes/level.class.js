/**
 * Repräsentiert ein Level im Spiel mit Gegnern, Umgebungselementen 
 * und Sammelobjekten.
 */
class Level {
    enemies;
    clouds;
    backgroundObjects;
    coins;
    bottles;
    level_end_x = 2000;

    /**
     * Erstellt ein neues Level mit Gegnern, Wolken, Hintergrundobjekten, Münzen 
     * und Flaschen.
     */
    constructor(enemies, clouds, backgroundObjects, coins, bottles) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.bottles = bottles;
    }
}
