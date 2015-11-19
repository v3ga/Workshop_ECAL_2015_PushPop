// ----------------------------------------
String URL_SERVER = "ws://192.168.10.118:12345/p5websocket"; // à changer
String IP_VOISIN = "192.168.10.118"; // à changer

// ----------------------------------------
Flock flock;

// Période d'émission des boids (en secondes, min & max)
float BOID_EMISSION_PERIOD_MIN = 0.5;
float BOID_EMISSION_PERIOD_MAX = 1.5;

// Nombre de boids émis (en secondes, min & max)
int BOID_EMISSION_NB_MIN = 3;
int BOID_EMISSION_NB_MAX = 8;

// ----------------------------------------
void setup() 
{
  size(640, 360);
  flock = new Flock();

  connect(URL_SERVER);
}

// ----------------------------------------
synchronized void draw() 
{
  // Dessin du fond
  background(50);

  // Mise à jour + dessin des boids
  flock.run();

  // On enlève les boids qui ont dépassé l'écran + on envoie un message
  int nbBoids = flock.boids.size();
  for (int i=nbBoids-1; i>=0; i--)
  {
    Boid b = flock.boids.get(i);
    // Hors de l'écran ?
    if (b.isOut())
    {
      if (b.generation == 0)
      {
        // envoi des données
        JSONObject data = new JSONObject();
        data.setFloat("y", b.location.y/height);  
        sendIP(IP_VOISIN, data);
      }

        // on l'enlève de la liste de boids
        flock.boids.remove(i);
    }
  }
}

// ----------------------------------------
synchronized void mousePressed() 
{
  flock.addBoid(new Boid(0, mouseY, width, random(0.3*height, 0.7*height)));
}

// ----------------------------------------
synchronized void onMessage(JSONObject data)
{
  // Extraction de la donnée "y" du message
  float y = data.getFloat("y")*height;
  // On génère un boid 
  flock.addBoid(new Boid(0, y, width, random(0.3*height, 0.7*height)));
}

