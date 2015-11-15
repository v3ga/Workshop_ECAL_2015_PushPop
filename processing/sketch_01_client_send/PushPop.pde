// ------------------------------------------------------
import wsp5.*;

// ------------------------------------------------------
WsClient client;

// ------------------------------------------------------
void connect(String server)
{
  try 
  {
    client = new WsClient( this, server);
    client.connect();
  } catch ( Exception e ){
  }
}

// ------------------------------------------------------
void send(JSONObject data)
{
  JSONObject dataEmbed = new JSONObject();
  dataEmbed.setJSONObject("data", data);
  send(dataEmbed.toString());
}

// ------------------------------------------------------
void send(String destination, JSONObject data)
{
  JSONObject dataEmbed = new JSONObject();
  dataEmbed.setString("destination", destination);
  dataEmbed.setJSONObject("data", data);
  send(dataEmbed.toString());
}

// ------------------------------------------------------
void sendIP(String ip, JSONObject data)
{
  JSONObject dataEmbed = new JSONObject();
  dataEmbed.setString("ip", ip);
  dataEmbed.setJSONObject("data", data);
  send(dataEmbed.toString());
}

// ------------------------------------------------------
void send(String msg)
{
  client.send(msg);
}

// ------------------------------------------------------
// Réception d'un message au format String
// qui est décodé au format JSON pour être transmis
// à la fonction onMessage du sketch
void onWsMessage( String msg )
{
  JSONObject data = JSONObject.parse( msg );
  
  // Si le message contient une clé «data», alors on transmet
  if (data.hasKey("data"))
  {
     onMessage( data.getJSONObject("data") );  
  }
  // Sinon on indique une erreur sur la console
  else
  {
    println("PushPop - le message reçu ne contient pas de clé \"data\" ");
  }
  
}

// ------------------------------------------------------
// Fonction appelée lorsque la websocket est connectée
void onWsOpen()
{
  println("PushPop - websocket connectée");
}
// ------------------------------------------------------
// Fonction appelée lorsque la websocket est fermée
void onWsClose()
{
  println("PushPop - websocket fermée");
}

