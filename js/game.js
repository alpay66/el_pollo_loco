/**
 * Globale Variablen für das Spiel.
 * @type {HTMLCanvasElement} canvas - Das Canvas-Element für das Spiel.
 * @type {World} world - Die Spielwelt.
 * @type {Keyboard} keyboard - Das Tastatur-Objekt zur Steuerung.
 * @type {Array<number>} intervalIds - Speichert die IDs der Intervalle, um sie später zu stoppen.
 * @type {boolean} isMuted - Gibt an, ob das Spiel stummgeschaltet ist.
 * @type {Array<HTMLAudioElement>} allSounds - Speichert alle Sounds des Spiels.
 */
let canvas;
let world;
let keyboard = new Keyboard();
let intervalIds = [];
let isMuted = false;
let allSounds = [];

/**
 * Hintergrundmusik für das Spiel.
 * @type {HTMLAudioElement}
 */
let backgroundMusic = new Audio('audio/background-musik-pollo.mp3');
backgroundMusic.volume = 0.1;
backgroundMusic.loop = true;

/**
 * Schaltet die Stummschaltung des Spiels um.
 * Pausiert oder spielt alle Sounds und aktualisiert den Mute-Button.
 */
function toggleMute() {
    isMuted = !isMuted;
    allSounds.forEach(sound => {
        sound.volume = isMuted ? 0 : 0.1;
        isMuted ? sound.pause() : sound.play().catch(() => {});
    });

    backgroundMusic[isMuted ? "pause" : "play"]();
    document.getElementById("mute-btn").innerText = isMuted ? "🔇" : "🔊";
}

/**
 * Registriert einen Sound im `allSounds`-Array.
 * @param {HTMLAudioElement} audioElement - Der Sound, der registriert werden soll.
 */
function registerSound(audioElement) {
    allSounds.push(audioElement);
}

/**
 * Registriert alle Sounds des Spiels.
 */
function registerSounds() {
    registerSound(backgroundMusic);

    if (!world) return;

    registerSound(world.stompSound);
    registerWorldSounds();
    registerCharacterSounds();
    registerEnemySounds();
    registerBottleSounds();
}

/**
 * Registriert Sounds, die in der World-Klasse definiert sind.
 */
function registerWorldSounds() {
    if (!world) return;

    registerSound(world.collectBottleSound);
    registerSound(world.collectCoinSound);
}

/**
 * Registriert die Sounds des Charakters.
 */
function registerCharacterSounds() {
    if (!world.character) return;

    ["hurtSound", "jumpSound", "throwSound", "walkSound"].forEach(sound => 
        registerSound(world.character[sound])
    );
}

/**
 * Registriert die Sounds der Gegner.
 */
function registerEnemySounds() {
    if (!world.level || !world.level.enemies) return;

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

/**
 * Registriert die Sounds der Flaschen.
 */
function registerBottleSounds() {
    if (!world.throwableObjects) return;

    world.throwableObjects.forEach(bottle => 
        registerSound(bottle.splashSound)
    );
}

/**
 * Initialisiert das Spiel.
 * Setzt das Canvas, das Level und die Spielwelt.
 */
function init() {
    canvas = document.getElementById('canvas');
    levelInit();
    world = new World(canvas, keyboard);
    registerSounds(); 
}

/**
 * Erstellt ein stoppbares Intervall und speichert die ID.
 * @param {Function} fn - Die Funktion, die in einem Intervall ausgeführt wird.
 * @param {number} time - Das Intervall in Millisekunden.
 */
function setStoppableInterval(fn, time) {
    let id = setInterval(fn, time);
    intervalIds.push(id);
}

/**
 * Startet das Spiel neu.
 * Blendet den Startbildschirm aus, stoppt das Spiel, setzt es zurück und aktiviert die mobilen Buttons.
 */
function restartGame() {
    document.getElementById('startscreen').style.display = 'none';
    stopGame(); 
    resetGame();
    enableMobileButtons();
    manageBackgroundMusic('play');
    registerSounds();
    if (isMuted) {
        toggleMute();  
    }
}

/**
 * Setzt das Spiel zurück.
 */
function resetGame() {
    levelInit();
    resetWorld();
}

/**
 * Stoppt das Spiel.
 * Beendet alle Intervalle und pausiert die Hintergrundmusik.
 */
function stopGame() {
    intervalIds.forEach(clearInterval);
    intervalIds = [];

    manageBackgroundMusic('stop');

    for (let i = 1; i < 9999; i++) {
        window.clearInterval(i);
    }
}

/**
 * Stoppt alle Sounds der Hühner.
 */
function stopAllChickenSounds() {
    if (world && world.level && world.level.enemies) {
        world.level.enemies.forEach(enemy => {
            if (enemy instanceof Chicken) {
                enemy.stopChickenSound();
            }
        });
    }
}

/**
 * Setzt die Spielwelt zurück.
 */
function resetWorld() {
    if (!world) return;
    
    world = null;
    world = new World(canvas, keyboard);
}

/**
 * Startet das Spiel.
 * Blendet den Startbildschirm aus und spielt die Hintergrundmusik.
 */
function startGame() {
    document.getElementById('startscreen').style.display = 'none';
    manageBackgroundMusic('play');
    handleMobileControls();
    enableMobileButtons();
    setupMobileControls();
    init();
}

/**
 * Steuert die Hintergrundmusik.
 * @param {string} letsGo - 'play' zum Abspielen, 'stop' zum Stoppen.
 */
function manageBackgroundMusic(letsGo) {
    if (letsGo === 'play') {
        backgroundMusic.currentTime = 0;
        backgroundMusic.play().catch(error => console.error('Audio-Fehler:', error));
    } else if (letsGo === 'stop') {
        backgroundMusic.pause();
        backgroundMusic.currentTime = 0;
    }
}

/**
 * Zeigt den Endbildschirm an.
 * @param {boolean} hasWon - Gibt an, ob der Spieler gewonnen hat.
 */
function showEndscreen(hasWon) {
    const overlay = document.getElementById('startscreen');
    overlay.innerHTML = getEndscreenTemplate(hasWon);
    overlay.style.display = 'block';
    disableMobileButtons();
    stopGame();
}

/**
 * Lädt die Startseite neu.
 */
function goToStartScreen() {
    location.reload();
}

/**
 * Schaltet den Vollbildmodus um.
 */
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
        resetScreenSize();
    }
}

/**
 * Passt die Bildschirmgröße für den Vollbildmodus an.
 */
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

/**
 * Event-Listener für Änderungen im Vollbildmodus.
 */
document.addEventListener("fullscreenchange", () => {
    if (!document.fullscreenElement) {
        resetScreenSize();
    }
});

/**
 * Setzt die Bildschirmgröße zurück.
 */
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