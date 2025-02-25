// Sélectionne le canvas et obtient son contexte 2D
const cnv = document.getElementById('Game');
const context = cnv.getContext('2d');

// Crée une nouvelle image et définit sa source
const img_voiture = new Image();
img_voiture.src = 'car.png';

// Définit les positions initiales de la voiture
let x = (cnv.width - 70) / 2;
let y = (cnv.height - 110) / 2;
let targetX = x;
let targetY = y;

// Objet pour suivre les touches enfoncées
let keys = {};

// Lorsque l'image est chargée, dessine la voiture à sa position initiale
img_voiture.onload = function() {
    context.drawImage(img_voiture, x, y, 70, 110);
};

// Fonction d'animation qui met à jour la position de la voiture
function animate() {
    // Met à jour les positions cibles en fonction des touches enfoncées
    if (keys['d']) targetX += 5;
    if (keys['q']) targetX -= 5;
    if (keys['z']) targetY -= 5;
    if (keys['s']) targetY += 5;

    // Transition douce vers les positions cibles
    x += (targetX - x) * 0.01;
    y += (targetY - y) * 0.01;

    // Efface le canvas et redessine la voiture à la nouvelle position
    context.clearRect(0, 0, cnv.width, cnv.height);
    context.drawImage(img_voiture, x, y, 70, 110);

    // Demande une nouvelle frame d'animation
    requestAnimationFrame(animate);
}

// Ajoute des écouteurs d'événements pour détecter les touches enfoncées
addEventListener('keydown', function(event) {
    keys[event.key] = true;
});

// Ajoute des écouteurs d'événements pour détecter les touches relâchées
addEventListener('keyup', function(event) {
    keys[event.key] = false;
});

// Démarre l'animation
animate();