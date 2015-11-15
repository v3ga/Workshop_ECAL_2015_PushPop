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

// IP de la machine à qui nous allons envoyer les données
// (voir la méthode send())
String IP_DESTINATION_1 = "172.20.10.3";

// IP d'une autre destination
// String IP_DESTINATION_2 = "172.20.10.1";

// ------------------------------------------------------
void setup()
{
  // Taille de la fenêtre de travail
  size(500, 500);

  // Titre de la fenêtre
  frame.setTitle("Client (envoi de données à un destinataire)");

  // Connexion au serveur
  // (surveiller la console pour voir les erreurs éventuelles)
  connect(URL_SERVER);
}

// ------------------------------------------------------
void draw()
{
  ellipse(mouseX, mouseY, 50, 50);
}

// ------------------------------------------------------
void mouseMoved()
{
  // Les données au serveur sont transmise au format JSON
  JSONObject data = new JSONObject();
  data.setFloat("x", mouseX);  
  data.setFloat("y", mouseY);  

  // Envoi des données au destinataire
  sendIP(IP_DESTINATION_1, data);
  // sendIP(IP_DESTINATION_2, data);
}

// ------------------------------------------------------
// Fonction qui permet de recevoir les données
// envoyées par le serveur
void onMessage(JSONObject data)
{
}



