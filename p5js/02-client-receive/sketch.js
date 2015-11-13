var msg;

// --------------------------------------------
function setup()
{
  	createCanvas(500, 500);
	connect( "ws://MacBook-Pro-de-Julien.local:12345/p5websocket" );
}

// --------------------------------------------
function draw()
{
  if (msg)
	  ellipse(msg.x, msg.y, 50, 50);
}

// --------------------------------------------
function onMessage(data)
{
	msg = data;
}

