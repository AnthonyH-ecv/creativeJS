// creation d'une grille

var nb_col = 10;
var nb_lin = 10;
var can;
var ctx;
var marge_w =4;
var marge_h =4;
var tab;



function init(){
     can = document.getElementById('le_canvas');
     ctx = can.getContext('2d');
    generate();
    setInterval(loop,15);
}


function generate(){
    tab =[];
    var carre_w = 600/nb_col-2*marge_w;
    var carre_h = 600/nb_lin-2*marge_h;
    var count = 0 ;
    
    for(var i =0; i<nb_col;i++){
        for(var j =0 ; j<nb_lin;j++){
            var couleur = "rgb("+Math.random()*250+","+Math.random()*250+","+Math.random()*250+")";
            var posX =i*carre_w + i*marge_w;
            var posY = j*carre_h +j*marge_h;
            var wait = (i%nb_col)*100//Math.round(10+Math.random()+100);
            ctx.fillRect(posX,posY,carre_w,carre_h);
            var carre ={
                dX : posX,
                pY : -100,
                dY : posY,
                w : carre_w,
                h : carre_h,
                c : couleur,
                timer : wait, 
            }
            tab.push(carre);
            count++;
        }
    }
}

function loop (){
    ctx.clearRect(0,0,600,600);
    for(var i = 0 ; i<tab.length ; i++){
        deplacer(tab[i]);
        afficher(tab[i]);
        
    }
}


function deplacer(cible){
    if(cible.timer != 0){
        cible.timer--;
    }
    if(cible.pY < cible.dY && cible.timer == 0){
        cible.pY+=(cible.dY-cible.pY)/(1+cible.dY/10);
    }
}


function afficher(cible){
    
    ctx.fillStyle =cible.c;
    ctx.fillRect(cible.dX, cible.pY, cible.w, cible.h);
}