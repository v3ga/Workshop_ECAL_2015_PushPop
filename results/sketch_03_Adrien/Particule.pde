class Particule
{
  float x,y;
  float vx,vy;
  
  Particule()
  {
    this.x = this.y = 0;
    this.vx = this.vy = 0;
  }
  
  Particule(float x_, float y_)
  {
    setPosition(x_,y_);
  }
  
  void setPosition(float x_, float y_)
  {
    this.x = x_;
    this.y = y_;
  }

  void setSpeed(float vx_, float vy_)
  {
    this.vx = vx_;
    this.vy = vy_;
  }
  
  void update()
  {
    this.x += vx;
    this.y += vy;
  }
  
  void draw()
  {
    
  }
  
  boolean isOut()
  {
    if (this.x >= width)
      return true;
    return false;
  }
  
}
