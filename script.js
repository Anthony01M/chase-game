const player = document.getElementById('player');
const enemies = document.getElementsByClassName('enemy');
const game = document.getElementById('game');
const scoreDisplay = document.getElementById('score');
const gameWidth = game.clientWidth;
const gameHeight = game.clientHeight;

let playerX = 375;
let playerY = 275;
const playerSpeed = 5;
let score = 0;

document.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowUp':
            playerY = Math.max(0, playerY - playerSpeed);
            break;
        case 'ArrowDown':
            playerY = Math.min(gameHeight - player.clientHeight, playerY + playerSpeed);
            break;
        case 'ArrowLeft':
            playerX = Math.max(0, playerX - playerSpeed);
            break;
        case 'ArrowRight':
            playerX = Math.min(gameWidth - player.clientWidth, playerX + playerSpeed);
            break;
    }
    player.style.top = playerY + 'px';
    player.style.left = playerX + 'px';
});

function moveEnemies() {
    for (let enemy of enemies) {
        let enemyX = parseInt(enemy.style.left) || Math.random() * gameWidth;
        let enemyY = parseInt(enemy.style.top) || Math.random() * gameHeight;

        if (enemyX < playerX) {
            enemyX += 1;
        } else {
            enemyX -= 1;
        }

        if (enemyY < playerY) {
            enemyY += 1;
        } else {
            enemyY -= 1;
        }

        enemy.style.left = enemyX + 'px';
        enemy.style.top = enemyY + 'px';

        if (Math.abs(enemyX - playerX) < 50 && Math.abs(enemyY - playerY) < 50) {
            alert('Game Over! Your score: ' + score);
            score = 0;
            playerX = 375;
            playerY = 275;
            player.style.top = playerY + 'px';
            player.style.left = playerX + 'px';
            resetEnemies();
        }
    }
}

function resetEnemies() {
    for (let enemy of enemies) {
        enemy.style.left = Math.random() * (gameWidth - 50) + 'px';
        enemy.style.top = Math.random() * (gameHeight - 50) + 'px';
    }
}

function updateScore() {
    score++;
    scoreDisplay.textContent = 'Score: ' + score;
}

setInterval(moveEnemies, 30);
setInterval(updateScore, 1000);

document.addEventListener('DOMContentLoaded', function () {
    const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#000000', '#FF5733', '#FF8C00', '#FFD700', '#ADFF2F', '#00FF7F', '#00CED1', '#1E90FF', '#9370DB', '#FF1493', '#000000'];
    let colorIndex = 0;

    setInterval(() => {
        document.body.style.backgroundColor = colors[colorIndex];
        colorIndex = (colorIndex + 1) % colors.length;
    }, 5000);
});