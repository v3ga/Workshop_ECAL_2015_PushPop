// --------------------------------------------
var URL_SERVER = "ws://10.192.250.138:12345/p5websocket";
var IP_VOISIN = "10.192.232.32";

// Tableau qui va contenir une liste d'objets à stocker
var listObjects = [];

// Variables yin et yout
var yin		= 0;
var yout 	= 0; 

// --------------------------------------------
function setup()
{
  	createCanvas(displayWidth, displayHeight);
	connect(URL_SERVER);

	yin = random(height);
}

// --------------------------------------------
function draw()
{
	// Mise à jour de yout
	yout = height/2;

	// Dessin du fond
	background(255);

	// Dessin de la line (yin - yout)
	stroke(200);
	line(0,yin,width,yout);
}

// --------------------------------------------
function onMessage(otherObject)
{
	// Mise à jour de yin en fonction de yout précédent
	yin = otherObject.yout;

	// «otherObject» contient l'objet reçu par ce sketch
	// à partir de ces propriétés on va créer un objet du type qui est définit ici, dans ce sketch
	var myObject = new MyObject(0, otherObject.y);
	listObjects.push( myObject );
}

