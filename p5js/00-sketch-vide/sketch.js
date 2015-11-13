// --------------------------------------------
function setup()
{
  	createCanvas(500, 500);
	connect("ws://MacBook-Pro-de-Julien.local:12345/p5websocket");
}

// --------------------------------------------
function draw()
{
	background(255,0,0);
}

// --------------------------------------------
function onMessage(data)
{
	// do something with data received
}