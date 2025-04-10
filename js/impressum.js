function toggleImpressum() {
    const impressum = document.getElementById("impressum");
    const currentDisplay = window.getComputedStyle(impressum).display;

    if (currentDisplay === "none") {
        impressum.style.display = "block";
    } else {
        impressum.style.display = "none";
    }
}
