// VARIABLES
// canvas et context2d
var can;
var ctx;
// tableau des oeufs
var tab_eggs = [];
// compteurs des oeufs crashed & saved
var crashed_count=0;
var saved_count=0;
// taille du jeu
var resx=950;
var resy=600;
// position de la souris
var mousex=0;
var mousey=0;
// vitesse de generation
var gamespeed= 500;
var max_crashed=10;
// ETAT DU JEU
var gameinterval;
var displayinterval;
var isgame_playing = true;
// PREPARATION DES IMAGES OEUF ET PANIER
var img_basket = document.createElement("img");
img_basket.src = "img/basket.png";

var img_egg = document.createElement("img");
img_egg.src = "img/egg.png";

var img_bg = document.createElement("img");
img_bg.src = "img/bg.png";
// COORDONEES SOURIS
document.onmousemove = get_mouse_coords;
function get_mouse_coords(evt){
  mousex = evt.clientX;
  mousey = evt.clientY;
}
// INITIALISATION
function init(){
  can = document.getElementById('le_canvas');
  ctx = can.getContext('2d');
  // LANCEMENT DES BOUCLES : UNE POUR LA GENERATION ET UNE POUR LE DEPLACEMENT/AFFICHAGE
  gameinterval=setInterval(generer,gamespeed);
  displayinterval=setInterval(afficher,12);
}
// GENERATION D UN OEUF
function generer(){
  //console.log("ok");
  count = tab_eggs.length+1;
  var egg={
    id:count,
    x:50+Math.random()*(resx-50),
    y:-20,
    r:65,
    vity:1+(Math.random()*3),
  };
  tab_eggs.push(egg);
}
// AFFICHAGE
function afficher(){
  ctx.clearRect(0,0,resx,resy);
  ctx.drawImage(img_bg, 0,0,resx,resy);
  // AFFICHER LE PANIER
  ctx.drawImage(img_basket, mousex-64, mousey-64,100,100);
  // AFFICHER LES OEUFS
  for(var u=0;u<tab_eggs.length;u++){
    var e = tab_eggs[u];
    //deplacement
    e.y+=e.vity;
    //
    // A FAIRE !!!
    // SI DISTANCE OEUF-PANIER <20 ALORS DETRUIRE OEUF ET INCREMENTER LE COMPTEUR DES OEUFS SAUVES
      
    
    var distX = mousex - e.x;
    var distY = mousey - e.y;
    var distance = Math.sqrt((distX*distX) + (distY*distY));
    if(distance<20){
    // supprimer OEUF (existe deja dans le code)
    // incrementer le compteur des oeuf sauves, tres proche de la gestion des oeufs crashed
        delete_egg(e);
        saved_count++;
  }
  
  // A FAIRE !!!
  //
  // AFFICHER LES SCORES
  affiche_scores();
  // EGG CRASH
  if(e.y>resy){
    delete_egg(e);
    crashed_count++;
    if(crashed_count>=max_crashed){
      game_over();
    }
  }else{
    ctx.drawImage(img_egg, e.x-64, e.y-64,e.r,e.r);
  }
}
}
// AFFICHAGE SCORES
function affiche_scores(){
ctx.font = "30px  Arial Black";
ctx.textAlign="start";
ctx.fillStyle = "rgb(93, 147, 234)";
ctx.fillText("SAVED : "+saved_count,10,resy-80);
ctx.fillStyle = "rgb(201, 12, 12)";
ctx.fillText("CRASHED : "+crashed_count,10,resy-50);
}
// ECRAN GAME OVER
function game_over(){
  // SUPPRESSION DES BOUCLES
  clearInterval(gameinterval);
  clearInterval(displayinterval);
  // NETTOYAGE DE L ECRAN
  ctx.clearRect(0,0,resx,resy);
  ctx.drawImage(img_bg, 0,0,resx,resy);
  // NETTOYAGE DES OEUFS (DATA)
  tab_eggs=[];
  // AFFICHAGE GAME OVER
  ctx.font = "70px  Arial Black";
  ctx.textAlign="center";
  ctx.fillStyle = "rgb(201, 12, 12)";
  ctx.fillText("GAME OVER",resx/2,resy/2);

  ctx.font = "40px  Arial Black";
  ctx.textAlign="center";
  ctx.fillStyle = "rgb(201, 12, 12)";
  ctx.fillText("RETRY ?",resx/2,(resy/2)+50);


  isgame_playing=false;
  // CLIC POUR RELANCER LE JEU
  document.onclick = function(event) {
    if(isgame_playing==false){
      // REMISE A ZERO DES SCORES
      crashed_count=0;
      saved_count=0;
      // RELANCER LES BOUCLES
      gameinterval=setInterval(generer,gamespeed);
      displayinterval=setInterval(afficher,12);
      isgame_playing=true;
    }
  }
}
// SUPPRIME UN OEUF
function  delete_egg(egg_cible){
  var indexo = tab_eggs.indexOf(egg_cible);
  tab_eggs.splice(indexo,1);
}
