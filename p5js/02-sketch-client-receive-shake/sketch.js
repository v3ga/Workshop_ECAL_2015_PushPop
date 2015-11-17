// --------------------------------------------
var URL_SERVER = "ws://MacBook-Pro-de-Julien.local:12345/p5websocket";

// ------------------------------------------------------
// Stockage du dernier message reçu
var msg;

// Variables
var diameter = 0;

// --------------------------------------------
function setup()
{
  	createCanvas(500, 500);
	connect(URL_SERVER);
}

// --------------------------------------------
function draw()
{
	background(255);
	ellipse(250,250,diameter,diameter);
	diameter += -diameter * 0.6;
}

// --------------------------------------------
function onMessage(data)
{
	// On ne décode pas le message, pas besoin puisqu'il ne contient
	// pas «vraiment» d'information.
	diameter = 500;
}


