// --------------------------------------------
ArrayList fish;
String URL_SERVER = "ws://10.192.234.111:12345/p5websocket";
String IP_VOISIN = "10.192.234.81"; // à changer

// --------------------------------------------
ArrayList<Bubble> bubbles = new ArrayList<Bubble>();
int border;

void setup() 
{
  noCursor();
  fullScreen();
  strokeWeight(5);
  strokeJoin(ROUND);
  stroke(#fcea04, 50);
  fish = new ArrayList<Fish>();
  connect(URL_SERVER);

  // -------------------Bubbles-----------------

  border = 100;
  frameRate(30);
  for (int i = 0; i < 40; i++) {
    bubbles.add(new Bubble());
  }
}

// --------------------------------------------
synchronized void draw() 
{
  fill(11, 53, 54);
  rect(-10, -10, width+20, height+20);
  //fill(random(256),200);
  println(bubbles.get(39).tremblements);

  for (int i = 0; i < fish.size (); i++) 
  {
    Fish f = (Fish) fish.get(i);
    f.draw();
    f.boundaries();
  }

  for (int i = fish.size()-1; i >=0; i--) 
  {
    Fish f = (Fish) fish.get(i);

    if ( f.isOut() )
    {
      JSONObject data = new JSONObject();
      data.setFloat("y", f.loc.y/height);  

      //  Envoi des données au destinataire
      sendIP(IP_VOISIN, data);            

      fish.remove(i);
    }
    
  // --------------------------------------------

  }
  
  for (int i = 0; i <bubbles.size(); i++) 
  {
    bubbles.get(i).update();
  }
  
}

// --------------------------------------------
synchronized void onMessage( JSONObject data )
{
  float y = data.getFloat("y") * height;
  fish.add( new Fish(y) );
}

// --------------------------------------------
synchronized void mousePressed( )
{
  fish.add( new Fish(mouseY) );
}