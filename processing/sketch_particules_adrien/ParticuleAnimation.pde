class ParticuleAnimation extends Particule
{
  Animation anim;
  Animation anim2;
  int frame;
  float time=0;
  float period=0;
  
  ParticuleAnimation(Animation anim_, Animation anim2_, float x_, float y_, float period_, float vx_)
  {
    anim = anim_;
    anim2 = anim2_;
    frame = (int)random(anim.imageCount);
    setPosition(x_,y_);
    time = millis();
    period = period_*100;
    setSpeed(vx_,0);
  }
 
  void draw()
  {
    // Changement d'image
    if (millis()-time>period)
    {
      time = millis();
      frame=(frame+1)%anim.imageCount;
    }
    
    // Animation
    if (x<=width/2)
    {
      anim.display(frame, this.x, this.y);
    }
    else
    {
      noStroke();
      fill(0);
      ellipse(this.x, this.y, 30,30);
    }
  }
    
}
