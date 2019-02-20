var direction = 0;
var acc = 0;
var posX = 0;
var posY = 0;
var fh=false;
var fb=false;
var fd=false;
var fg=false;

function init() {

    can = document.getElementById('le_canvas');
    //mise en variable du context 2d (espace graphique)
    ctx = can.getContext('2d');
    
    document.addEventListener('keydown',(e)=>{
        console.log(e.keyCode);
        if(e.keyCode ==  38){
            fh=true;
        }
        if(e.keyCode == 40){
            fb= true;
        }
        if(e.keyCode == 39){
            fd= true;
        }
        if(e.keyCode == 37){
            fg=true;
        }
    });
    document.addEventListener('keyup', (e) => {

        if(e.keyCode==38){
          fh=false;
        }
        if(e.keyCode==40){
          fb=false;
        }
        if(e.keyCode==39){
          fd=false;
        }
        if(e.keyCode==37){
          fg=false;
        }
    
    });
    
    
    setInterval(loop, 30);
}
                              
function loop(){
    ctx.clearRect(0,0,1366,768);
    if(fh){
        acc+=.3;
    }
    if(fb){
        acc-=.1;
    }
    if(fd){
        direction +=3;
    }
    if(fg){
        direction -= 3;
    }
    
    acc/=1.03;
    posX+= Math.cos(direction*Math.PI/180)*acc;
    posY+= Math.sin(direction*Math.PI/180)*acc;
    
    draw_obs();
    ctx.translate(posX,posY);
    ctx.rotate(direction*Math.PI/180);
    draw_car();
    ctx.setTransform(1, 0, 0, 1, 0, 0);

    var distx = 250-posX;
    var disty = 250-posY;
    var d = Math.sqrt((distx*distx)+(disty*disty));
    if(d<50){
      direction+= (Math.random()-Math.random())*10;

    }
}
function draw_car(){
    
    ctx.fillStyle="rgb(0,0,0)";
    ctx.beginPath();
    ctx.rect(10,-8,10,10);
    ctx.fill();
    ctx.rect(10,8,10,10);
    ctx.fill();
    ctx.rect(-10,-8,10,10);
    ctx.fill();
    ctx.rect(-10,8,10,10);
    ctx.fill();
    ctx.fillStyle="#ff3300";
    ctx.beginPath();
    ctx.rect(-12,-3,35,15);
    ctx.fill();
    
}

function draw_obs(){

    ctx.fillStyle="#0000FF";
    ctx.beginPath();
    ctx.ellipse(250,250,50,50,0,0,2*Math.PI);
    ctx.fill();

}