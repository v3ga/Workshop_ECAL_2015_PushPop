"use strict";

// --------------------------------------------
var URL_SERVER = "ws://10.192.234.111:12345/p5websocket";
var IP_VOISIN = "10.192.234.111";

var datas = {"x": 0, "y": 0};

var particles = [];

// --------------------------------------------

var i;
var g;
var gir;
var shakeGenNum = 15;

var ua = navigator.userAgent.toLowerCase();
var isAndroid = ua.indexOf("android") > -1; //&& ua.indexOf("mobile");


gyro.startTracking(function(o) {
    if (!gir){
      gir = crateVector(0, 0, 0);
    }

    gir.x = o.x;
    gir.y = o.y;
    if (isAndroid){
      gir.x = -gir.x;
      gir.y = -gir.y;
    } 
});

var myShakeEvent = new Shake({
    threshold: 5, // optional shake strength threshold
    timeout: 1000 // optional, determines the frequency of event generation
});

window.addEventListener('shake', shakeEventDidOccur, false);

//function to call when shake occurs
function shakeEventDidOccur () {
  var s = width * 0.4;

    for (var i = 0; i < shakeGenNum; i++){
        addParticle(random(width/2 - s , width/2+s), random(height/2 - s, height));
    }

}

// --------------------------------------------
function setup()
{
  createCanvas(windowWidth, windowHeight);

	connect(URL_SERVER);
	
	frameRate(60);
  g = createVector(0, 0.98 / 5);
  gir = createVector(0, 0, 0);
  ellipseMode(CENTER);
  myShakeEvent.start();
  window.scrollTo(0,1);
}

// --------------------------------------------
function draw()
{

	background("#0098d8");

  particles.forEach(function(particle){
    particle.addForce(createVector(gir.x, -gir.y).mult(0.1));
    particle.update();
    particle.display();
  });
  fill(255);
}


function get_browser_info(){
    var ua=navigator.userAgent,tem,M=ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || []; 
    if(/trident/i.test(M[1])){
        tem=/\brv[ :]+(\d+)/g.exec(ua) || []; 
        return {name:'IE',version:(tem[1]||'')};
        }   
    if(M[1]==='Chrome'){
        tem=ua.match(/\bOPR\/(\d+)/)
        if(tem!=null)   {return {name:'Opera', version:tem[1]};}
        }   
    M=M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
    if((tem=ua.match(/version\/(\d+)/i))!=null) {M.splice(1,1,tem[1]);}
    return {
      name: M[0],
      version: M[1]
    };
 }

var browser=get_browser_info();

// --------------------------------------------

function touchStarted(){

if (screenfull.enabled) {
    screenfull.request();
}

  addParticle(touchX, touchY);
}

function mouseClicked(){

if (screenfull.enabled) {
    screenfull.request();
}

  console.log("mouse clicked");
  addParticle(mouseX, mouseY);
}

function addParticle(x,y){
  var size = random(40, 50);
  var p = new Particle(x, y, size);
  particles.push(p);
}

// --------------------------------------------

function Particle (x, y, size) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.size = size;


    var arr = ["#f54123", "#0b3536", "#e5e7de"]; // red, black, white
    var index = Math.floor(random(arr.length));
    var strokeIndex = Math.floor(random(arr.length));
    this.color = arr[index];
    this.stroke = arr[strokeIndex];
}
 
Particle.prototype.addForce = function(force) {
    this.acc.add(force);
};

Particle.prototype.update = function() {
    this.vel.add(this.acc);

    this.handleEdges();

    this.pos.add(this.vel);
    this.acc.mult(0);
}

Particle.prototype.handleEdges = function() {
    // Normal edges
    if (this.pos.y + this.size / 2 > height){
      this.vel.y  = - Math.abs(this.vel.y) * 0.9;
    }

    if (this.pos.x + this.size / 2 < 0 ) {
      this.vel.x = Math.abs(this.vel.x) * 0.9;
    } 

    if (this.pos.x - this.size / 2 > width ) {
      this.vel.x = - Math.abs(this.vel.x) * 0.9;
    } 

   if (this.pos.y + this.size/2 < 0){
    console.log("send");
      // Send the data
      var mappedY = map(this.pos.x, 0, width, 0, 1);
      send(IP_VOISIN, {from: "tibor", y: mappedY } );

      var index = particles.indexOf(this);
      particles.splice(index, 1);
    }
}


Particle.prototype.display = function() {

  fill(this.color);
  strokeWeight(this.size * 0.4);
  stroke(this.stroke);
  ellipse(this.pos.x, this.pos.y, this.size, this.size);
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

