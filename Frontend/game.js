const cnv = document.getElementById('Game');
const context = cnv.getContext('2d');
const img_voiture = new Image();
img_voiture.src = 'car.png';

img_voiture.onload = function() {
    context.drawImage(img_voiture, 50, 50, 70, 110);
};

function move(dir) {
    switch (dir) {
        case 'right':
            context.clearRect(0, 0, cnv.width, cnv.height)
            context.drawImage(img_voiture, 100, 50, 70, 110);
            break;
        case 'left':
            context.clearRect(0, 0, cnv.width, cnv.height)
            context.drawImage(img_voiture, 150, 50, 70, 110);
            break;
    }
}

addEventListener('keypress', function(event) {
    if (event.key === 'ArrowRight') {
        move('right');
    } else if (event.key === 'q') {
        move('left');
    }
});