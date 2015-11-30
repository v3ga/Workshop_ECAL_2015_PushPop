class ListParticule extends ArrayList<Particule>
{
   
  void update()
  {
    for (Particule p : this)
    {
      p.update();
    }
  }
  
  void draw()
  {
    for (Particule p : this)
    {
      p.draw();
    }
  }
}
