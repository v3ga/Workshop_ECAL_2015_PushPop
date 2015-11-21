// --------------------------------------------
function setup()
{
  	createCanvas(500, 500);
  	background(0);
}

// --------------------------------------------
function draw()
{
	fill(0,10);
	rect(0,0,width,height);
	noStroke();
	fill(255,255,255,255);
	ellipse(mouseX,mouseY,20,20);
}

// --------------------------------------------
function onMessage(data)
{
	// do something with data received
}