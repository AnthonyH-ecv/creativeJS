
var can;
var ctx;
var tab_flocons = [];
var count=0;
var santa_x=650;

var img = document.createElement("img");
img.src = "snowflake.png";

var imgbg = document.createElement("img");
imgbg.src = "bg.png";

var imgsanta = document.createElement("img");
imgsanta.src = "santa.png";

function init(){
  can = document.getElementById('le_canvas');
  ctx = can.getContext('2d');
  //
  setInterval(generer,10);
}

function generer(){
  //console.log("ok");
  count = tab_flocons.length+1;
  var flocon={
    id:count,
    x:Math.random()*600,
    y:-20,
    r:3+Math.random()*4,
    vity:0.3+(Math.random()/2)
  };
  tab_flocons.push(flocon);
  afficher();
}

function afficher(){
ctx.clearRect(0,0,600,200);
ctx.drawImage(imgbg, 0, 0,600,200);
ctx.drawImage(imgsanta, santa_x, 110);
santa_x-=1;
if(santa_x<-50){
  santa_x=650;
}
  for(var u=0;u<tab_flocons.length;u++){
    var f = tab_flocons[u];
      //deplacement
      f.y+=f.vity;
      if(f.y>300){
        tab_flocons.splice(f.id,1);
        //console.log(tab_flocons.length);
      }
      ctx.drawImage(img, f.x-64, f.y-64,f.r,f.r);
  }
}
