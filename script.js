// Calculator functionality
let display = document.getElementById("display");

function appendToDisplay(value) {
    display.value += value;
}

function clearDisplay() {
    display.value = "";
}

function calculate() {
    try {
        const result = eval(display.value);
        display.value = result;
        
        // Secret game trigger
        if (display.value === "1337") {
            startGame();
        }
    } catch (error) {
        display.value = "Error";
    }
}

// Game functionality
function startGame() {
    document.body.innerHTML = `
        <div class="game">
            <h1>SECRET RPG UNLOCKED!</h1>
            <p>Use calculator buttons: 8=Up, 4=Left, 5=Down, 6=Right</p>
            <p>Click enemies to attack!</p>
            <button onclick="location.reload()">Back to Calculator</button>
            <canvas id="gameCanvas" width="400" height="400"></canvas>
        </div>
    `;

    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");

    // Game objects
    const player = {
        x: 200,
        y: 200,
        size: 20,
        speed: 5,
        color: "#3498db"
    };

    const enemy = {
        x: 100,
        y: 100,
        size: 25,
        color: "#e74c3c",
        health: 3
    };

    // Game state
    let score = 0;
    let keys = {};

    // Keyboard input (calculator buttons as controls)
    document.addEventListener("keydown", (e) => {
        if (e.key === "8") keys.up = true;     // 8 = Up
        if (e.key === "4") keys.left = true;   // 4 = Left
        if (e.key === "5") keys.down = true;   // 5 = Down
        if (e.key === "6") keys.right = true;  // 6 = Right
    });

    document.addEventListener("keyup", (e) => {
        if (e.key === "8") keys.up = false;
        if (e.key === "4") keys.left = false;
        if (e.key === "5") keys.down = false;
        if (e.key === "6") keys.right = false;
    });

    // Mouse click attack
    canvas.addEventListener("click", (e) => {
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        // Check if click hit enemy
        const dist = Math.sqrt(
            Math.pow(mouseX - enemy.x, 2) + 
            Math.pow(mouseY - enemy.y, 2)
        );
        if (dist < enemy.size) {
            enemy.health--;
            score += 10;
            if (enemy.health <= 0) {
                enemy.x = Math.random() * (canvas.width - 40) + 20;
                enemy.y = Math.random() * (canvas.height - 40) + 20;
                enemy.health = 3;
            }
        }
    });

    function gameLoop() {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Update player position
        if (keys.up) player.y -= player.speed;
        if (keys.left) player.x -= player.speed;
        if (keys.down) player.y += player.speed;
        if (keys.right) player.x += player.speed;

        // Boundary check
        player.x = Math.max(player.size, Math.min(canvas.width - player.size, player.x));
        player.y = Math.max(player.size, Math.min(canvas.height - player.size, player.y));

        // Draw player
        ctx.fillStyle = player.color;
        ctx.beginPath();
        ctx.arc(player.x, player.y, player.size, 0, Math.PI * 2);
        ctx.fill();

        // Draw enemy
        ctx.fillStyle = enemy.color;
        ctx.beginPath();
        ctx.arc(enemy.x, enemy.y, enemy.size, 0, Math.PI * 2);
        ctx.fill();

        // Draw UI
        ctx.fillStyle = "#333";
        ctx.font = "16px Arial";
        ctx.fillText(`Score: ${score}`, 20, 30);
        ctx.fillText(`Enemy HP: ${enemy.health}`, 20, 60);

        requestAnimationFrame(gameLoop);
    }

    gameLoop();
}
