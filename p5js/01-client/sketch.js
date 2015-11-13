var websocket;

// --------------------------------------------
function setup()
{
  	createCanvas(500, 500);
	websocket = new WebSocket("ws://MacBook-Pro-de-Julien.local:12345/p5websocket");
}

// --------------------------------------------
function draw()
{
  ellipse(width/2, height/2, 50, 50);
}

// --------------------------------------------
function mouseDragged()
{
  var data = {
    x: mouseX,
    y: mouseY
  };
  
  // Send that object to the socket
  websocket.send('Ping');
}