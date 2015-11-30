// --------------------------------------------
class Fish 
{
  PVector loc;
  PVector vel;
  /* Just to add some individuality to the fish wiggle */
  float s = random(-50, 50);
  float d = random(0.3, 0.2);

  boolean isOut = false;

  Fish(float y) 
  {
    loc = new PVector (0, y);
    vel = new PVector(random(1, 5), random(-0.4, 0.4));
  }


  // --------------------------------------------
  boolean isOut() {
    return isOut;
  }
  // --------------------------------------------
  void draw() 
  {
    loc.add(vel);
    pushMatrix();
    translate(loc.x, loc.y);
    scale(d);
    rotate(vel.heading2D()-radians(90));
    beginShape();

    for (int i = 0; i <= 180; i+=10) {

      float normalizedX = map(this.loc.x, 0, width, 0, 10);
      float x = sin(radians(i)) * i/3 * normalizedX;
      float angle = sin(radians(i+s+frameCount*5)) * 50; 

      stroke(229,231,222);

      vertex(random(x*1), i*2);
      vertex(x*1, i*2);
    }

    for (int i = 180; i >= 0; i-=10) {
      float nX = map(this.loc.x, 100, width, 0, 10); 
      float x = sin(radians(i)) * i/3 * nX;
      float angle = sin(radians(i+s+frameCount*5)) * 50;
      vertex(-x*1, i*2);
      vertex(-x*1, i*2);
    }
    endShape();
    popMatrix();
  }

  void boundaries() 
  {
    if (loc.x > width+25) isOut = true;
    if (loc.y < -100) isOut = true;
    if (loc.y > height+100) isOut = true;
  }
}