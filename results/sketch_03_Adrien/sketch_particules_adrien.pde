import wsp5.*;

String URL_SERVER = "ws://10.192.234.111:12345/p5websocket";
String IP_VOISIN = "10.192.232.163";

ListParticule particules;
Animation anim,anim2;

// ------------------------------------------------------
void setup()
{
  size(displayWidth, displayHeight,P3D); 
  anim = new Animation("particules_", 17); 
  anim2 = new Animation("cellules_", 17); 
  particules = new ListParticule();

  anim.offsetx = 120.0;
  anim.offsety = 35.0;
  
  anim2.offsetx = 120.0;
  anim2.offsety = 35.0;
  
  connect(URL_SERVER);
  
}

// ------------------------------------------------------
synchronized void draw()
{
  //background(#0b3536);
  background(11,53,54);
  noCursor();
  //background(0);
  
 
  rectMode(CENTER);
  fill(#e5e7de);
  //noFill();
  stroke(#e5e7de);
  //strokeWeight(5);
  //rotateY(251);
  //println(mouseX);
  //rect(displayWidth/2,0,115,height*2);
  translate(60,0);
  quad(displayWidth/2,8,displayWidth/2,displayHeight-8,displayWidth/2.45,displayHeight/1.04,displayWidth/2.45,displayHeight/25);
  
  
  particules.update();
  particules.draw();
  
  for (int i=particules.size()-1; i>=0; i--)
  {
    if (particules.get(i).isOut())
    {
      JSONObject data = new JSONObject();
      data.setFloat("y", particules.get(i).y/height);
      sendIP(IP_VOISIN, data);
      
      particules.remove(i);
      
    }  
  }
  
}

// ------------------------------------------------------
synchronized void mousePressed()
{
  particules.add( new ParticuleAnimation(anim,anim2, 0,mouseY, 0.35, random(6,10)) );
}

// ------------------------------------------------------
synchronized void onMessage(JSONObject data)
{
  float y= data.getFloat("y") * height;
  particules.add( new ParticuleAnimation(anim,anim2, 0 ,y, 0.35, random(6,10)) );
}