const cnv = document.getElementById('Game');
const context = cnv.getContext('2d');

// Images
const img_voiture = new Image();
img_voiture.src = 'car.png';
const img_grass = new Image();
img_grass.src = 'grass.webp';
const img_bet = new Image();
img_bet.src = 'bet.jpeg';
const liste_images = [img_bet, img_grass];

// Map and tile configuration
const tileWidth = 50;
const tileHeight = 50;
let map_1 = generateRandomMap(50, 50);

// Movement and game state
let modx = 0, mody = 0;
let keys = { 'z': false, 'q': false, 's': false, 'd': false };
let currentAngle = 0, currentSpeed = 0;
const maxSpeed = 10, acceleration = 0.05, deceleration = 0.01, maxRotationSpeed = 0.05;
let PauseGame = false;

// Generate a random map
function generateRandomMap(rows, cols) {
    const map = [];
    for (let i = 0; i < rows; i++) {
        const row = [];
        for (let j = 0; j < cols; j++) {
            row.push(Math.floor(Math.random() * 2)); // 0: road, 1: wall
        }
        map.push(row);
    }
    return map;
}

// Draw the map with offsets
function drawMap(map, modx, mody) {
    for (let i = 0; i <= Math.ceil(cnv.height / tileHeight); i++) {
        for (let j = 0; j <= Math.ceil(cnv.width / tileWidth); j++) {
            const tileRow = (Math.floor((i - Math.floor(mody / tileHeight)) + map.length) % map.length);
            const tileCol = (Math.floor((j - Math.floor(modx / tileWidth)) + map[0].length) % map[0].length);
            const tileX = j * tileWidth - (modx % tileWidth);
            const tileY = i * tileHeight - (mody % tileHeight);
            context.drawImage(liste_images[map[tileRow][tileCol]], tileX, tileY, tileWidth, tileHeight);
        }
    }
}

// Main game loop
function move() {
    if (PauseGame) {
        requestAnimationFrame(move);
        return;
    }

    // Handle acceleration and deceleration
    if (keys['z'] || keys['q'] || keys['s'] || keys['d']) {
        currentSpeed = Math.min(currentSpeed + acceleration, maxSpeed);
    } else {
        currentSpeed = Math.max(currentSpeed - deceleration, 0);
    }

    // Update offsets based on keys
    if (keys['d']) modx -= currentSpeed;
    if (keys['q']) modx += currentSpeed;
    if (keys['z']) mody += currentSpeed;
    if (keys['s']) mody -= currentSpeed;

    // Clear canvas and redraw map
    context.clearRect(0, 0, cnv.width, cnv.height);
    drawMap(map_1, modx, mody);

    // Draw the car at the center of the canvas
    context.save();
    context.translate(cnv.width / 2, cnv.height / 2);
    context.rotate(currentAngle);
    context.drawImage(img_voiture, -49 / 2, -77 / 2, 49, 77);
    context.restore();

    requestAnimationFrame(move);
}

// Resume game
function resume() {
    PauseGame = false;
    document.getElementById("pausemenu").style.display = "none";
}

// Event listeners
addEventListener('keydown', (event) => {
    if (keys.hasOwnProperty(event.key)) keys[event.key] = true;
});

addEventListener('keyup', (event) => {
    if (keys.hasOwnProperty(event.key)) keys[event.key] = false;
});

addEventListener('keypress', (event) => {
    if (event.key === "p") {
        PauseGame = !PauseGame;
        document.getElementById("pausemenu").style.display = PauseGame ? "block" : "none";
    }
});

// Start the game loop when images are loaded
img_bet.onload = img_grass.onload = () => move();