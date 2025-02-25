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

img_voiture.onload = function() {
    
};

img_circuit.onload = function() {
    context.drawImage(img_circuit, 0, 0, cnv.width, cnv.height);
}

function move() {
    if (keys['d']) targetX += 5;
    if (keys['q']) targetX -= 5;
    if (keys['z']) targetY -= 5;
    if (keys['s']) targetY += 5;
    x += (targetX - x) * 0.01;
    y += (targetY - y) * 0.01;
    context.clearRect(0, 0, cnv.width, cnv.height)
    context.drawImage(img_circuit, 0, 0, cnv.width, cnv.height);
    context.drawImage(img_voiture, x, y, 49, 77);
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