/**
 * Schaltet die Sichtbarkeit des Impressums um (ein-/ausblenden).
 * Überprüft den aktuellen Anzeigestatus des Impressum-Elements und kehrt ihn um.
 * Wenn das Impressum ausgeblendet ist, wird es angezeigt und umgekehrt.
 */
function toggleImpressum() {
    const impressum = document.getElementById("impressum");
    const currentDisplay = window.getComputedStyle(impressum).display;

    if (currentDisplay === "none") {
        impressum.style.display = "block";
    } else {
        impressum.style.display = "none";
    }
}
