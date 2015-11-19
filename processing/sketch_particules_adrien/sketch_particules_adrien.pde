ListParticule particules;
Animation anim,anim2;

// ------------------------------------------------------
void setup()
{
  size(displayWidth, displayWidth,P3D); 
  anim = new Animation("particules_", 17); 
  //anim2 = new Animation("particules_", 17); 
  particules = new ListParticule();
}

// ------------------------------------------------------
void draw()
{
  background(120);
  particules.update();
  particules.draw();
}

// ------------------------------------------------------
void mousePressed()
{
  particules.add( new ParticuleAnimation(anim,anim2, 0,mouseY, 0.35, random(6,10)) );
}
