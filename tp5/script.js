var tabf =[];
var can;
var ctx;
var mouseX;
var mouseY;

var bg = document.createElement("img");
bg.src = "bg.png";

var flake = document.createElement("img");
flake.src="snowflake.png";

var santa = document.createElement("img");
santa.src="santa.png";

document.addEventListener("mousemove", function mouse(e){
    mouseX = e.clientX;
    mouseY = e.clientY;
})

function init(){
    can = document.getElementById('le_canvas');
    ctx = can.getContext('2d');
    
    setInterval(generate,10);
}

function generate(){
    var flocon ={
        
        id:tabf.length+1,
        taille:2+Math.random()*5,
        x:Math.random()*600,
        y:-20,
        vy:.1+Math.random()/2,
    }
    
    tabf.push(flocon);
    affiche();
}


function affiche(){
    ctx.clearRect(0,0,600,200);
    ctx.drawImage(bg,0,0,600,200);
    for( var i = 0 ; i<tabf.length ; i++){
        
        var f = tabf[i];
        f.x += ((600/2)-mouseX)/(600/2)
        f.y += f.vy;
        
        if(f.y>200){
            tabf.splice(f.id,1);
        }
        
        /*ctx.fillStyle="black";
        ctx.beginPath();
        ctx.ellipse(f.x ,f.y,f.taille,f.taille,0,0,2*Math.PI);
        ctx.fill();*/
        
        ctx.drawImage(flake,f.x-64,f.y-64,f.taille,f.taille);
    }
}