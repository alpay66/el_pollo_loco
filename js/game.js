let canvas;
let world;
let keyboard = new Keyboard();
let intervalIds = [];

function init() {
    canvas = document.getElementById('canvas');
    levelInit();
    world = new World(canvas, keyboard);
    console.log('My World ist', world);
    console.log('My Character ist', world.character);
}

function setStoppableInterval(fn, time) {
    let id = setInterval(fn, time);
    intervalIds.push(id);
}

function restartGame() {
    document.getElementById('startscreen').style.display = 'none';
    stopGame(); 
    resetGame();
}

function resetGame() {
    levelInit();
    resetWorld();
    
}

function stopGame() {
    intervalIds.forEach(clearInterval);
    intervalIds = [];

    for (let i = 1; i < 9999; i++) {
        window.clearInterval(i);
    }
}

function resetWorld() {
    if (!world) return;
    
    world = null;
    world = new World(canvas, keyboard);
}

function startGame() {
    document.getElementById('startscreen').style.display = 'none';
    init();
}

function showEndscreen(hasWon) {
    const overlay = document.getElementById('startscreen');
    overlay.innerHTML = getEndscreenTemplate(hasWon);
    overlay.style.display = 'block';
    stopGame();
}

function goToStartScreen() {
    location.reload();
}

function toggleFullscreen() {
    let canvas = document.getElementById('canvas');
    if (!document.fullscreenElement) {
        if (canvas.requestFullscreen) {
            canvas.requestFullscreen();
        } else if (canvas.mozRequestFullScreen) {
            canvas.mozRequestFullScreen();
        } else if (canvas.webkitRequestFullscreen) {
            canvas.webkitRequestFullscreen();
        } else if (canvas.msRequestFullscreen) {
            canvas.msRequestFullscreen();
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
}


function isEndbossDefeated(enemies) {
    return enemies.find(e => e instanceof Endboss)?.isDead;
}

window.addEventListener("keydown", (event) => {
    if (event.keyCode == 39) keyboard.RIGHT = true;
    if (event.keyCode == 37) keyboard.LEFT = true;
    if (event.keyCode == 38) keyboard.UP = true;
    if (event.keyCode == 40) keyboard.DOWN = true;
    if (event.keyCode == 32) keyboard.SPACE = true;
    if (event.keyCode == 68) keyboard.D = true;
});

window.addEventListener("keyup", (event) => {
    if (event.keyCode == 39) keyboard.RIGHT = false;
    if (event.keyCode == 37) keyboard.LEFT = false;
    if (event.keyCode == 38) keyboard.UP = false;
    if (event.keyCode == 40) keyboard.DOWN = false;
    if (event.keyCode == 32) keyboard.SPACE = false;
    if (event.keyCode == 68) keyboard.D = false;
});	