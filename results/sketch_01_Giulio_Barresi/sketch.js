// --------------------------------------------
var URL_SERVER = "ws://10.192.234.111:12345/p5websocket";
//var IP_VOISIN = "10.192.232.125";
var IP_VOISIN = "10.192.232.125";


var g;

var repellers;

function setup() {
    noCursor();
    connect(URL_SERVER);

    frameRate(60);

    createCanvas(windowWidth, windowHeight);

    particles = [];
    repellers = [];

    g = createVector(0, random(.2,.5));
}

function onMessage(o){
    //console.log("message");
    var xPos = o.y * width;
    var particle = new Particle(xPos, 0);
    particles.push(particle);
}

function mousePressed(){
    var o = { y: random(0,1) };
    onMessage(o);
}

function keyPressed(){
    repellers.push(new Repeller(mouseX,mouseY,30));
}

function draw () {
    background(229, 231, 222,50);

    repellers.forEach(function(repeller) {
        repeller.display();
    });

    particles.forEach(function(particle){

        for (var i = 0; i < repellers.length; i++)
        {
            var repeller = repellers[i];
            var dist = p5.Vector.dist(particle.pos,repeller.pos);

            if (dist > 30) continue;
            var v = p5.Vector.sub(particle.pos, repeller.pos);
            v.normalize(); //map entre 0 et 1 ! permet de faire des multiplicatiosns plus easy
            v.mult((3 / dist) * repeller.power* 5);
            particle.addForce(v);
        }


        particle.addForce(g);

        // hauteur
        //var xWind = map(particle.pos.y, 0, height, 0, 3);
        //var w = createVector(xWind, 0);

        // noise
        var wind = noise(frameCount / 10) * random(.1, .4) ;
        var w = createVector(wind, 0);

        particle.addForce(w);

        //showing particle elements
        particle.update();
        particle.createAura();
        particle.createCircles();
        particle.createDot();

        //physics of elements
        particle.alpha();
        particle.wiggle();
        particle.evolving();

    });
    console.log(particles.length);
} 
