// ------------------------------------------------------
function Particule(x_,y_)
{
	this.x = x_;
	this.y = y_;

	this.vx = 0;
	this.vy = 0;


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

	this.update = function()
	{
		this.x += this.vx;
		this.y += this.vy;
	}

	this.draw = function()
	{
	}
}