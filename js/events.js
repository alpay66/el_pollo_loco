/**
 * Überprüft die Bildschirmausrichtung und zeigt eine Warnung an, wenn das Gerät im Hochformat ist.
 * Die Warnung wird angezeigt, wenn die Höhe größer als die Breite ist und die Breite 920px oder weniger beträgt.
 */
function checkOrientation() {
    let rotateWarning = document.getElementById("rotate-warning");
    if (window.innerHeight > window.innerWidth && window.innerWidth <= 920) {
        rotateWarning.style.display = "flex";
        enableMobileButtons();
    } else {
        rotateWarning.style.display = "none";
        enableMobileButtons();
    }
}

// Event-Listener für Änderungen der Bildschirmgröße und Ausrichtung
window.addEventListener("resize", checkOrientation);
window.addEventListener("orientationchange", checkOrientation);
document.addEventListener("DOMContentLoaded", checkOrientation);
window.addEventListener("resize", handleMobileControls);
window.addEventListener("orientationchange", handleMobileControls);
document.addEventListener("DOMContentLoaded", handleMobileControls);

/**
 * Initialisiert die mobilen Steuerelemente beim Laden der Seite.
 * @listens window:load
 */
window.onload = () => {
    handleMobileControls();
    setupMobileControls();
};

/**
 * Event-Handler für Tastendruck-Events.
 * Aktualisiert den Zustand der Tasten im `keyboard`-Objekt.
 * @listens window:keydown
 * @param {KeyboardEvent} event - Das Tastatur-Event
 */
window.addEventListener("keydown", (event) => {
    if (event.keyCode == 39) keyboard.RIGHT = true;
    if (event.keyCode == 37) keyboard.LEFT = true;
    if (event.keyCode == 38) keyboard.UP = true;
    if (event.keyCode == 40) keyboard.DOWN = true;
    if (event.keyCode == 32) keyboard.SPACE = true;
    if (event.keyCode == 68) keyboard.D = true;
});

/**
 * Event-Handler für Tastenloslassen-Events.
 * Aktualisiert den Zustand der Tasten im `keyboard`-Objekt.
 * @listens window:keyup
 * @param {KeyboardEvent} event - Das Tastatur-Event
 */
window.addEventListener("keyup", (event) => {
    if (event.keyCode == 39) keyboard.RIGHT = false;
    if (event.keyCode == 37) keyboard.LEFT = false;
    if (event.keyCode == 38) keyboard.UP = false;
    if (event.keyCode == 40) keyboard.DOWN = false;
    if (event.keyCode == 32) keyboard.SPACE = false;
    if (event.keyCode == 68) keyboard.D = false;
});

/**
 * Initialisiert die mobilen Touch-Steuerelemente.
 * Fügt Event-Listener für Touch-Events zu den Steuerungsbuttons hinzu.
 */
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

/**
 * Überprüft, ob der Endboss besiegt wurde.
 * @param {Array<Enemy>} enemies - Array aller Gegner im Spiel
 * @returns {boolean} True wenn der Endboss tot ist, sonst false
 */
function isEndbossDefeated(enemies) {
    return enemies.find(e => e instanceof Endboss)?.isDead;
}

/**
 * Überprüft, ob das aktuelle Gerät ein mobiles Gerät ist.
 * Berücksichtigt User-Agent, Touch-Fähigkeiten und CSS Media Queries.
 * @returns {boolean} True wenn mobiles Gerät erkannt wird, sonst false
 */
function isMobileDevice() {
    const ua = navigator.userAgent;
    const isMobileUA = /Mobi|Android|iPhone|iPad|iPod/i.test(ua);
    const isIpadDesktopMode = navigator.maxTouchPoints > 1 && /Macintosh/.test(ua);
    const mqNoHover = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
    return isMobileUA || isIpadDesktopMode || mqNoHover;
}

/**
 * Steuert die Sichtbarkeit der mobilen Steuerelemente.
 * Zeigt sie an, wenn ein mobiles Gerät erkannt wird.
 */
function handleMobileControls() {
    let mobileControls = document.getElementById('mobile-controls');
    mobileControls.style.display = isMobileDevice() ? 'flex' : 'none';
}

/**
 * Deaktiviert die Anzeige der mobilen Steuerelemente.
 */
function disableMobileButtons() {
    let mobileControls = document.getElementById('mobile-controls');
    if (mobileControls) {
        mobileControls.style.display = 'none';
    }
}

/**
 * Aktiviert die Anzeige der mobilen Steuerelemente, wenn ein mobiles Gerät erkannt wird.
 */
function enableMobileButtons() {
    let mobileControls = document.getElementById('mobile-controls');
    if (isMobileDevice() && mobileControls) {
        mobileControls.style.display = 'flex';
    }
}

/**
 * Zeigt die Steuerungsanleitung an und versteckt den Startbildschirm.
 */
function showControls() {
    document.getElementById("startscreen").style.display = "none";
    document.getElementById("controls-screen").style.display = "block";
}

/**
 * Versteckt die Steuerungsanleitung und zeigt den Startbildschirm an.
 */
function hideControls() {
    document.getElementById("controls-screen").style.display = "none";
    document.getElementById("startscreen").style.display = "flex";
}

/**
 * Initialisiert die Audio-Einstellungen beim Laden der Seite.
 * @listens window:load
 */
window.addEventListener("load", () => {
    const savedMute = localStorage.getItem("isMuted");
    isMuted = savedMute === "true"; // Lese den gespeicherten Mute-Status

    if (isMuted) {
        allSounds.forEach(sound => {
            sound.volume = 0;
            sound.pause();
        });
        backgroundMusic.volume = 0;
        backgroundMusic.pause();
    } else {
        allSounds.forEach(sound => {
            sound.volume = 0.1;
        });
        backgroundMusic.volume = 0.1;
        backgroundMusic.play().catch(() => {});
    }

    // Aktualisiere den Mute-Button
    document.getElementById("mute-btn").innerText = isMuted ? "🔇" : "🔊";
});

/**
 * Versteckt den Fullscreen-Button auf mobilen Geräten.
 * Überprüft, ob das aktuelle Gerät ein mobiles Gerät ist, und passt die Sichtbarkeit des Buttons entsprechend an.
 * 
 * - Wenn ein mobiles Gerät erkannt wird, wird der Button ausgeblendet.
 * - Andernfalls wird der Button angezeigt.
 * 
 * @function hideFullscreenButtonOnMobile
 */
function hideFullscreenButtonOnMobile() {
    const fullscreenBtn = document.getElementById('fullscreen-btn');
    if (isMobileDevice()) {
        fullscreenBtn.style.display = 'none'; // Button ausblenden
    } else {
        fullscreenBtn.style.display = 'block'; // Button anzeigen
    }
}

/**
 * Fügt Event-Listener hinzu, um die Sichtbarkeit des Fullscreen-Buttons
 * beim Laden der Seite und bei Änderungen der Fenstergröße zu steuern.
 * 
 * @listens window:load
 * @listens window:resize
 */
window.addEventListener('load', hideFullscreenButtonOnMobile);
window.addEventListener('resize', hideFullscreenButtonOnMobile);
