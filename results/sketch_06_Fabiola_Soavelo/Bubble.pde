class Bubble{
  PVector pos;
  PVector vel;
  float time;
  float tremblements;
  float st;
  float sz = random(5,40);
  
  Bubble(){
    time = 0;
    st = random(0.1,0.5);
    pos = new PVector(random(width), random(height));
    vel = new PVector(0,random(-3,-1));
    sz = map(vel.y, -3,-1, 40, 5);
  }
   
  void update(){
    time += st;
    if (time > 64) time = 0;
    move();
    render();
  }
   
  void move(){
    pos.add(vel);
    if (pos.y+sz/2<0){
      pos.y = height+sz/2;
    }

}
   
  void render(){
    fill(255,time);
    noStroke();
    tremblements = pos.x + noise(time*0.2)*10;
    ellipse(tremblements, pos.y,sz,sz);
  }
}