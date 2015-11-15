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
  // On vérifie bien que la variable valide
  if (msg != null)
  {
    // On extrait les données
    // Le format doit être conforme aux données envoyées 
    // On peut vérifier si une clé existe avec la fonction msg.hasKey("x") par exemple
    float x = msg.getFloat("x");
    float y = msg.getFloat("y");
    
    // On utilise ces variables pour dessiner
    ellipse(x,y,50,50);
  }
}

// ------------------------------------------------------
// Fonction qui permet de recevoir les données
// envoyées par le serveur
void onMessage(JSONObject data)
{
  msg = data;
}




