var angleStart = 0;
var xp = 0;
var yp = 0;
var anglep = 0;

// --------------------------------------------
function setup()
{
  	createCanvas(500, 500);

  	xp = width/2+30;
  	yp = height/2+40;
}

// --------------------------------------------
function draw()
{
	angleStart += 1;
	if (angleStart>=360)
		angleStart -= 360;

	anglep = degrees( atan2(yp-height/2, xp-width/2) );



	background(0);
	noStroke();



	beginShape(TRIANGLE_FAN);
	fill(0,200,0,255);
	vertex(width/2, height/2);

	for (var a=angleStart; a<angleStart+110; a=a+2)
	{
		var x = width/2 	+ 250 * cos( radians(a) );
		var y = height/2 	+ 250 * sin( radians(a) );

		fill(0,200,0,map(a,angleStart,angleStart+110,0,255 ));
		vertex(x,y);
	}
	endShape();

	var angle1 = angleStart;
	var angle2 = (angleStart+110)%360;
	var angleTemp;
	if (angle2<angle1)
	{
		angleTemp = angle1;
		angle1 = angle2;
		angle2 = angleTemp;
	}
	if (anglep>=angle1 && anglep <= angle2)
	{
		fill(200,0,0,255);
		ellipse(xp,yp, 10,10);
	}
	fill(255);
	text(anglep + "["+angleStart+","+((angleStart+110)%360)+"]", 5,15);
}

