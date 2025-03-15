function checkOrientation() {
    let rotateWarning = document.getElementById("rotate-warning");
    if (window.innerHeight > window.innerWidth && window.innerWidth <= 920) {
        rotateWarning.style.display = "flex";
    } else {
        rotateWarning.style.display = "none";
    }
}

window.addEventListener("resize", checkOrientation);
window.addEventListener("orientationchange", checkOrientation);
document.addEventListener("DOMContentLoaded", checkOrientation);

window.onload = () => {
    handleMobileControls();
    setupMobileControls();  
};

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