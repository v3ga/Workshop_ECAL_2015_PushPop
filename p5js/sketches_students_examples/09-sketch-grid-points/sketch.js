var grid;

// --------------------------------------------
function setup()
{
  	createCanvas(500, 500);
	grid = new Grid(10);
}

// --------------------------------------------
function draw()
{
	background(255);
	grid.draw();
}

// --------------------------------------------
function Path()
{

}


// --------------------------------------------
function Grid(columns_)
{
	this.columns = columns_;	
	this.dim = width / this.columns;
	this.rows = parseInt(height / this.dim);

	this.points = Array( (this.columns+1) * (this.rows+1) );
	for (var r=0; r<=this.rows; r++)
	{
		for (var c=0;c<=this.columns;c++)
		{
			this.points[r + (this.columns+1)*c] = { x:c*this.dim, y:r*this.dim };
		}
	}

	this.draw = function()
	{
		noStroke();
		fill(200);
		rectMode(CENTER);
		for (var i=0; i<this.points.length; i++ )
		{
			var p = this.points[i];
			rect(p.x,p.y,6,6);
		}
	}

}

