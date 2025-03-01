let level_1;

function levelInit() {
    level_1 = new Level(
        [
            new Chicken(),
            new SmallChicken(),
            new Chicken(),
            new SmallChicken(),
            new Chicken(),
            new Endboss()
        ],
        [
            new Cloud(),
        ],
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
        [   // new Coin(x300-x800, y300)
            new Coin(300, 2000, 300),
            new Coin(300, 2000, 250),
            /*         new Coin(300, 2000, 200), 
                    new Coin(300, 2000, 350),
                    new Coin(300, 2000, 300),
                    new Coin(300, 2000, 250), 
                    new Coin(300, 2000, 200), 
                    new Coin(300, 2000, 350), */
        ],
        [
            new Bottle(200, 2000),
            new Bottle(250, 2000),
            /*         new Bottle(300, 2000),
                    new Bottle(350, 2000),
                    new Bottle(400, 2000),  
                    new Bottle(450, 2000),
                    new Bottle(320, 2000),
                    new Bottle(180, 2600) */
        ],
    );
} // end of levelInit