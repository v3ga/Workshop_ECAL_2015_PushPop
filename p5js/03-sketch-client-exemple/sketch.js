// --------------------------------------------
var URL_SERVER = "ws://10.192.250.138:12345/p5websocket";

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
function mouseMoved()
{
	var data = 
	{ 
		x : mouseX,
		y : mouseY,
		r : random(200),
		g : 123,
		b : 20

	};
	send("10.192.250.138", data);
}

// --------------------------------------------
function onMessage(data)
{
	// do something with data received
}