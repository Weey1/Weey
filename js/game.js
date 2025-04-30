
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let player = { x: 150, y: 400, width: 30, height: 30, vy: 0, jump: -10, gravity: 0.5 };
let platforms = [{ x: 100, y: 450, width: 120, height: 10 }];

function drawPlayer() {
    ctx.fillStyle = "cyan";
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawPlatforms() {
    ctx.fillStyle = "lime";
    platforms.forEach(p => ctx.fillRect(p.x, p.y, p.width, p.height));
}

function update() {
    player.vy += player.gravity;
    player.y += player.vy;

    if (player.y + player.height > canvas.height) {
        player.y = canvas.height - player.height;
        player.vy = player.jump;
    }

    platforms.forEach(p => {
        if (player.x < p.x + p.width &&
            player.x + player.width > p.x &&
            player.y + player.height < p.y + p.height &&
            player.y + player.height + player.vy >= p.y) {
            player.vy = player.jump;
        }
    });
}

function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlatforms();
    drawPlayer();
    update();
    requestAnimationFrame(loop);
}

document.addEventListener("keydown", function(e) {
    if (e.code === "Space") {
        player.vy = player.jump;
    }
});

loop();
