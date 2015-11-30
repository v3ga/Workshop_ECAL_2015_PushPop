var URL_SERVER = "ws://10.192.250.138:12345/p5websocket";
var IP_VOISIN = "10.192.250.80";

// A reference to our box2d world
var world;

// A list we'll use to track fixed objects
var boundaries = [];
// A list for all of our rectangles
var pops = [];

var windmill;

function setup() {
  createCanvas(displayWidth,displayHeight);
  connect(URL_SERVER);

  // Initialize box2d physics and create the world
  world = createWorld();

  // Add a bunch of fixed boundaries
  /*boundaries.push(new Boundary(width/4,height-5,width/2-50,10,0));
  boundaries.push(new Boundary(3*width/4,height-50,width/2-50,10,0));
  boundaries.push(new Boundary(width-5,height/2,10,height,0));
*/
// boundaries.push(new Boundary(width/2,height,width,10,0));
// boundaries.push(new Boundary(width,height,10,height/8,0));
// boundaries.push(new Boundary(width/2,height,10,height/12,0));
// boundaries.push(new Boundary(width/5*2,height,10,height/60,0));
// //boundaries.push(new Boundary(width/2,height,10,height/6,0));
// boundaries.push(new Boundary(width/8*4,height/3,100,10,0));
// boundaries.push(new Boundary(width/8*3,height/3+50,100,10,0));
// boundaries.push(new Boundary(width/8*5,height/3*2,100,10,0));
// boundaries.push(new Boundary(width/8*6,height*5/6,100,10,0));
boundaries.push(new Boundary(width/2,height,width,10,0));
boundaries.push(new Boundary(width,height,10,height/8,0));
boundaries.push(new Boundary(width/2,height,10,height/12,0));
boundaries.push(new Boundary(width/5*2,height,10,height/60,0));
//boundaries.push(new Boundary(width/2,height,10,height/6,0));
boundaries.push(new Boundary(width/8*4,height/3,100,10,0));
boundaries.push(new Boundary(width/8*3,height/3+50,100,10,0));

boundaries.push(new Boundary(width/8*5,height/3*2,100,10,0));
boundaries.push(new Boundary(width/8*6,height*5/6,100,10,0));

boundaries.push(new Boundary(width/8*3,height/8*7,400,10,0));


//windmill = new Windmill(width/4,height/60*56);
}

function draw() {
  background(0,152,216);
//rotate(2/3*PI);
rotate(1/10000000000000000000*PI);

  //background(245,65,35);
  //fill(0,152,216);

  // We must always step through time!
  var timeStep = 1.0/30;
  // 2nd and 3rd arguments are velocity and position iterations
  world.Step(timeStep,10,10);

  // Display all the boundaries
  for (var i = 0; i < boundaries.length; i++) {
    boundaries[i].display();
  }

  if (pops.length > 0 )
  {
    //console.log(pops[0].h);
  }

  for (var i = pops.length-1; i >= 0; i--) {
    pops[i].display();
    if (pops[i].done()) {
      var y = pops[i].getY();
      var normalisedY = map(y, 0, height, 0, 1);
      var msg = { y: normalisedY };
      send(IP_VOISIN, msg);

      pops.splice(i,1);
    }
  }

  // Draw the windmill
//windmill.display();
}

function mousePressed() {
  addBall(mouseY);
}

function onMessage(msg) {
  var y = msg.y * height;
  addBall(y);
}

function addBall(y){
  var p = new Lollipop(0, y);
  pops.push(p);
}
