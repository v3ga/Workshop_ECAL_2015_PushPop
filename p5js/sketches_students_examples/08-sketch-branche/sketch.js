var listBranches = [];

// --------------------------------------------
function setup()
{
  	createCanvas(displayWidth, displayHeight);
}

// --------------------------------------------
function draw()
{
	background(255);
	for (var i=listBranches.length-1;i>=0;i--)
	{
		listBranches[i].grow();
		listBranches[i].draw();
		if (listBranches[i].age==0) listBranches.splice(i,1);
	}
	text(listBranches.length, 4,12);
}

// --------------------------------------------
function mousePressed()
{
	var newBranche = new Branche( 0, mouseY );
	listBranches.push( newBranche );

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
			this.arrived = true;
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
		strokeCap(SQUARE);
		stroke(0, map(this.age,100,0,255,0));
		strokeWeight(10-this.generation*5);
		for (var i=0 ; i<this.points.length-1; i++)
		{
			line( this.points[i].x, this.points[i].y, this.points[i+1].x, this.points[i+1].y);
		}

		if (this.children.length > 0)
		{
			for (var i=0;i<this.children.length;i++) this.children[i].draw();
		}
	}

}