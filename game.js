const canvas = document.querySelector('.pantalla-maps');
const game = canvas.getContext('2d');

window.addEventListener('load',responsive);
window.addEventListener('resize',responsive);
let canvaSizes;
let elemento;
function startGame() {
    
   console.log({canvaSizes, elemento});
    // para hacer que el emoji cresca ala medida de la pantalla 
    game.font = elemento +'px Verdana';
    game.textAlign = 'end';
   
    // la idea es agregar varios niveles obteniendolos de nuestro documento maps.js
    const map = maps[1 ];
    const mapRow = map.trim().split('\n');
    const mapcol =mapRow.map(row => row.trim() .split(''));
    console.log({map, mapRow, mapcol})
    // crear varios emoji automaticamente
     for( var row = 1; row <= 10; row++){
        for(var col = 1; col <= 10; col++){
         game.fillText(emojis[mapcol[row-1] [col-1]], 
            elemento * col, elemento*row);
        }
     }
   
}

function responsive (){
  
    if (window.innerHeight > window.innerWidth) {
        canvaSizes = window.innerWidth * 0.8;
    
        }
        else {
            canvaSizes = window.innerHeight * 0.8;
        }
        
        canvas.setAttribute('width',canvaSizes);
        canvas.setAttribute('height',canvaSizes);
        // divide el   espacio adentro de nuestro canvas  en 10, depende de nuestra medida 
         elemento = canvaSizes / 10;
         startGame()
}