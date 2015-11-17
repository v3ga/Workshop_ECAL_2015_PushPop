// ------------------------------------------------------
import org.webbitserver.*;

// ------------------------------------------------------
// Serveur qui traite les réceptions + transmissions de données
WebSocketServerP5 socket;

// Liste qui associe ip <-> destinations
HashMap<String, String> mapDestinations = new HashMap<String,String>();

// ------------------------------------------------------
void setup() 
{
  size( 400, 400 );
  loadDestinations();
  socket = new WebSocketServerP5( this, 12345 );
  frame.setTitle("Serveur");
}

// ------------------------------------------------------
void draw() 
{
  background(255);
  // Imprime la liste des connexions
  String s="";
  synchronized(socket.connections)
  {
    for (WebSocketConnection connection : socket.connections)
    {
      s+= socket.getIP( connection )+"\n";
    }
  }
  fill(0);
  text(s,5,12);
}

// ------------------------------------------------------
void stop() 
{
  socket.stop();
}


// ------------------------------------------------------
void loadDestinations()
{
  //XML xml = loadXML(config);
}

// ------------------------------------------------------
void websocketOnMessage(WebSocketConnection con, String msg) 
{
  JSONObject msgJson = JSONObject.parse(msg);
  if (msgJson.hasKey("destination"))
  {
      // Retrouve l'ip de la destination dans notre liste
      
  }
  else if (msgJson.hasKey("ip"))
  {
    ArrayList<WebSocketConnection> listClients = getAllWebSocketConnectionByIP( msgJson.getString("ip") );   
    for (WebSocketConnection client : listClients)
    {
      if (client != null)
      {
        // println("sending to destination "+msgJson.getString("ip"));
        client.send( msg );
      }
    }
  }
  // Transmet le message à tous les clients sans distinction
  else
  {
    socket.broadcast(msg);
  }

  // println("data from : "+ socket.getIP(con) );
}

// ------------------------------------------------------
void websocketOnOpen(WebSocketConnection con) 
{
  println("A client joined : "+ socket.getIP(con) );
}

// ------------------------------------------------------
void websocketOnClosed(WebSocketConnection con) 
{
   // println("A client left");
}

