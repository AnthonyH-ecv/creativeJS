
var can;
var ctx;
var tab_flocons = [];
var count=0;

function init(){
  can = document.getElementById('le_canvas');
  ctx = can.getContext('2d');
  //
  setInterval(generer,10);
  setInterval(afficher,10);
}

function generer(){
  //console.log("ok");
  var flocon={
    id:count,
    x:Math.random()*600,
    y:-20,
    r:1+Math.random()*3,
    vity:1+Math.random()*3
  };
  tab_flocons.push(flocon);
  count++;
}

function afficher(){
//console.log("ok2");
ctx.clearRect(0,0,600,200);

  for(var u=0;u<tab_flocons.length;u++){
    var f = tab_flocons[u];
      //deplacement
      f.y+=f.vity/10;
      if(f.y>200){
        tab_flocons.splice(f.id,1);
      }
      // affichage
      ctx.beginPath();
      ctx.fillStyle="rgb(0,0,0)";
      ctx.ellipse(f.x,f.y,f.r,f.r,0,0,2*Math.PI);
      ctx.fill();
  }
}
