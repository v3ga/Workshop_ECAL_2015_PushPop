/*

ECAL 
16-20 Novembre 2015
—
Julien '@v3ga' Gachadoat
—
wsp5

*/

// ------------------------------------------------------
// L'adresse du serveur pour se connecter
// Noter la forme particulière en "ws://..."
String URL_SERVER = "ws://MacBook-Pro-de-Julien.local:12345/p5websocket";

// ------------------------------------------------------
// Stockage du dernier message reçu
JSONObject msg;

float diameter = 0.0;

// Vitesse à laquelle le cercle va se rétracter
float diameterSpeed = 0.6;

// ------------------------------------------------------
void setup()
{
  // Taille de la fenêtre de travail
  size(500,500);
  
  // Titre de la fenêtre
  frame.setTitle("Client (réception de données)");
  
  // Connexion au serveur
  // (surveiller la console pour voir les erreurs éventuelles)
  connect(URL_SERVER);
}

// ------------------------------------------------------
void draw()
{
  background(255);
  noStroke();
  fill(0);
  ellipse(250,250,diameter,diameter);
  diameter += -diameter*diameterSpeed;
}

// ------------------------------------------------------
// Fonction qui permet de recevoir les données
// envoyées par le serveur
void onMessage(JSONObject data)
{
  diameter = 500;
  diameterSpeed = random(0.05,0.15);
}




