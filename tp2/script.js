var can;
var c;
var total = 3000;
var tab = [];
var mouseX ;
var mouseY ;

function init() {

    can = document.getElementById('le_canvas');
    //mise en variable du context 2d (espace graphique)
    c = can.getContext('2d');
    
    generat();
    setInterval(loop, 10);
    document.getElementById("le_canvas").onmousemove = get_mouse_position;
    
}

function generat() {
    
    for (var i = 0; i < total; i++) {
        
        var angle = (360/total*i)*Math.PI/180;
        var hue = angle/(Math.PI*2)*360;
        var col = 'hsl('+hue+',90%,50%)';
        var dX= 250+ Math.cos(angle)*100;
        var dY= 250+ Math.sin(angle)*100;
        
        var part = {
            posX: Math.random()*500,
            posY: Math.random()*500,
            vit : 1+Math.random()*30,
            //orient:Math.random()*360,
            //coef:1+Math.random()*3,
            //r:3+(Math.random()*10),
            dtX: dX,
            dtY: dY,
            odtX: dX,
            odtY: dY,
            couleur: col,
            timer: 0, 
            r:0.5

        }
        tab.push(part);
    }
}

function loop() {
    //c.clearRect(0,0,500,500);
    c.fillStyle='rgba(255,255,255,.25)'
    c.rect(0,0,500,500);
    c.fill();
   
    for (var i = 0; i < tab.length; i++) {
        var p = tab[i];
        var dstX = p.odtX-p.posX;
        var dstY = p.odtY-p.posY;
        var dst = Math.sqrt((dstX*dstX) + (dstY*dstY));
        var d = 1/(1+dst/10);
        c.beginPath();
        c.fillStyle = p.couleur;
        c.ellipse(p.posX, p.posY, d, d, 0, 0, 2 * Math.PI);
        c.fill();
        
        p.posX +=(p.dtX-p.posX)/p.vit;
        p.posY +=(p.dtY-p.posY)/p.vit;
        
        var distX = mouseX - p.posX;
        var distY = mouseY - p.posY;
        var dist = Math.sqrt((distX*distX) + (distY*distY));
        
        if(dist < 50){
            var repulse = Math.atan2((p.posY-mouseY),(p.posX-mouseX));
            var newX = p.posX + Math.cos(repulse)*p.vit*10;
            var newY = p.posY + Math.sin(repulse)*p.vit*10;
            
            
            p.dtX = newX;
            p.dtY = newY;
            p.timer = Math.round(50+Math.random()*150);
        }
        if(p.timer >0){
            p.timer--;
        }
        if(p.timer == 0){
            p.dtX = p.odtX;
            p.dtY = p.odtY;
        }
        
    }
}
function get_mouse_position(e){
    mouseX = e.clientX;
    mouseY = e.clientY;
}
