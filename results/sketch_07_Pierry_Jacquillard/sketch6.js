// --------------------------------------------
var URL_SERVER = "ws://10.192.250.138:12345/p5websocket";
var IP_VOISIN = "10.192.250.129"
var yIn = [];
//var yOut;

colorRouge = [245,65,35];
colorBlanc = [229, 231, 222];
colorBleu  = [0, 152, 216];
colorNoir = [11, 53, 54];


// --------------------------------------------
function setup()
{
  createCanvas(windowWidth, windowHeight);
	connect(URL_SERVER);
  noCursor();
}

// --------------------------------------------
function draw()
{
  background(colorBleu);
  //generates particules toutes les deux secondes
  if (mouseIsPressed) {
    var newObject = new myObject(random(height));
    yIn.push(newObject);
  }

  for (var i = 0; i < yIn.length; i++)
  {
    yIn[i].update();
    if (yIn[i].out) {
      yIn.splice(i,1);
    }
  }
 }

// --------------------------------------------
function onMessage(data)
{
	// do something with data received
  var newObject = new myObject(data.y*height);
  yIn.push(newObject);
}


function myObject(x_) {

  var trace = [];

  this.yInit = x_;
  this.orientation = this.yInit;
  this.angle = 0;
  this.inc = random(0.1, 0.30);
  this.rayon = random(5, 50);
  this.bORw = (Math.random() < 0.5);
  this.color;
  this.long = random(10, 70);
  this.out = false;
  this.xInit = -this.rayon*2;
  this.horaire = (Math.random() < 0.5);

  if (this.horaire) {
    var tourne = 1;
  } else {
    var tourne = -1;
  }

  this.update = function() {
    trace.push({
      x: this.xInit + this.rayon * tourne * cos(this.angle),
      y: this.yInit + this.rayon * sin(this.angle),
    });

    if (this.bORw) {
      this.color = colorNoir;
    } else {
      this.color = colorBlanc;
    }

    if (trace.length > this.long) {
      trace.shift();
    }

    noStroke();
    for (var i = 0, len = trace.length; i < len; i++) {
      if (i < len/3) {
        var colorR = map(i, 0, len/3, 245, this.color[0]);
        var colorV = map(i, 0, len/3, 65, this.color[1]);
        var colorB = map(i, 0, len/3, 35, this.color[2]);
      } else {
        var colorR = this.color[0];
        var colorV = this.color[1];
        var colorB = this.color[2];
      }
      fill(colorR, colorV, colorB);
      ellipse(trace[i].x, trace[i].y, this.rayon*3, this.rayon*3);
    }

    if (trace[0].x >= width+this.rayon*3 && this.out == false) {
      this.out = true;
      console.log("sending " + this.yInit/height);
      var normalisedY = this.yInit/height;
      var msg = { y: normalisedY };
      send(IP_VOISIN, msg);
    }


    this.angle += this.inc;
    this.xInit += this.inc*7;
    var direction = map((height/2-this.orientation),-height/2, height/2, -2, 2);
    this.yInit += this.inc*random(direction);

  }
}
