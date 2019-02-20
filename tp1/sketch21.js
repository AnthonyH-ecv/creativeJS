var can;
var c;
var total = 100;
var tab = [];

function init() {

    can = document.getElementById('le_canvas');
    //mise en variable du context 2d (espace graphique)
    c = can.getContext('2d');
    
    generat();
    setInterval(loop, 30);
    
}

function generat() {
    for (var i = 0; i < total; i++) {
        var part = {
            posX: Math.random()*500,
            posY: Math.random()*500,
            orient:Math.random()*360,
            coef:1+Math.random()*3,
            r:3+(Math.random()*10)
            

        }
        tab.push(part);
    }
}

function loop() {
    c.clearRect(0,0,500,500);
    for (var i = 0; i < tab.length; i++) {
        var p = tab[i];
        c.beginPath();
        c.fillStyle = '#ff3300';
        c.ellipse(p.posX, p.posY, p.r, p.r, 0, 0, 2 * Math.PI);
        c.fill();
        
        var vX = Math.cos(p.orient*Math.PI/180)*p.coef;
        var vY = Math.sin(p.orient*Math.PI/180)*p.coef;
        
        p.posX += vX;
        p.posY += vY;

        if (p.posX > 500-p.r || p.posX < p.r) {
            p.orient += 1;
            
        }
        if (p.posY > 500-p.r || p.posY < p.r) {
            p.orient +=1;
        }
    }
}
