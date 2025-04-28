/** 
 * Globale Variable für das Level 1.
 * @type {Level}
 */
let level_1;

/**
 * Initialisiert das Level 1.
 * Erstellt ein neues Level-Objekt mit Gegnern, Wolken, Hintergrundobjekten, Münzen und Flaschen.
 */
function levelInit() {
    level_1 = new Level(
        // Gegner im Level
        [
            new Chicken(),       
            new SmallChicken(),  
            new Chicken(),       
            new SmallChicken(),  
            new Chicken(),       
            new SmallChicken(),  
            new Chicken(),        
            new SmallChicken(),  
            new Chicken(),       
            new SmallChicken(),  
            new Chicken(),       
            new SmallChicken(),  
            new Chicken(),       
            new Chicken(),       
            new SmallChicken(),  
            new Chicken(),       
            new SmallChicken(),  
            new Chicken(),       
            new SmallChicken(),  
            new Chicken(),       
            new SmallChicken(),  
            new Chicken(),       
            new Endboss()        
        ],
        // Wolken im Level
        [
            new Cloud(),
        ],
        // Hintergrundobjekte im Level
        [
            new BackgroundObject('img/5_background/layers/air.png', -719),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -719),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -719),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -719),
            new BackgroundObject('img/5_background/layers/air.png', 0),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/air.png', 719),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719),
            new BackgroundObject('img/5_background/layers/air.png', 719 * 2),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 2),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 2),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 2),
            new BackgroundObject('img/5_background/layers/air.png', 719 * 3),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719 * 3),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719 * 3),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719 * 3),
        ],
        // Münzen im Level
        [
            new Coin(200, 2900, 300),
            new Coin(400, 2400, 250),
            new Coin(300, 2600, 200),
            new Coin(500, 3100, 350),
            new Coin(200, 2900, 300),
            new Coin(600, 2900, 250),
            new Coin(400, 2800, 200),
            new Coin(800, 2900, 350),
        ],
        // Flaschen im Level
        [
            new Bottle(200, 2900),  
            new Bottle(250, 3500),  
            new Bottle(200, 2900),  
            new Bottle(350, 2900),  
            new Bottle(600, 2900),  
            new Bottle(450, 2500),  
            new Bottle(820, 2600),  
            new Bottle(980, 2700)   
        ],
    );
}