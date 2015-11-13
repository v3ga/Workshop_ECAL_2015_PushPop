// --------------------------------------------
function setup()
{
  	createCanvas(500, 500);
	connect("ws://MacBook-Pro-de-Julien.local:12345/p5websocket");
}

// --------------------------------------------
function draw()
{
  ellipse(mouseX, mouseY, 50, 50);
}

// --------------------------------------------
function mouseDragged()
{
  var data = {
    x: mouseX,
    y: mouseY
  };
  
  send( data );
}