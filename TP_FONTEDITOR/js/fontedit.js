// creation grille
var nb_col=5;
var nb_lig=5;
var marge_w = 0;
var marge_h = 0;
var can;
var ctx;
var tab_carres;

function init(){
can = document.getElementById('le_canvas');
ctx = can.getContext('2d');
generate();
affiche();
document.addEventListener("click",clickecran);
}
function clickecran(e){
  //console.log(e.clientX+"--"+e.clientY);
  for(var u=0;u<tab_carres.length;u++){
    if(e.clientX>tab_carres[u].destx && e.clientX<tab_carres[u].destx+tab_carres[u].w){
      if(e.clientY>tab_carres[u].desty && e.clientY<tab_carres[u].desty+tab_carres[u].h){
        if(tab_carres[u].c == "white"){
          tab_carres[u].c = "black";
        }else{
          tab_carres[u].c = "white";
        }
      }
    }
  }
  affiche();
}

function generate(){
  tab_carres = [];
  // taille d un element
  var carre_w = (200/nb_col)-(2*marge_w);
  var carre_h = (200/nb_lig)-(2*marge_h);
  // double iteration : grille lignes et colones
  var count=0;
  for(var c=0;c<nb_col;c++){
    for(var l=0;l<nb_lig;l++){
      // prototype affichage
      var couleur = "white";
      var posx = (c*carre_w)+(c*marge_w);
      var posy = (l*carre_h)+(l*marge_h);
      var wait_time = (c%nb_col)*100;//Math.round(10+Math.random()*100);
      //ctx.fillRect(posx,posy,carre_w,carre_h);*/
      var carre = {destx:posx,desty:posy,w:carre_w,h:carre_h,c:couleur,indexc:c,indexl:l};
      tab_carres.push(carre);
      count++;
    }
  }
}
// traitement de tous les objets du tableau
function affiche(){
  ctx.clearRect(0,0,600,600);
  var desc = "";
  for(var u=0;u<tab_carres.length;u++){
    affiche_carre(tab_carres[u]);
    if(tab_carres[u].c=="black"){
      desc+= tab_carres[u].indexc+","+tab_carres[u].indexl+",";
    }
  }
  //
  desc = desc.substring(0, desc.length - 1);
  document.getElementById('texto').innerHTML = desc;
}
//methode d affichage
function affiche_carre(cible){
    ctx.fillStyle=cible.c;
    ctx.strokeStyle = "black";
    ctx.fillRect(cible.destx,cible.desty,cible.w,cible.h);
    ctx.strokeRect(cible.destx,cible.desty,cible.w,cible.h);
}
