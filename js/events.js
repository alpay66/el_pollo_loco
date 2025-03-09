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
