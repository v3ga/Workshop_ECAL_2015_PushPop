// --------------------------------------------
var URL_SERVER = "ws://10.192.250.138:12345/p5websocket";
var IP_VOISIN = "10.192.232.32";

// Tableau qui va contenir une liste d'objets
var listObjects = [];

// Timing
var time = 0;
var timeStart = 0;
// --------------------------------------------
function setup()
{
  	createCanvas(500, 500);
	connect(URL_SERVER);
	time = timeStart = millis();
}

// --------------------------------------------
function draw()
{
	time = millis();
	if ((time - timeStart)>=250)
	{
		timeStart = millis();
		var object = new MyObject(width/2, random(height/2-150,height/2+150));
		listObjects.push( object );
	}

	background(255);
	for (var i=listObjects.length-1;i>=0;i--)
	{	
		listObjects[i].update();	
		listObjects[i].draw();
		// Si la particule [i] est «out», on l'enlève de la liste 
		if (listObjects[i].out)
			listObjects.splice(i,1);

	}

	// Imprime le nombre d'objets en cours dans la liste
	text(""+listObjects.length,10,12);
}

// --------------------------------------------
function mousePressed()
{
	var object = new MyObject(mouseX, mouseY);
	listObjects.push( object );
}


// --------------------------------------------
// Définition d'une classe «MyObject»
function MyObject(x_, y_)
{
	// Propriétés de l'objet
	// > name
	this.name = "circle";
	// > position
	this.x = x_;
	this.y = y_;
	// > vitesse
	this.vx = random(3,6);
	// > diametre
	this.diameter = random(5,15);
	// > flag pour dire s'il est sorti ou non de l'écran
	this.out = false;

	// Méthode de mise à jour 
	this.update = function()
	{
		// Mouvement 
		this.x += this.vx;
		if (this.x-this.diameter>=width && this.out == false)
		{
			send(IP_VOISIN, this);
			this.out = true;
		}
	}

	this.draw = function()
	{
		noStroke();
		fill(0);
		ellipse(this.x,this.y,this.diameter,this.diameter);
	}
}