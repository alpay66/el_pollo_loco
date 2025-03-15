/**
 * Überprüft die Bildschirmausrichtung und zeigt eine Warnung an, wenn das Gerät im Hochformat ist.
 * Die Warnung wird angezeigt, wenn die Höhe größer als die Breite ist und die Breite 920px oder weniger beträgt.
 */
function checkOrientation() {
    let rotateWarning = document.getElementById("rotate-warning");
    if (window.innerHeight > window.innerWidth && window.innerWidth <= 920) {
        rotateWarning.style.display = "flex"; // Zeigt die Drehwarnung an
    } else {
        rotateWarning.style.display = "none"; // Blendet die Drehwarnung aus
    }
}

// Event-Listener für Änderungen der Bildschirmgröße und Ausrichtung
window.addEventListener("resize", checkOrientation);
window.addEventListener("orientationchange", checkOrientation);
document.addEventListener("DOMContentLoaded", checkOrientation);

/**
 * Wird ausgeführt, wenn die Seite vollständig geladen ist.
 * Initialisiert die mobilen Steuerelemente.
 */
window.onload = () => {
    handleMobileControls();
    setupMobileControls();  
};

/**
 * Event-Listener für Tastendruck.
 * Aktualisiert den Zustand der Tasten im `keyboard`-Objekt.
 */
window.addEventListener("keydown", (event) => {
    if (event.keyCode == 39) keyboard.RIGHT = true; // Rechtspfeil
    if (event.keyCode == 37) keyboard.LEFT = true;  // Linkspfeil
    if (event.keyCode == 38) keyboard.UP = true;    // Aufwärtspfeil
    if (event.keyCode == 40) keyboard.DOWN = true;  // Abwärtspfeil
    if (event.keyCode == 32) keyboard.SPACE = true; // Leertaste
    if (event.keyCode == 68) keyboard.D = true;     // D-Taste
});

/**
 * Event-Listener für Tastenloslassen.
 * Aktualisiert den Zustand der Tasten im `keyboard`-Objekt.
 */
window.addEventListener("keyup", (event) => {
    if (event.keyCode == 39) keyboard.RIGHT = false; // Rechtspfeil
    if (event.keyCode == 37) keyboard.LEFT = false;  // Linkspfeil
    if (event.keyCode == 38) keyboard.UP = false;    // Aufwärtspfeil
    if (event.keyCode == 40) keyboard.DOWN = false;  // Abwärtspfeil
    if (event.keyCode == 32) keyboard.SPACE = false; // Leertaste
    if (event.keyCode == 68) keyboard.D = false;     // D-Taste
});	

/**
 * Initialisiert die mobilen Steuerelemente.
 * Fügt Event-Listener für Touch-Events hinzu, um die Tasten im `keyboard`-Objekt zu steuern.
 */
function setupMobileControls() {
    // Linker Button
    document.getElementById('left-btn').addEventListener('touchstart', () => keyboard.LEFT = true);
    document.getElementById('left-btn').addEventListener('touchend', () => keyboard.LEFT = false);

    // Rechter Button
    document.getElementById('right-btn').addEventListener('touchstart', () => keyboard.RIGHT = true);
    document.getElementById('right-btn').addEventListener('touchend', () => keyboard.RIGHT = false);

    // Sprung-Button
    document.getElementById('jump-btn').addEventListener('touchstart', () => keyboard.UP = true);
    document.getElementById('jump-btn').addEventListener('touchend', () => keyboard.UP = false);

    // Wurf-Button
    document.getElementById('throw-btn').addEventListener('touchstart', () => keyboard.D = true);
    document.getElementById('throw-btn').addEventListener('touchend', () => keyboard.D = false);
}