class Warper { 
  float x, y;
  PVector speed = new PVector();
  int limit = 10;
  float[] keyPoints = new float[1+floor(random(3, 6))];
  Warper (float _y) {  
    x = 0;
    y = _y;
    speed.x = 5;
    speed.y = 0;
   // speed.normalize(); 
   keyPoints[0] = _y;
   for(int i = 1; i < keyPoints.length; i++) {
     keyPoints[i] = random(limit, remixed.height-limit);
   }
  } 
  void update() { 
    float tempY = y;
    x += speed.x;
    int zone = floor((keyPoints.length-1) * x / (remixed.width+11));
    float zoneWidth = (remixed.width+10)/(keyPoints.length-1);
    float particlePercent = (x - zone*zoneWidth)/zoneWidth;
    y = keyPoints[zone] - (cos(PI * particlePercent) - 1)*(keyPoints[zone+1]-keyPoints[zone])/2;
    speed.y = y-tempY;
    println(x);
  }
} 