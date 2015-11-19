// ----------------------------------------
class Bestiole
{
  float x, y;
  PVector points[];
  float diameter[];
  float diameterMin = 0;
  float diameterMax = 0;
  PVector dir = new PVector();
  PVector dirP = new PVector();
  float amplitudeMouvement = random(2.0f);
  float vitesse = random(4,8); // vitesse de déplacement
  float angle = 0;

  // ----------------------------------------
  void setup(int nb, float dMax, float dMin, float yin, float yout)
  {
    points = new PVector[nb];
    diameter = new float[nb];
    diameterMin = dMax;
    diameterMax = dMin;
    dir.set( width, yout-yin );
    dir.normalize();
    dirP.set(-dir.y, dir.x); // perpendicular vector
    dirP.normalize();

    for (int i=0; i<nb; i++)
    {
      points[i] = new PVector(0,yin);
      diameter[i] = 0;
    }
  }

  // ----------------------------------------
  void setPosition()
  {
    int nb = points.length;
//    points[0].set(x, y);
    for (int i=1;i<nb;i++)
    {
      points[i].x += (points[i-1].x - points[i].x)*0.6; // essayer de changer 0.2
      points[i].y += (points[i-1].y - points[i].y)*0.6;
    }
  }

  // ----------------------------------------
  boolean isOut()
  {
    int nb = points.length;
    for (int i=0;i<nb;i++)
    {
        if (points[i].x-diameter[i]/2 < width)
          return false;
    }
    return true;
  }

  // ----------------------------------------
  void draw()
  {
    angle += 10.0f;
    
    float dx = dir.x + sin(radians(angle))*amplitudeMouvement*dirP.x; 
    float dy = dir.y + sin(radians(angle))*amplitudeMouvement*dirP.y; 
    
    points[0].x += vitesse*dx;
    points[0].y += vitesse*dy;

    setPosition();

    
    noStroke();
    fill(0);
    int nb = points.length;
    for (int i=nb-1;i>=0;i--)
    {
      diameter[i] = map(i, 0, nb-1, diameterMin, diameterMax);
      fill( (i%2==0) ? 0 : 255);
      ellipse( points[i].x, points[i].y, diameter[i], diameter[i] );
    }
  }
};

