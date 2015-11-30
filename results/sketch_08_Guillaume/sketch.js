var URL_SERVER = "ws://10.192.234.111:12345/p5websocket";
var IP_VOISIN = "10.192.232.128"

var listBranches = [];
var feuillas;


// --------------------------------------------
function setup()
{
  	createCanvas(displayWidth, displayHeight);
    feuillas= loadImage("fleur.png");
    connect(URL_SERVER);
}

// --------------------------------------------
function draw()
{
	background(229,231,222);
	for (var i=listBranches.length-1;i>=0;i--)
	{
		listBranches[i].grow();
		listBranches[i].draw();
		if (listBranches[i].age==0) listBranches.splice(i,1);
	}
	//text(listBranches.length, 4,12);
}

// --------------------------------------------
function mousePressed()
{
  addBranch(mouseY);
}

// --------------------------------------------
function addBranch(y)
{
  var newBranche = new Branche( 0, y );
  listBranches.push( newBranche );
}

// --------------------------------------------
function onMessage(msg)
{

  var normalisedY = msg.y;
  var y = normalisedY * height;
  if (!isNaN(y)){
    addBranch(y);
  }
}



// --------------------------------------------
function Branche(xin_, yin_)
{
	this.points = [];
	this.xStart = xin_;
	this.yStart = yin_;
	this.xSpeed = random(20,30);

	this.x = xin_;
	this.y = yin_;

	this.xLocal = 0;
	this.yLocal = 0;

	this.noiseOffset = random(2);

	this.age = 100;
	this.arrived = false;

	this.generation = 0;

	this.children = [];

	this.angle = 0;
	this.xBranch = width/2*random(0.5,1);

  this.taille = 1;


	this.setXBranch = function(x)
	{
		this.xBranch = x;
	}

	this.setAngle = function(angle)
	{
		this.angle = angle;
		this.setDir( Math.cos(radians(angle)), Math.sin(radians(angle)) );
	}

	this.setDir = function(x_,y_)
	{
		this.dir = {x:x_, y:y_};
		this.dirP = {x:-this.dir.y, y:this.dir.x}
	}

	this.setDir(1.0, 0.0);

	this.grow = function()
	{
		if (this.x <= width)
		{
			this.x = this.xStart + this.xLocal*this.dir.x + this.yLocal*this.dirP.x;
			this.y = this.yStart + this.xLocal*this.dir.y + this.yLocal*this.dirP.y;

			this.yLocal  = 30*noise( 0.01*this.xLocal + this.noiseOffset );
			this.xLocal += this.xSpeed;

			this.points.push( {x : this.x, y : this.y} );


			if (this.xLocal > this.xBranch && this.children.length < 1 && this.generation<2)
			{
				if (random()<0.5)
				{
					var child01 = new Branche(this.x, this.y);
					child01.generation = this.generation+1;
					child01.setAngle(this.angle-30);
					child01.setXBranch(this.xBranch/5);

					this.children.push( child01 );
				}

				if (random()<0.5)
				{
					var child02 = new Branche(this.x, this.y);
					child02.generation = this.generation+1;
					child02.setAngle(this.angle+30);
					child02.setXBranch(this.xBranch/5);

					this.children.push( child02 );
				}
			}
		}
		else
		{
      if (this.arrived === false)
      {
        var normalisedY = map(this.y, 0, height, 0, 1);
        var msg = { y: normalisedY };
        send(IP_VOISIN, msg);
        this.arrived = true;
      }

		}

		if (this.arrived)
		{
			this.age -=1;
			if (this.age<0)
				this.age = 0;

		}

		if (this.children.length > 0)
		{
			for (var i=0;i<this.children.length;i++) this.children[i].grow();
		}
	}

	this.draw = function()
	{
    var a = map(this.age,100,0,255,0);
		strokeCap(SQUARE);
    stroke(11, 53, 54, a);
		strokeWeight(6-this.generation*5);

		for (var i=0 ; i<this.points.length-1; i++)
		{
			line( this.points[i].x, this.points[i].y, this.points[i+1].x, this.points[i+1].y);
		}

		if (this.children.length > 0)
		{
			for (var i=0;i<this.children.length;i++) this.children[i].draw();
		}

    this.taille += 0.2;
    imageMode(CENTER);
    tint(255,255,255,a)
    image(feuillas, this.points[i].x, this.points[i].y, this.taille, this.taille);


	}

}
