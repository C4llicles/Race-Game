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

let chronoActive = false;
let chronoStartTime = 0;
let chronoElapsedTime = 0;

let lineCooldown = false;
let checkpoints = false;
let started = false; // Variable pour vérifier si le jeu a commencé

const tileWidth = 100;
const tileHeight = 100;

const defaultMap = [["Default"],[
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1],
    [1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1],
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1],
    [1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 3, 3, 1],
    [1, 1, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
    [1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 1],
    [1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 1, 1],
    [1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 1],
    [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
]];

const newMap = [["New"],[
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 1, 1, 1, 1, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 1, 3, 3, 1],
    [1, 2, 2, 1, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 1, 1, 1, 1, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
]];

const Map2 = [["2"],[
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
    [1, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
    [1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1],
    [1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1],
    [1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1],
    [1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1],
    [1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1],
    [1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1],
    [1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1],
    [1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 0, 0, 3, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 0, 0, 3, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
]]

let map_1 = defaultMap; // Utiliser la carte par défaut

const img_grass = new Image();
img_grass.src = 'grass.webp';
const img_bet = new Image();
img_bet.src = 'bet.jpg';
const img_line = new Image();
img_line.src = 'line.jpg';
const img_checkpoint = new Image();
img_checkpoint.src = 'check.webp';
const liste_images = [img_bet, img_grass, img_line, img_checkpoint]; // Liste des images

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
        this.img = liste_images[type];
        this.type = type;
    }
}

function drawMap(map_1, modx, mody) {
    // Dessiner la carte en fonction des coordonnées et du type de tuile
    for (let i = 0; i < map_1[1].length; i++) {
        for (let j = 0; j < map_1[1][i].length; j++) {
            const tile = new Tile(j * tileWidth + modx, i * tileHeight + mody, map_1[1][i][j]);
            context.drawImage(tile.img, tile.x, tile.y, tile.width, tile.height);
        }
    }
}

img_voiture.onload = function() {
    // Dessiner la voiture initialement
    context.drawImage(img_voiture, x, y, 49, 77);
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

function drawChrono() {
    // Afficher le chrono
    context.font = "20px Arial";
    context.fillStyle = "red"; // Couleur rouge
    const time = chronoActive ? (Date.now() - chronoStartTime) / 1000 : chronoElapsedTime / 1000;
    context.fillText(`Chrono: ${time.toFixed(2)}s`, cnv.width - 150, 30);
}

function toggleChrono() {
    // Activer ou désactiver le chrono
    if (chronoActive && checkpoints) {
        chronoActive = false;
        chronoElapsedTime = (Date.now() - chronoStartTime) / 1000;
        let commetuveuxjteconseilformdata = new FormData();
        commetuveuxjteconseilformdata.append("name", map_1[0][0]); // Remplacez par le nom du joueur
        console.log("Temps envoyé :", chronoElapsedTime);
        commetuveuxjteconseilformdata.append("temps",chronoElapsedTime.toFixed(2));
        fetch("send.php", {
            method: "POST",
            body: commetuveuxjteconseilformdata,
        });
        console.log("Chrono arrêté à : " + chronoElapsedTime);
    } else if (!started) {
        started = true; // Le jeu a commencé
        chronoActive = true;
        chronoStartTime = Date.now();
    }
}

function toggleChronoWithCooldown() {
    // Activer ou désactiver le chrono avec un délai
    if (lineCooldown) return;

    toggleChrono();
    lineCooldown = true;
    setTimeout(() => {
        lineCooldown = false;
    }, 1000); // Délai de 1 seconde
}

function checkCollision(newX, newY) {
    // Vérifier la collision avec une tuile d'herbe
    const tileX = Math.abs(Math.floor(((newX / tileWidth) - 5)));
    const tileY = Math.abs(Math.floor((newY / tileHeight) - 2));
    if (map_1[1][tileY] && map_1[1][tileY][tileX] === 1) {
        console.log("Collision détectée : La voiture est sur une tuile d'herbe !");
        currentSpeed *= 0.8; // Réduire légèrement la vitesse
        return true; // Collision détectée
    }
    return false; // Pas de collision
}

function checkLineCollision(newX, newY) {
    // Vérifier la collision avec une ligne spéciale
    const tileX = Math.abs(Math.floor(((newX / tileWidth) - 5)));
    const tileY = Math.abs(Math.floor((newY / tileHeight) - 2));
    if (map_1[1][tileY] && map_1[1][tileY][tileX] === 2) { // Ligne spéciale
        toggleChronoWithCooldown();
        return true;
    }
    return false;
}

function checkCheckpointCollision(newX, newY) {
    // Vérifier la collision avec un checkpoint
    const tileX = Math.abs(Math.floor(((newX / tileWidth) - 5)));
    const tileY = Math.abs(Math.floor((newY / tileHeight) - 2));
    if (map_1[1][tileY] && map_1[1][tileY][tileX] === 3) { // Checkpoint
        return true;
    }
    return false;
}

function move() {
    // Gérer le mouvement de la voiture
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

    // Calculer l'angle de rotation
    const dx = targetX - x;
    const dy = targetY - y;
    const targetAngle = Math.atan2(dy, dx) - Math.PI / 2;

    // Ajuster progressivement l'angle actuel vers l'angle cible
    let angleDifference = targetAngle - currentAngle;

    // S'assurer que la différence d'angle prend le chemin le plus court
    if (angleDifference > Math.PI) {
        angleDifference -= 2 * Math.PI;
    } else if (angleDifference < -Math.PI) {
        angleDifference += 2 * Math.PI;
    }

    // Limiter la vitesse de rotation
    angleDifference = Math.max(-maxRotationSpeed, Math.min(maxRotationSpeed, angleDifference));

    currentAngle += angleDifference;

    // Normaliser l'angle pour rester dans [0, 2 * Math.PI]
    currentAngle = (currentAngle + 2 * Math.PI) % (2 * Math.PI);

    x += dx * 0.01;
    y += dy * 0.01;

    // Analyser la tuile sur laquelle se trouve la voiture
    if (checkCollision(x, y)) {
        // Collision détectée
    }

    if (checkLineCollision(x, y)) {
        // Ligne touchée
    }

    if (checkCheckpointCollision(x, y)) {
        checkpoints = true; // Activer le drapeau de checkpoint
    }

    context.clearRect(0, 0, cnv.width, cnv.height);
    draw(x, y, map_1); // Dessiner la carte avec les nouvelles coordonnées
    drawChrono(); // Dessiner le chrono

    requestAnimationFrame(move);
}

addEventListener('keydown', function(event) {
    // Gérer les touches pressées
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
});

addEventListener('keyup', function(event) {
    // Gérer les touches relâchées
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
});

function resume() {
    // Reprendre le jeu
    PauseGame = false;
    this.document.getElementById("pausemenu").style.display = "none"; // Masquer le menu de pause
}

addEventListener('keypress', function(event) {
    // Gérer la pause et la reprise avec la touche "p"
    if (event.key === "p") {
        PauseGame = !PauseGame; // Basculer entre pause et reprise
        this.document.getElementById("pausemenu").style.display = PauseGame ? "block" : "none"; // Afficher ou masquer le menu de pause
    }
});

move();
