let canvas;
let world;
let keyboard = new Keyboard();

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    console.log('My World ist', world);
    console.log('My Character ist', world.character);
    
}

function startGame() {
    document.getElementById('startscreen').style.display = 'none';
    init();
}

function showEndscreen(hasWon) {
    const overlay = document.getElementById('overlay');
    overlay.innerHTML = /* html */ `
        <div id="endscreen" class="endscreen">
            <img src="${hasWon ? 'img/9_intro_outro_screens/win/won_2.png' : 'img/9_intro_outro_screens/game_over/you lost.png'}" class="endscreen-img">
            <div class="button-container">
                <button class="btn" onclick="restartGame()">Neustarten</button>
                <button class="btn" onclick="goToStartScreen()">Zum Start</button>
            </div>
        </div>
    `;
    overlay.style.display = 'block';
}

function goToStartScreen() {
    location.reload();
}

function restartGame() {
}


function isEndbossDefeated(enemies) {
    return enemies.find(e => e instanceof Endboss)?.isDead;
}

// UHR IST NUR FÜR MICH EINFACH SO GEMACHT 
setInterval(() => 
    document.getElementById('clock').innerText = new Date().toLocaleTimeString(), 1000);

// Taste gedrückt
window.addEventListener("keydown", (event) => {
    if(event.keyCode == 39) keyboard.RIGHT = true;
    if(event.keyCode == 37) keyboard.LEFT = true;
    if(event.keyCode == 38) keyboard.UP = true;
    if(event.keyCode == 40) keyboard.DOWN = true;
    if(event.keyCode == 32) keyboard.SPACE = true;
    if(event.keyCode == 68) keyboard.D = true; 
});	

// Taste losgelassen
window.addEventListener("keyup", (event) => {
    if(event.keyCode == 39) keyboard.RIGHT = false;
    if(event.keyCode == 37) keyboard.LEFT = false;
    if(event.keyCode == 38) keyboard.UP = false;
    if(event.keyCode == 40) keyboard.DOWN = false;
    if(event.keyCode == 32) keyboard.SPACE = false;
    if(event.keyCode == 68) keyboard.D = false; 
});	