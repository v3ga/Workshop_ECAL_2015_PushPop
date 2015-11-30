class ParticuleAnimation extends Particule
{
  Animation anim;
  Animation anim2;
  int frame;
  float time=0;
  float period=0;
  float angle=random(20);
  float yStart = 0;
  float angleOffset = random(90);
  
  ParticuleAnimation(Animation anim_, Animation anim2_, float x_, float y_, float period_, float vx_)
  {
    anim = anim_;
    anim2 = anim2_;
    frame = (int)random(anim.imageCount);
    setPosition(x_,y_);
    time = millis();
    period = period_*100;
    setSpeed(vx_,0);
    this.yStart = y_;
  }

  void update()
  {
    this.angle+=2;
    this.x += vx;
    this.y = yStart + 15*sin( radians(3*angle + angleOffset) );
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
      pushMatrix();
      translate(this.x, this.y);
      rotate(-radians( 3*sin(radians(3*angle+angleOffset))));
      anim.display(frame, 0, 0);
      popMatrix();
    }
    else
    {
      noStroke();
      //fill(#e5e7de);
      anim2.display(frame, this.x, this.y);
      //ellipse(this.x, this.y, 20,20);
    }
  }
    
}