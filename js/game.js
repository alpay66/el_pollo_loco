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
    init(); // Erst hier wird das Spiel gestartet
}

function showEndscreen(hasWon) {
    const endscreenOverlay = document.getElementById('overlay');
    endscreenOverlay.innerHTML = ''; 
    endscreenOverlay.style.display = 'block';

    const endscreenImg = document.createElement('img');
    endscreenImg.src = hasWon 
        ? 'img/9_intro_outro_screens/win/won_2.png' 
        : 'img/9_intro_outro_screens/game_over/you lost.png';
    endscreenImg.classList.add('endscreen-img');

    endscreenOverlay.appendChild(endscreenImg);
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