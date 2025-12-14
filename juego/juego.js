const gameArea = document.getElementById("game-area");
const totoro = document.getElementById("totoro");
const scoreText = document.getElementById("score");
const livesText = document.getElementById("lives");

let score = 0;
let lives = 3;
let totoroX = 260;

// Movimiento con teclado
document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") totoroX -= 30;
    if (e.key === "ArrowRight") totoroX += 30;

    totoroX = Math.max(0, Math.min(520, totoroX));
    totoro.style.left = totoroX + "px";
});

// Touch para celular
gameArea.addEventListener("touchmove", (e) => {
    let touchX = e.touches[0].clientX - gameArea.offsetLeft;
    totoroX = touchX - 40;
    totoro.style.left = totoroX + "px";
});

function createStar() {
    const star = document.createElement("img");
    star.src = "img/estrella.png";
    star.classList.add("star");
    star.style.left = Math.random() * 560 + "px";
    gameArea.appendChild(star);

    let starY = 0;

    const fall = setInterval(() => {
        starY += 4;
        star.style.top = starY + "px";

        const totoroRect = totoro.getBoundingClientRect();
        const starRect = star.getBoundingClientRect();

        if (
            starRect.bottom >= totoroRect.top &&
            starRect.left < totoroRect.right &&
            starRect.right > totoroRect.left
        ) {
            score++;
            scoreText.textContent = "Puntaje: " + score;
            star.remove();
            clearInterval(fall);
        }

        if (starY > 380) {
            lives--;
            livesText.textContent = "Vidas: " + "❤️".repeat(lives);
            star.remove();
            clearInterval(fall);

            if (lives === 0) {
                alert("El bosque perdió su energía 🌱");
                location.reload();
            }
        }
    }, 30);
}

setInterval(createStar, 1500);

