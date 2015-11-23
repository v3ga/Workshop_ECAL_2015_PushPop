// ------------------------------------------------------

//var posx = [-10.0, -70.0, -42.0, -100, -5, -100];
//var posy = [75, 200, 350, 125, 260];
//var posy;
////var sizex = [20, 10, 30, 12, 50];
//var sizex;
//var sizey = [20, 10, 30, 12, 50, 20];
//var vitx =[.53, .62, .57, .67, .52, .70]

// --------------------------------------------
var URL_SERVER = "ws://10.192.234.111:12345/p5websocket";
var IP_VOISIN = "10.192.232.132";

var particules;


// ------------------------------------------------------
function setup()
{
  createCanvas(windowWidth, windowHeight);
  connect(URL_SERVER);
  background("#e5e7de");
//  posy = [random(40,height-40), random(40,height-40), random(40,height-40), random(40,height-40),random(40,height-40)];
//  sizex = [random(10,100), random(10,100), random(10,100), random(10,100),random(10,100)];
//  sizey = [random(10,100), random(10,100), random(10,100), random(10,100),random(10,100)];

  particules = [];

}

// ------------------------------------------------------
function draw() 
{
    // Fond
    noStroke();
    fill(229, 231, 222, 120);
    rect(width/2, 0, width, height)

    noStroke();
    fill(245, 65, 35);
    rect(0, 0, width/2, height)

    for(var j=-25; j < height; j+=50){
      noStroke();
      fill(245, 65, 35);
      triangle(width/2+30, j+25, width/2, j+00, width/2, j+50);
      //  ellipse(width/2+30, j+25, 25,25);
      //ellipse(width/2+13, j+50, 15,15);
    }
    
    // Particules
    for(var i= 0; i < particules.length; i++) 
    {
      particules[i].draw();
    }

    for(var i= particules.length-1; i >=0 ; i--) 
    {
      if (particules[i].isOut())
      {

          var y = particules[i].y;
          var normalisedY = map(y, 0, height, 0, 1);
          var msg = { y: normalisedY };
          send(IP_VOISIN, msg);
          particules.splice(i,1);
        }
    }

}

// ------------------------------------------------------
function addParticle(y){
  var p = new Particule(0, y);
  particules.push( p );
} 

function mousePressed()
{
  addParticle(mouseY);
}

function onMessage(msg)
{
  var normalisedY = msg.y;
  var y = normalisedY * height;
  addParticle(y);
}

// ------------------------------------------------------
function Particule(x_,y_)
{
  this.x = x_;
  this.y = y_;

  this.vx = random(0.53, 0.70);
  this.vy = 0;

  this.sizex = random(10,100);
  this.sizey = random(10,100);

  this.isOut = function()
  {
    if (this.x - this.sizex/2 > width) 
        return true;
    return false;
  }


  this.setPosition = function(x_,y_)
  {
    this.x = x_;
    this.y = y_;
  }

  this.setSpeed = function(vx_,vy_)
  {
    this.vx = vx_;
    this.vy = vy_;
  }

  this.draw = function()
  {

    if(this.x < width/2-this.sizey/2-25)
    {
      this.x += this.vx*2;
      this.y += random(-1, 1);
      fill("#e5e7de");
      ellipse(this.x, this.y, this.sizex, this.sizex);
   }
    else
    {
      this.x += 20;
      //posy[i] += random(-10, 10);
      //posx[i] += width;
      this.y += random(-30, 30);
      fill(random(11),53,54, 210);//11, 53, 54
      this.sizex = this.sizex + random(-50, 50);
      //this.sizey-10;
      //sizey[i] = sizey[i] + random(-50, 50);
      ellipse(this.x, this.y, this.sizex, this.sizey);
    }

  }
}

