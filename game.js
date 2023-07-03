const canvas = document.querySelector('.pantalla-maps');
const game = canvas.getContext('2d');
const op = document.querySelector('.top');
const right = document.querySelector('.right');
const left = document.querySelector('.left');
const down = document.querySelector('.down');
const positionplayer={
    x: undefined,
    y: undefined,
}
window.addEventListener('load',responsive);
window.addEventListener('resize',responsive);
let canvaSizes;
let elemento;
function startGame() {
    
   console.log({canvaSizes, elemento});
    // para hacer que el emoji cresca ala medida de la pantalla 
    game.font = elemento +'px Verdana';
    game.textAlign = 'end';
    game.clearRect(0, 0, canvaSizes, canvaSizes);
    // la idea es agregar varios niveles obteniendolos de nuestro documento maps.js
    const map = maps[0];
    const mapRow = map.trim().split('\n');
    const mapcol =mapRow.map(row => row.trim() .split(''));
    console.log({map, mapRow, mapcol})
    // crear varios emoji automaticamente
    mapcol.forEach((row,rowI )=> {
        row.forEach((col,coliI) => {
         const emoji =emojis[col];
         const posX = elemento * (coliI+1) 
         const posY = elemento * (rowI+1) 
         if (col == 'O'){
            if(!positionplayer.y && !positionplayer.x){
            positionplayer.x = posX;
            positionplayer.y = posY;
            console.log({positionplayer});
           }
         }
         game.fillText(emoji,posX,posY);
         
        })
        
    })
   moveplayer();
}
function moveplayer() {
    game.fillText(emojis['PLAYER'],positionplayer.x,positionplayer.y);
    
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
// empesamos con el movimiento de nuestro personaje 

op.addEventListener('click',movetop);
right.addEventListener('click',moveright);
left.addEventListener('click',moveleft);
down.addEventListener('click',movedown);
window.addEventListener('keydown',moveBykey);
window.focus();
function moveBykey(event){
    switch (event.key ) {
        case 'ArrowUp':
            movetop();
            break;
        case 'ArrowDown':
            movedown();
            break;
        case 'ArrowLeft':
            moveleft();
            break;
        case 'ArrowRight':
            moveright();
            break;
    
        default:
            console.log('preciona la teclas de direccion')
            break;
    }
    console.log(event);
}
function movetop() {
 if (( positionplayer.y - elemento)< elemento){
   console.log('movingg');
 }
 else{
    
    positionplayer.y-= elemento;
    startGame();
 }
}
function moveright() {
   if (( positionplayer.x + elemento) > canvaSizes){
        console.log('movingg');
      }
      else{
         
        positionplayer.x += elemento;
        startGame();
      }
   
}
function moveleft() {
    if (( positionplayer.x - elemento)< elemento){
        console.log('movingg');
      }
      else{
         
        positionplayer.x-= elemento;
        startGame();
      }
   
    
}
function movedown(){   
    if (( positionplayer.y + elemento)> canvaSizes ){
        console.log('movingg');
      }
      else{
         
        positionplayer.y+= elemento;
        startGame();
      }
   
}
