/**
 * Gibt das HTML-Template für den Endbildschirm zurück.
 * Das Template zeigt entweder einen Gewinn- oder Verlustbildschirm an, abhängig vom Spielergebnis.
 * 
 * @param {boolean} hasWon - Gibt an, ob der Spieler gewonnen hat.
 * @returns {string} - Das HTML-Template für den Endbildschirm.
 */
function getEndscreenTemplate(hasWon) {
    return /* html */ `
        <div id="endscreen" class="endscreen">
            <!-- Bild für den Endbildschirm (Gewinn oder Verlust) -->
            <img src="${hasWon ? 'img/9_intro_outro_screens/win/won_2.png' : 'img/9_intro_outro_screens/game_over/you lost.png'}" class="endscreen-img">
            
            <!-- Container für die Buttons -->
            <div class="button-container">
                <!-- Button zum Neustarten des Spiels -->
                <button class="btn" onclick="restartGame()">Neustarten</button>
                
                <!-- Button zum Zurückkehren zum Startbildschirm -->
                <button class="btn" onclick="goToStartScreen()">Zum Start</button>
            </div>
        </div>
    `;
}