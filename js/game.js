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
allSounds.push(backgroundMusic);

/**
 * Schaltet die Stummschaltung des Spiels um.
 * Pausiert oder spielt alle Sounds und aktualisiert den Mute-Button.
 */
function toggleMute() {
    isMuted = !isMuted;
    
    if (isMuted) {
        allSounds.forEach(sound => sound.pause());
        backgroundMusic.pause();
    } else {
        backgroundMusic.play().catch(() => {});
    }
    
    document.getElementById("mute-btn").innerText = isMuted ? "🔇" : "🔊";
    localStorage.setItem("isMuted", isMuted);
}

function loadMuteSettings() {
    isMuted = localStorage.getItem("isMuted") === "true";

    allSounds.forEach(sound => sound.volume = isMuted ? 0 : 0.1);

    if (isMuted) {
        allSounds.forEach(sound => sound.pause());
        backgroundMusic.pause();
    } else {
        backgroundMusic.volume = 0.1;
        backgroundMusic.play().catch(() => {});
    }
}




/**
 * Initialisiert das Spiel.
 * Setzt das Canvas, das Level und die Spielwelt.
 */
function init() {
    canvas = document.getElementById('canvas');
    levelInit();
    world = new World(canvas, keyboard);
    loadMuteSettings();
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

    for (let i = 1; i < 999; i++) {
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
    document.getElementById("impressum-btn").style.display = "none"; 
}

/**
 * Steuert die Hintergrundmusik.
 * @param {string} letsGo - 'play' zum Abspielen, 'stop' zum Stoppen.
 */
function manageBackgroundMusic(letsGo) {
    if (isMuted) {
        backgroundMusic.pause();
        backgroundMusic.volume = 0;
        return;
    }
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