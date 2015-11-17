// --------------------------------------------
var URL_SERVER = "ws://10.192.250.138:12345/p5websocket";
var IP_VOISIN = "10.192.232.32";

// Tableau qui va contenir une liste d'objets
var listObjects = [];

// --------------------------------------------
function setup()
{
  	createCanvas(500, 500);
	connect(URL_SERVER);
}

// --------------------------------------------
function draw()
{
	background(255);

	// On parcourt la liste des objets avec une boucle for
	for (var i=listObjects.length-1;i>=0;i--)
	{	
		// Mise à jour des propriétés de la particule
		listObjects[i].update();	

		// Dessin de la particule
		listObjects[i].draw();

		// Si la particule [i] est «out», on l'enlève de la liste 
		if (listObjects[i].out)
			listObjects.splice(i,1);

	}

	// Imprime le nombre d'objets en cours dans la liste
	text(listObjects.length,10,12);
}

// --------------------------------------------
function onMessage(otherObject)
{
	// console.log(otherObject);
	// «otherObject» contient l'objet reçu par ce sketch
	// à partir de ces propriétés on va créer un objet du type qui est définit ici, dans ce sketch
	// if (otherObject.name == "circle")
	{
		// console.log("received " + otherObject);
		var myObject = new MyObject(0, otherObject.y);
		listObjects.push( myObject );
	}
}

// --------------------------------------------
// Définition d'une classe «MyObject»
// qui peut être différente de celle qui a été
// utilisée pour envoyer à ce sketh des données 
function MyObject(x_, y_)
{
	// Propriétés de l'objet
	// > type
	this.name = "rectangle";
	// > position
	this.x = x_;
	this.y = y_;
	// > vitesse
	this.vx = random(3,6);
	this.vy = 0;//random(-2,2);
	// > diametre
	this.diameter = random(5,10);
	// > flag pour dire s'il est sorti ou non de l'écran
	this.out = false;

	// Méthode de mise à jour 
	this.update = function()
	{
		// Mouvement 
		this.x += this.vx;
		this.y += this.vy;
		// Gestion du rebond
		if(this.y+this.diameter/2<0)
		{
			this.y	= this.diameter/2;
			this.vy *= -1;
		}
		else if(this.y-this.diameter/2>height)
		{
			this.y	= height - this.diameter/2;
			this.vy *= -1;
		}
		// Est-on sorti de l'écran ? 
		// Oui -> on envoit les données au voisin
		if (this.x-this.diameter>=width && this.out == false)
		{
			send(IP_VOISIN, this);
			this.out = true;
		}
	}

	// Méthode de dessin
	this.draw = function()
	{
		rectMode(CENTER);
		noStroke();
		fill(0);
		rect(this.x,this.y,10,10);
	}
}