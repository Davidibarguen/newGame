const canvas = document.querySelector('.pantalla-maps');
const game = canvas.getContext('2d');

window.addEventListener('load', startGame);

function startGame() {
    let canvaSizes;
    if (window.innerHeight > window.innerWidth) {
    canvaSizes = window.innerWidth * 0.6;

    }
    else {
        canvaSizes = window.innerHeight * 0.6;
    }
    canvas.setAttribute('width',canvaSizes);
    canvas.setAttribute('height',canvaSizes);
    const elemeton = canvaSizes / 10;

    console.log({canvaSizes, elemeton});
    game.fillText(emojis['X'],100,100);
    game.font = elemeton + 'px Verdana ';
}