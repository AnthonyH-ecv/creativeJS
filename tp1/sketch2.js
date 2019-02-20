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
            speedX: Math.random()-Math.random(),
            speedY: Math.random(),
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

        p.posX += p.speedX;
        p.posY += p.speedY;

        if (p.posX > 500-p.r || p.posX < p.r) {
            p.speedX *= -1;
        }
        if (p.posY > 500-p.r || p.posY < p.r) {
            p.speedY *= -1;
        }
    }
}
