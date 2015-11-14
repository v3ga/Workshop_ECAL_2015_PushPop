import wsp5.*;

WsClient client;

void connect(String server)
{
  // you need to wrap this in a try/catch for now...
  try 
  {
    client = new WsClient( this, server);
    client.connect();
  } catch ( Exception e ){
  }
}

void send(JSONObject data)
{
  dataEmbed = new JSONObject();
  dataEmbed.setJSONObject("data", data);
  send(dataEmbed.toString());
}

void send(String msg)
{
  client.send(msg);
}

void send(String msg, String destination)
{
  
}

void onWsOpen(){
}

void onWsMessage( String msg ){
  onMessage(msg);
}

void onWsClose(){
}
