// --------------------------------------------
var URL_SERVER = "ws://10.192.250.138:12345/p5websocket";

var msg;

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
		fill(msg.r, msg.g, msg.b);
		ellipse(250,250,msg.x,msg.x);
	}
}

// --------------------------------------------
function onMessage(data)
{
	msg = data;
}