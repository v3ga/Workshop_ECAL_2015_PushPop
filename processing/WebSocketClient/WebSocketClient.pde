void setup()
{
  size(500,500);
  connect("ws://MacBook-Pro-de-Julien.local:12345/p5websocket");
}

void draw(){
}

void mouseMoved()
{
  JSONObject data = new JSONObject();
  data.setFloat("x", mouseX);  
  data.setFloat("y", mouseY);  

  send(data);
}
  

void onMessage(String msg)
{
  
}


