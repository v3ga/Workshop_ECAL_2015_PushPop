var websocket;

function setup() {
  // uncomment this line to make the canvas the full size of the window
  	createCanvas(500, 500);
	websocket = new WebSocket("ws://MacBook-Pro-de-Julien.local:12345/p5websocket");

   
}

function draw() {
  // draw stuff here
  ellipse(width/2, height/2, 50, 50);
}

function mouseDragged() {
  // Make a little object with mouseX and mouseY
  var data = {
    x: mouseX,
    y: mouseY
  };
  // Send that object to the socket
  websocket.send('Ping');
}