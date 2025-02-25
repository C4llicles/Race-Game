const cnv = document.getElementById('Game');
const context = cnv.getContext('2d');
const img_voiture = new Image();
img_voiture.src = 'car.png';
let x = (cnv.width - 70) / 2;
let y = (cnv.height - 110) / 2;

img_voiture.onload = function() {
    context.drawImage(img_voiture, x, y, 70, 110);
};

function move(dir) {
    switch (dir) {
        case 'right':
            x += 2;
            break;
        case 'left':
            x -= 2;
            break;
        case 'up':
            y -= 2;
            break;
        case 'down':
            y += 2;
            break;
    }
    context.clearRect(0, 0, cnv.width, cnv.height)
    context.drawImage(img_voiture, x, y, 70, 110);
}

addEventListener('keypress', function(event) {
    switch (event.key) {
        case 'd':
            move('right');
            break;
        case 'q':
            move('left');
            break;
        case 'z':
            move('up');
            break;
        case 's':
            move('down');
            break;
        
        }
    }
);