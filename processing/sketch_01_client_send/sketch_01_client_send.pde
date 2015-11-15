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
void setup()
{
  // Taille de la fenêtre de travail
  size(500,500);
  
  // Connexion au serveur
  // (surveiller la console pour voir les erreurs éventuelles)
  connect(URL_SERVER);
}

// ------------------------------------------------------
void draw()
{
  ellipse(mouseX,mouseY,50,50);
}

// ------------------------------------------------------
void mouseMoved()
{
  // Les données au serveur sont transmise au format JSON
  JSONObject data = new JSONObject();
  data.setFloat("x", mouseX);  
  data.setFloat("y", mouseY);  

  // Envoi des données 
  send(data);
}

// ------------------------------------------------------
// Fonction qui permet de recevoir les données
// envoyées par le serveur
void onMessage(JSONObject data)
{
}




