// Elementos principales
const gameArea = document.getElementById("game-area");
const totoro = document.getElementById("totoro");
const scoreText = document.getElementById("score");
const livesText = document.getElementById("lives");
const startBtn = document.getElementById("start-btn");
const gameOverDiv = document.getElementById("game-over");
const gameOverText = document.getElementById("game-over-text");

// Variables del juego
let score = 0;
let lives = 3;
let totoroX = 260;
let gameInterval;
let active = false; // controla si el juego está activo

// Movimiento teclado
document.addEventListener("keydown", (e) => {
    if (!active) return; // si no empezó el juego no mover
    if (e.key === "ArrowLeft") totoroX -= 10;
    if (e.key === "ArrowRight") totoroX += 10;
    totoroX = Math.max(0, Math.min(gameArea.offsetWidth - 80, totoroX)); 
    totoro.style.left = totoroX + "px";
});

// Movimiento táctil
gameArea.addEventListener("touchmove", (e) => {
    if (!active) return;
    let touchX = e.touches[0].clientX - gameArea.offsetLeft;
    totoroX = Math.max(0, Math.min(gameArea.offsetWidth - 80, touchX - 40));
    totoro.style.left = totoroX + "px";
});

// Crear estrella
function createStar() {
    if (!active) return;

    const star = document.createElement("img");
    star.src = "img/estrella.png";
    star.classList.add("star");
    star.style.position = "absolute";
    star.style.left = Math.random() * (gameArea.offsetWidth - 40) + "px";
    star.style.top = "0px";
    gameArea.appendChild(star);

    let starY = 0;

    const fall = setInterval(() => {
        if (!active) {
            clearInterval(fall);
            return;
        }
        starY += 2;
        star.style.top = starY + "px";

        // Obtener posición relativa dentro del contenedor
        const totoroLeft = totoro.offsetLeft;
        const totoroRight = totoroLeft + totoro.offsetWidth;
        const totoroTop = totoro.offsetTop;
        const totoroBottom = totoroTop + totoro.offsetHeight;

        const starLeft = star.offsetLeft;
        const starRight = starLeft + star.offsetWidth;
        const starTop = starY;
        const starBottom = starTop + star.offsetHeight;

        const COLLISION_MARGIN = 15; // margen extra para facilitar la colisión

        // Colisión con margen
        if (
            starBottom >= totoroTop - COLLISION_MARGIN &&
            starTop <= totoroBottom + COLLISION_MARGIN &&
            starRight >= totoroLeft - COLLISION_MARGIN &&
            starLeft <= totoroRight + COLLISION_MARGIN
        ) {
            score++;
            scoreText.textContent = "Puntaje: " + score;
            star.remove();
            clearInterval(fall);

            if (score >= 40) {
                endGame(true);
            }
        }


        // Tocó el suelo
        if (starY > gameArea.offsetHeight - star.offsetHeight) {
            lives--;
            livesText.textContent = "Vidas: " + "♡".repeat(lives);
            star.remove();
            clearInterval(fall);

            if (lives === 0) {
                endGame(false);
            }
        }

    }, 30);
}


// Función para iniciar / reiniciar
function startGame() {
    score = 0;
    lives = 3;
    totoroX = 260;
    scoreText.textContent = "Puntaje: 0";
    livesText.textContent = "Vidas: ♡♡♡";
    gameOverText.textContent = " "
    gameOverDiv.style.display = "none";
    startBtn.disabled = true; // se desactiva al empezar
    active = true;

    // Limpiar todas las estrellas existentes del área de juego
    const gameArea = document.getElementById('game-area');
    const stars = gameArea.querySelectorAll('.star');
    stars.forEach(star => star.remove());

    // Generar estrellas cada 1.5s
    gameInterval = setInterval(createStar, 1500);
}

// Función para terminar juego
function endGame(win) {
    active = false;
    clearInterval(gameInterval);
    gameOverText.textContent = win ? "¡Ganaste! :3" : "¡Perdiste! :(((";
    gameOverDiv.style.display = "flex";
    startBtn.textContent = "Reiniciar";
    startBtn.disabled = false;
}

// Botón de empezar/reiniciar
startBtn.addEventListener("click", startGame);
