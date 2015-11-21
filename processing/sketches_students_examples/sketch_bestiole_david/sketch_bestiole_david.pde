ArrayList<Bestiole> listeBestioles;
Bestiole b;

float yin = 0;

// ----------------------------------------
void setup()
{
  size(800, 600);
  listeBestioles = new ArrayList<Bestiole>();
  
  yin = height/2;
}

// ----------------------------------------
void draw()
{
  background(255);
  for (Bestiole b : listeBestioles)
  {
    b.draw();
  }
  
  for (int i=listeBestioles.size()-1; i>=0; i--)
  {
    if (listeBestioles.get(i).isOut())
      listeBestioles.remove( i );
  }

  text(listeBestioles.size(), 4, 12);
}

// ----------------------------------------
void mousePressed()
{
  Bestiole b = new Bestiole();
  b.setup(10,20,50, yin, random(height/2-200,height/2+200)); // nombre de cercles, diametre maximum, diametre minimum, valeur de yin,valeur de yout
  listeBestioles.add(b);
}


