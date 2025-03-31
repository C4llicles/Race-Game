const cnv = document.getElementById('Game');
const context = cnv.getContext('2d');
const img_voiture = new Image();
img_voiture.src = 'car.png';
const img_circuit = new Image();
img_circuit.src = 'circuit.png';
let x = (cnv.width - 70) / 2;
let y = (cnv.height - 110) / 2;
let targetX = x;
let targetY = y;
let keys = {'z': false,'q': false,'s': false,'d': false};
let currentAngle = 0;
let currentSpeed = 0; // Vitesse actuelle
const maxSpeed = 10; // Vitesse maximale
const acceleration = 0.05; // Accélération progressive
const deceleration = 0.01; // Décélération progressive
const maxRotationSpeed = 0.05; // Limite maximale de rotation par frame (en radians)
let PauseGame = false; // Variable pour contrôler la pause

const tileWidth = 100;
const tileHeight = 100;
let map_1 = generateRandomMap(50, 50);

const img_grass = new Image();
img_grass.src = 'grass.webp';
const img_bet = new Image();
img_bet.src = 'bet.jpg';
const liste_images = [img_bet, img_grass];

// Assurez-vous que toutes les images sont chargées avant de dessiner la carte
let imagesLoaded = 0;
const totalImages = liste_images.length;

liste_images.forEach((img) => {
    img.onload = () => {
        imagesLoaded++;
        if (imagesLoaded === totalImages) {
            // Toutes les images sont chargées, dessinez la carte
            context.clearRect(0, 0, cnv.width, cnv.height);
            drawMap(map_1, 0, 0); // Dessiner la carte initiale
        }
    };
});

class Tile {
    constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.width = tileWidth;
        this.height = tileHeight;
        this.img = liste_images[type]; // 0: road, 1: wall
        this.type = type; // 0: road, 1: wall
    }
}

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

map_1 = generateRandomMap(50, 50);

function drawMap(map_1, modx, mody) {
    for (let i = 0; i < map_1.length; i++) {
        for (let j = 0; j < map_1[i].length; j++) {
            const tile = new Tile(j * tileWidth + modx, i * tileHeight + mody, map_1[i][j]);
            context.drawImage(tile.img, tile.x, tile.y, tile.width, tile.height);
        }
    }
}

img_voiture.onload = function() {
    context.drawImage(img_voiture, x, y, 49, 77); // Dessiner la voiture initialement
};

function draw(x, y, map_1) {
    // Effacer le canvas
    context.clearRect(0, 0, cnv.width, cnv.height);

    // Dessiner la carte
    drawMap(map_1, x, y);

    // Dessiner la voiture
    context.save();
    context.translate(cnv.width / 2, cnv.height / 2);
    context.rotate(currentAngle);
    context.drawImage(img_voiture, -49 / 2, -77 / 2, 49, 77);
    context.restore();
}

function move() {
    if (PauseGame) {
        requestAnimationFrame(move); // Continuer à vérifier si le jeu est en pause
        return; // Arrêter l'exécution de la logique du jeu
    }

    // Gérer l'accélération et la décélération
    if (keys['z'] || keys['q'] || keys['s'] || keys['d']) {
        currentSpeed = Math.min(currentSpeed + acceleration, maxSpeed); // Augmenter la vitesse jusqu'à maxSpeed
    } else {
        currentSpeed = Math.max(currentSpeed - deceleration, 0); // Réduire la vitesse progressivement
    }

    if (keys['d']) targetX -= currentSpeed;
    if (keys['q']) targetX += currentSpeed;
    if (keys['z']) targetY += currentSpeed;
    if (keys['s']) targetY -= currentSpeed;

    // Calculate the angle of rotation
    const dx = targetX - x;
    const dy = targetY - y;
    const targetAngle = Math.atan2(dy, dx) - Math.PI / 2;

    // Smoothly adjust the current angle towards the target angle
    let angleDifference = targetAngle - currentAngle;

    // Ensure the angle difference takes the shortest path
    if (angleDifference > Math.PI) {
        angleDifference -= 2 * Math.PI;
    } else if (angleDifference < -Math.PI) {
        angleDifference += 2 * Math.PI;
    }

    // Limiter la vitesse de rotation
    angleDifference = Math.max(-maxRotationSpeed, Math.min(maxRotationSpeed, angleDifference));

    currentAngle += angleDifference;

    // Normalize the angle to stay within [0, 2 * Math.PI]
    currentAngle = (currentAngle + 2 * Math.PI) % (2 * Math.PI);

    x += dx * 0.01;
    y += dy * 0.01;

    context.clearRect(0, 0, cnv.width, cnv.height);
    draw(x, y, map_1); // Dessiner la carte avec les nouvelles coordonnées

    requestAnimationFrame(move);
}

addEventListener('keydown', function(event) {
    if (event.key === 'z') {
        keys['z'] = true;
    }
    if (event.key === 'q') {
        keys['q'] = true;
    }
    if (event.key === 's') {
        keys['s'] = true;
    }
    if (event.key === 'd') {
        keys['d'] = true;
    }
}
);

addEventListener('keyup', function(event) {
    if (event.key === 'z') {
        keys['z'] = false;
    }
    if (event.key === 'q') {
        keys['q'] = false;
    }
    if (event.key === 's') {
        keys['s'] = false;
    }
    if (event.key === 'd') {
        keys['d'] = false;
    }
}
);

addEventListener('keypress', function(event) {
    if (event.key === "p") {
        PauseGame = !PauseGame; // Basculer entre pause et reprise
        this.document.getElementById("pausemenu").style.display = PauseGame ? "block" : "none"; // Afficher ou masquer le menu de pause
    }
});

move();