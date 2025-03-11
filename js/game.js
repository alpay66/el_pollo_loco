let canvas;
let world;
let keyboard = new Keyboard();
let intervalIds = [];

let isMuted = false;
let allSounds = []; 

backgroundMusic = new Audio('audio/background-musik-pollo.mp3');
backgroundMusic.volume = 0.1;
backgroundMusic.loop = true; 

function toggleMute() {
    isMuted = !isMuted;

    allSounds.forEach(sound => {
        sound.volume = isMuted ? 0 : 0.1;
    });
    if (isMuted) {
        backgroundMusic.pause(); 
        allSounds.forEach(sound => sound.pause());
    } else {
        backgroundMusic.play().catch(error => console.error('Audio-Fehler:', error));
        allSounds.forEach(sound => sound.play());
    }

    document.getElementById("mute-btn").innerText = isMuted ? "🔇" : "🔊";
}

function registerSound(audioElement) {
    allSounds.push(audioElement);
}

function registerSounds() {
    registerSound(backgroundMusic); 

    if (world) {
        registerSound(world.stompSound);
    }

    if (world && world.character) {
        registerSound(world.character.hurtSound);
        registerSound(world.character.jumpSound);
        registerSound(world.character.throwSound);
        registerSound(world.character.walkSound);
    }

    if (world && world.level && world.level.enemies) {
        world.level.enemies.forEach(enemy => {
            if (enemy instanceof Chicken) {
                registerSound(enemy.chickenSound);
            }
            if (enemy instanceof Endboss) {
                registerSound(enemy.endbossHurt);
                registerSound(enemy.endbossDead);
            }
        });
    }

    if (world && world.throwableObjects) {
        world.throwableObjects.forEach(bottle => {
            registerSound(bottle.splashSound);
        });
    }
}

function init() {
    canvas = document.getElementById('canvas');
    levelInit();
    world = new World(canvas, keyboard);
    console.log('My World ist', world);
    console.log('My Character ist', world.character);
    registerSounds(); 
}

function setStoppableInterval(fn, time) {
    let id = setInterval(fn, time);
    intervalIds.push(id);
}

function restartGame() {
    document.getElementById('startscreen').style.display = 'none';
    stopGame(); 
    resetGame();
    enableMobileButtons();
    manageBackgroundMusic('play'); 
}

function resetGame() {
    levelInit();
    resetWorld();
    
}

function stopGame() {
    intervalIds.forEach(clearInterval);
    intervalIds = [];

    manageBackgroundMusic('stop');
    stopAllChickenSounds();


    for (let i = 1; i < 9999; i++) {
        window.clearInterval(i);
    }
}

function stopAllChickenSounds() {
    if (world && world.level && world.level.enemies) {
        world.level.enemies.forEach(enemy => {
            if (enemy instanceof Chicken) {
                enemy.stopChickenSound();
            }
        });
    }
}

function resetWorld() {
    if (!world) return;
    
    world = null;
    world = new World(canvas, keyboard);
}

function startGame() {
    document.getElementById('startscreen').style.display = 'none';
    manageBackgroundMusic('play');
    init();
}

function manageBackgroundMusic(action) {
    if (action === 'play') {
        backgroundMusic.currentTime = 0;
        backgroundMusic.play().catch(error => console.error('Audio-Fehler:', error)); // Falls Autoplay blockiert wird
    } else if (action === 'stop') {
        backgroundMusic.pause();
        backgroundMusic.currentTime = 0;
    }
}

function showEndscreen(hasWon) {
    const overlay = document.getElementById('startscreen');
    overlay.innerHTML = getEndscreenTemplate(hasWon);
    overlay.style.display = 'block';
    disableMobileButtons();
    stopGame();
}

function goToStartScreen() {
    location.reload();
}

function toggleFullscreen() {
    let elem = document.documentElement; // Setzt den gesamten Body in Fullscreen

    if (!document.fullscreenElement) {
        elem.requestFullscreen().then(() => {
            adjustScreenForFullscreen();
        }).catch(err => {
            console.error(`Fehler beim Wechsel in den Fullscreen-Modus: ${err.message}`);
        });
    } else {
        document.exitFullscreen();
        resetScreenSize();
    }
}

function toggleFullscreen() {
    let elem = document.documentElement; 

    if (!document.fullscreenElement) {
        elem.requestFullscreen().then(() => {
            adjustScreenForFullscreen();
        }).catch(err => {
            console.error(`Fehler beim Wechsel in den Fullscreen-Modus: ${err.message}`);
        });
    } else {
        document.exitFullscreen();
    }
}

function adjustScreenForFullscreen() {
    let overlay = document.getElementById('overlay');
    let canvas = document.getElementById('canvas');
    let startscreen = document.getElementById('startscreen');

    overlay.style.width = "100vw";
    overlay.style.height = "100vh";

    startscreen.style.width = "100vw";
    startscreen.style.height = "100vh";

    canvas.style.width = "100vw";
    canvas.style.height = "100vh";
}

document.addEventListener("fullscreenchange", () => {
    if (!document.fullscreenElement) {
        resetScreenSize();
    }
});

function resetScreenSize() {
    let overlay = document.getElementById('overlay');
    let canvas = document.getElementById('canvas');
    let startscreen = document.getElementById('startscreen');

    overlay.style.width = "";
    overlay.style.height = "";

    startscreen.style.width = "";
    startscreen.style.height = "";

    canvas.style.width = "720px";
    canvas.style.height = "480px";
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

function setupMobileControls() {
    document.getElementById('left-btn').addEventListener('touchstart', () => keyboard.LEFT = true);
    document.getElementById('left-btn').addEventListener('touchend', () => keyboard.LEFT = false);

    document.getElementById('right-btn').addEventListener('touchstart', () => keyboard.RIGHT = true);
    document.getElementById('right-btn').addEventListener('touchend', () => keyboard.RIGHT = false);

    document.getElementById('jump-btn').addEventListener('touchstart', () => keyboard.UP = true);
    document.getElementById('jump-btn').addEventListener('touchend', () => keyboard.UP = false);

    document.getElementById('throw-btn').addEventListener('touchstart', () => keyboard.D = true);
    document.getElementById('throw-btn').addEventListener('touchend', () => keyboard.D = false);
}

function isMobileDevice() {
    return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}

function handleMobileControls() {
    let mobileControls = document.getElementById('mobile-controls');

    if (isMobileDevice()) {
        mobileControls.style.display = 'flex'; 
    } else {
        mobileControls.style.display = 'none';
    }
}

function disableMobileButtons() {
    let mobileControls = document.getElementById('mobile-controls');
    if (mobileControls) {
        mobileControls.style.display = 'none';
    }
}

function enableMobileButtons() {
    let mobileControls = document.getElementById('mobile-controls');
    if (isMobileDevice() && mobileControls) {
        mobileControls.style.display = 'flex'; 
    }
}
