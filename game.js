const canvas = document.querySelector('.pantalla-maps');
const game = canvas.getContext('2d');
const op = document.querySelector('.top');
const right = document.querySelector('.right');
const left = document.querySelector('.left');
const down = document.querySelector('.down');
const vidas = document.querySelector('#corazones')
const tiempo = document.querySelector('#close')
const spanrecor = document.querySelector('#rerc')
const quitar= document.querySelector('.cierre')
const textLogro=document.querySelector('.mensajeResultado')
const jugar=document.querySelector('.jugar')

const positionplayer={
    x: undefined,
    y: undefined
}
const positionRegalo={
    x:undefined,
    y:undefined
}
let arrayCollision=[]
jugar.addEventListener('click',recargar);
window.addEventListener('load',responsive);
window.addEventListener('resize',responsive);
// canvas.addEventListener('rezise',startGame)
let time;
let interval;
let canvaSizes;
let elemento;
let level = 0;
let lives = 3;

function startGame() {
    
   console.log({canvaSizes, elemento});
    // para hacer que el emoji cresca ala medida de la pantalla 
    game.font = elemento +'px Verdana';
    game.textAlign = 'end';
    // Usamos este  codigo para eliminar todo cada vez que se llame la funcion
    game.clearRect(0, 0, canvaSizes, canvaSizes);
    arrayCollision=[]
    // la idea es agregar varios niveles obteniendolos de nuestro documento maps.js
    const map = maps[level];
    if(!map){
        findeljuego()
        return map 
    }
    // crear el analisis del tiempo 
    if(!time){
       time = Date.now();
       interval = setInterval(tiempoini, 100);
     }
     
        
    showlifes()
    const mapRow = map.trim().split('\n');
    const mapcol =mapRow.map(row => row.trim() .split(''));
    console.log({map, mapRow, mapcol});
    // En este bloke vamos a poner cada uno de los emoji donde debe de estar para haci crear nuestro mapa en el canvas
    
    mapcol.forEach((row,rowI )=> {
        row.forEach((col,coliI) => {
         const emoji =emojis[col];
         const posX = elemento *(coliI+1)
         const posY = elemento *(rowI+1)
         if (col == 'O'){
            if(!positionplayer.y && !positionplayer.x){
            positionplayer.x = posX;
            positionplayer.y = posY;
            console.log({positionplayer});
           }
         }
         else if (col == 'I'){
            positionRegalo.x = posX;
            positionRegalo.y = posY;
         }
         else if (col=='X'){
            arrayCollision.push({
                x:posX,
                y:posY
            })
            
         }
    
     
         game.fillText(emoji,posX,posY);
         
        })
        
    })
   moveplayer();
}
function moveplayer() {
    const colisionEnX = positionplayer.x== positionRegalo.x;
    const colisionEnY = positionplayer.y == positionRegalo.y;
    const colisionEnYyX= colisionEnX && colisionEnY; 
    if(colisionEnYyX){
     console.log('Eres el mejor sigue asi te amo ')
     whinLevel()
    
    }
    const reColision = arrayCollision.find(enemy =>{
        const colisionX= enemy.x  == positionplayer.x;
        const colisionY=  enemy.y == positionplayer.y;
           return colisionX && colisionY ;
       
    })
    if(reColision){
       console.log( 'se te exploto el puto culo cabron ')
        
       perdistes()
       
       textLogro.innerHTML=('No te rindas nunca es tarde para volver a intentarlo 😎🤞')
      
    }
    
    game.fillText(emojis['PLAYER'],positionplayer.x,positionplayer.y);
    records()  
}


function responsive (){
  
    if (window.innerHeight > window.innerWidth) {
        canvaSizes = window.innerWidth * 0.8;
        }
        else {
            canvaSizes = window.innerHeight * 0.8;
        }
        canvaSizes=Number(canvaSizes.toFixed(2));   
        canvas.setAttribute('width',canvaSizes);
        canvas.setAttribute('height',canvaSizes);
        // divide el   espacio adentro de nuestro canvas  en 10, depende de nuestra medida 
         elemento = canvaSizes / 10;
         startGame()
         positionplayer.x=undefined;
         positionplayer.y=undefined;
} 
// empesamos con el movimiento de nuestro personaje 

op.addEventListener('click',movetop);
right.addEventListener('click',moveright);
left.addEventListener('click',moveleft);
down.addEventListener('click',movedown);
window.addEventListener('keydown',moveBykey);
window.focus();
// movimiento del jugador 
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
// subir de nivel o perder 
function whinLevel(){
    level++;
    startGame()
    
}

function perdistes () {
    lives--;
    if(lives<=0){
        level=0;
       lives =3;
       time = undefined;
       inacti()
    }
    positionplayer.x = undefined;
    positionplayer.y = undefined;
    
    startGame()
    showlifes()
    
    
  
 
}
function showlifes(){
    vidas.innerHTML=emojis['cora'].repeat(lives);
}
//Contador  de tiempo 
function tiempoini (){
     tiempo.textContent=Date.now()-time;
} 
function findeljuego(){
    console.log('llegastes al final');
    clearInterval(interval)
    const recor = localStorage.getItem('local-time')
    const playertime= Date.now()-time;
    if (recor) {
      
       if(recor >= playertime){
        
        localStorage.setItem('local-time',playertime)
        textLogro.innerHTML=('ERES LA MEJOR SIGUE Asi 😉✌')
       }
       else{
        textLogro.innerHTML=('JaJajAjA nO SUPERASTES EL  RECORD😂😂')
       }
       console.log(recor,playertime)
    }
    else{
        localStorage.setItem('local-time',playertime)
    }
    inacti()
    // if(quitar){
    //     quitar.classList.toggle('inactive')
    // }
     
    }
function records(){
        spanrecor.textContent=localStorage.getItem('local-time')
    }

function inacti(){
    quitar.classList.toggle('inactive')
}
// aqui vamos a recargar la página cada vez que un damos el boton de jugar
function recargar(){
    window.location.reload()
}