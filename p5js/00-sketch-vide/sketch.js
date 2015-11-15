// --------------------------------------------
var URL_SERVER = "ws://MacBook-Pro-de-Julien.local:12345/p5websocket";

// --------------------------------------------
function setup()
{
  	createCanvas(500, 500);
	connect(URL_SERVER);
}

// --------------------------------------------
function draw()
{
}

// --------------------------------------------
function onMessage(data)
{
	// do something with data received
}