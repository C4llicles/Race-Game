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






img_voiture.onload = function() {
};

img_circuit.onload = function() {
    context.drawImage(img_circuit, 0, 0, cnv.width, cnv.height);
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
    context.drawImage(img_circuit, x, y, cnv.width, cnv.height);

    // Save the context state
    context.save();

    // Translate to the center of the car and rotate
    context.translate(cnv.width / 2, cnv.height / 2);
    context.rotate(currentAngle);

    // Draw the car image
    context.drawImage(img_voiture, -49 / 2, -77 / 2, 49, 77);

    // Restore the context state
    context.restore();

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

function pause() {
    context.save();
    
};

addEventListener('keypress', function(event) {
    if (event.key === "p") {
        PauseGame = !PauseGame; // Basculer entre pause et reprise
        this.document.getElementById("pausemenu").style.display = PauseGame ? "block" : "none"; // Afficher ou masquer le menu de pause
    }
});

move();