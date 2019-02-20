var posX = 250;
var posY = 250;
var speedX = 5;
var speedY = 2;
var can;
var c;

function init() {
    
    can = document.getElementById('le_canvas');
    //mise en variable du context 2d (espace graphique)
    c = can.getContext('2d');

    var posX = 250;
    var posY = 250;
    var speed = 2;
    setInterval(loop,10);

}

function loop(){
    c.clearRect(0,0,500,500);
    c.beginPath();
    c.fillStyle = '#ff3300';
    c.ellipse(posX, posY, 50, 50, 0, 0, 2 * Math.PI);
    c.fill();
    
    posX += speedX;
    posY += speedY;
    
    if(posX >450 || posX < 50){
        speedX*=-1;
    }
    if(posY >450 || posY < 50){
        speedY*=-1;
    }
}