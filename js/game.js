
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let score = 0;
const scoreDisplay = document.getElementById("score");

let player = {
    x: 180,
    y: 500,
    width: 40,
    height: 40,
    vy: 0,
    jump: -12,
    gravity: 0.5
};

let platforms = [];
for (let i = 0; i < 7; i++) {
    platforms.push({
        x: Math.random() * 320,
        y: i * 90,
        width: 100,
        height: 10
    });
}

function drawPlayer() {
    ctx.fillStyle = "cyan";
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawPlatforms() {
    ctx.fillStyle = "lime";
    for (let plat of platforms) {
        ctx.fillRect(plat.x, plat.y, plat.width, plat.height);
    }
}

function update() {
    player.vy += player.gravity;
    player.y += player.vy;

    // اصطدام مع المنصات
    for (let plat of platforms) {
        if (
            player.x + player.width > plat.x &&
            player.x < plat.x + plat.width &&
            player.y + player.height > plat.y &&
            player.y + player.height < plat.y + player.vy + plat.height
        ) {
            player.vy = player.jump;
            score += 1;
            scoreDisplay.textContent = "Score: " + score;
        }
    }

    // صعود المنصات
    if (player.y < 300) {
        player.y = 300;
        for (let plat of platforms) {
            plat.y += Math.abs(player.vy);
            if (plat.y > canvas.height) {
                plat.y = 0;
                plat.x = Math.random() * 300;
            }
        }
    }

    // سقوط اللاعب
    if (player.y > canvas.height) {
        alert("Game Over! Final Score: " + score);
        document.location.reload();
    }
}

function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer();
    drawPlatforms();
    update();
    requestAnimationFrame(loop);
}

document.addEventListener("keydown", function(e) {
    if (e.code === "Space") {
        player.vy = player.jump;
    }
});

loop();
