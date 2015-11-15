// --------------------------------------------
var URL_SERVER = "ws://MacBook-Pro-de-Julien.local:12345/p5websocket";

// ------------------------------------------------------
// Stockage du dernier message reçu
var msg;

// --------------------------------------------
function setup()
{
  	createCanvas(500, 500);
	connect(URL_SERVER);
}

// --------------------------------------------
function setup()
{
  	createCanvas(500, 500);
	connect(URL_SERVER);
}

// --------------------------------------------
function draw()
{
  if (msg)
  {
	  ellipse(msg.x, msg.y, 50, 50);
  }
}

// --------------------------------------------
function onMessage(data)
{
	// On stocke le message
	msg = data;

	// On imprime le message sur la console Javascript du navigateur
	// console.log(msg);
}

