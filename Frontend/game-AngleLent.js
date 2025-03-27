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

img_voiture.onload = function() {
};

img_circuit.onload = function() {
    context.drawImage(img_circuit, 0, 0, cnv.width, cnv.height);
}

function move() {
    if (keys['d']) targetX -= 5;
    if (keys['q']) targetX += 5;
    if (keys['z']) targetY += 5;
    if (keys['s']) targetY -= 5;

    // Calculate the angle of rotation
    const dx = targetX - x;
    const dy = targetY - y;
    angle = Math.atan2(dy, dx);
    angle -= 90;

    x += dx * 0.01;
    y += dy * 0.01;

    context.clearRect(0, 0, cnv.width, cnv.height);
    context.drawImage(img_circuit, x, y, cnv.width, cnv.height);

    // Save the context state
    context.save();

    // Translate to the center of the car and rotate
    context.translate(cnv.width / 2, cnv.height / 2);
    context.rotate(angle);

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

move();