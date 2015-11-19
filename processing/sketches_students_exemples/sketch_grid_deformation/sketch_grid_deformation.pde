// ------------------------------------------------------
RuttEtraizer re;
PGraphics offscreen;
PImage imgParticle;

// ------------------------------------------------------
void setup()
{
  size(displayWidth, displayHeight, P3D);
  imgParticle = loadImage("ParticleWaterPerturbation.jpg");
  offscreen = createGraphics(width,height,P3D);
  re = new RuttEtraizer(offscreen, 10);
}

// ------------------------------------------------------
void draw()
{
  offscreen.beginDraw();
  offscreen.blendMode(ADD);
  offscreen.background(0);
  offscreen.imageMode(CENTER);
  offscreen.image(imgParticle,mouseX,mouseY);
  offscreen.image(imgParticle,mouseY,mouseX);
  offscreen.endDraw();

  background(0);
  stroke(255);
    
  re.apply();

  if (re!=null)
  {
    pushMatrix();
    translate(width/2, height/2, 0);
    stroke(255);
    re.draw(this, 10);
    popMatrix();
    image(re.getImageResized(),0,0);
  }
  
}

// ------------------------------------------------------
void keyPressed()
{
  if (key >= '1' && key <='6') re.setDrawMode(key-'0');
}

