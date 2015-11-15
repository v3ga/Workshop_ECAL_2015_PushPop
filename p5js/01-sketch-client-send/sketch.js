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
  ellipse(mouseX, mouseY, 50, 50);
}

// --------------------------------------------
function mouseMoved()
{
  // On fabrique un objet Javascript (qui sera transformé en JSON par la fonction send())
  var data =
  {
    x: mouseX,
    y: mouseY
  };
  
  send( data );
}