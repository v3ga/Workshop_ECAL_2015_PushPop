// The Flock (a list of Boid objects)

class Flock {
  ArrayList<Boid> boids; // An ArrayList for all the boids

    Flock() {
    boids = new ArrayList<Boid>(); // Initialize the ArrayList
  }

  void run() 
  {
    ArrayList<Boid> childrenAdd = new ArrayList<Boid>();
    for (Boid b : boids) 
    {
      ArrayList<Boid> children = b.run(boids);  // Passing the entire list of boids to each boid individually
      if (children !=null)
      {
        for (Boid c : children)
        {
          childrenAdd.add(c);
        }
      }
    }


    for (Boid child : childrenAdd)
    {
        addBoid( child );
    }
  }

  void addBoid(Boid b) {
    boids.add(b);
  }
}

