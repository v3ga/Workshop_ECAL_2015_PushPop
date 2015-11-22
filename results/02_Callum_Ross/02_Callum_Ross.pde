//INFOS RESEAU
String URL_SERVER = "ws://10.192.234.111:12345/p5websocket";
String IP_DESTINATION_1 = "10.192.250.59";
//String IP_DESTINATION_1 = "10.192.234.109";

//INFOS GENERALES
PImage baseImage;
PImage remixed;
int radius = 20;
float displacement = 5;
PVector speed = new PVector();
PVector[] lastMouseCoords = new PVector[15];
float trigFactor = 200;
float stretchFactor = 200;
ArrayList<Warper> warpers = new ArrayList<Warper>();
String imageFile = "gradientLovemini.png";
void setup() {
  fullScreen();
  baseImage = loadImage(imageFile);
  remixed = loadImage(imageFile);
  for(int i = 0; i < lastMouseCoords.length; i++) {
    lastMouseCoords[i] = new PVector();
    lastMouseCoords[i].x = 0;
    lastMouseCoords[i].y = 0;
  }
  //warpers.add(new Warper(random(0,remixed.height)));
  noCursor();
  //connecter au serveur
  connect(URL_SERVER);
}
void draw() {
    //image edit
    baseImage.loadPixels();
    remixed.loadPixels();
    for(int j = 0; j < warpers.size();j++) {
      Warper thiswarper = warpers.get(j);
      thiswarper.update();
      for(int i = 0; i < baseImage.pixels.length; i++) {
        int ix = i%baseImage.width;
        int iy = floor(i/baseImage.width);
        float fIx = ix * -thiswarper.speed.x/thiswarper.speed.y + thiswarper.y + thiswarper.speed.x*thiswarper.x/thiswarper.speed.y;
        if( sqrt(pow(thiswarper.x-ix, 2)+ pow(thiswarper.y-iy, 2)) < radius 
        && ((fIx < iy && thiswarper.speed.y > 0)
        || (fIx > iy && thiswarper.speed.y < 0))) {
          float per = 2*(radius - sqrt(pow(thiswarper.x-ix, 2)+ pow(thiswarper.y-iy, 2)))/radius;
          float percent;
          if (per < 1) {
            percent = per*per/2;
          }
          else {
            per--;
            percent =  -(per*(per-2) - 1)/2;
          }
          //float percent = -pow(per, 2) + 2 *per;
          float warpX = constrain(ix - percent*displacement*thiswarper.speed.x/thiswarper.speed.mag(), 0, baseImage.width-2);
          float warpY = constrain(iy - percent*displacement*thiswarper.speed.y/thiswarper.speed.mag(), 0, baseImage.height-2);
          //remixed.pixels[i] = baseImage.pixels[floor(warpX) + floor(warpY*baseImage.width)];
          remixed.pixels[i] = getColor(warpX, warpY);
        }
      }
      //if a point is out of screen, delete it and send to next
      if(thiswarper.x > remixed.width) {
        JSONObject data = new JSONObject();
        data.setFloat("y", thiswarper.y/remixed.height);
        warpers.remove(j);
        sendIP(IP_DESTINATION_1, data);
      }
    }
    baseImage.updatePixels();
    remixed.updatePixels();
    //image(remixed, 0, 0, width, height);
    for(int x = 0; x < remixed.width; x++) {
      for(int y = 0; y < remixed.height; y++) {
        for(int i = 0; i < 4; i++) {
          for(int j = 0; j < 4; j++) {
            set(x*4+i, y*4+j, remixed.get(x, y));
          }
        }
      }
    }
    
}
void keyPressed() {
  saveFrame("framesave-######.png");
  //warpers.add(new Warper(random(0, 1) * remixed.height));
  baseImage = loadImage(imageFile);
  remixed = loadImage(imageFile);
}
color getColor(float _x, float _y) {
  int thisx = floor(_x);
  int thisy = floor(_y);
  float px = _x - thisx;
  float py = _y - thisy;
  float redValue = 0;
  float greenValue = 0;
  float blueValue = 0;
  float weight;
  color pointColor;
  //first point
  weight = (1-px)*(1-py);
  pointColor = baseImage.pixels[thisx + thisy*baseImage.width];
  redValue += weight*red(pointColor);
  greenValue += weight*green(pointColor);
  blueValue += weight*blue(pointColor);
   //second point
  weight = (1-px)*(py);
  pointColor = baseImage.pixels[thisx + 1 + thisy*baseImage.width];
  redValue += weight*red(pointColor);
  greenValue += weight*green(pointColor);
  blueValue += weight*blue(pointColor);
   //third point
  weight = (px)*(1-py);
  pointColor = baseImage.pixels[thisx + (thisy+1)*baseImage.width];
  redValue += weight*red(pointColor);
  greenValue += weight*green(pointColor);
  blueValue += weight*blue(pointColor);
   //fourth point
  weight = px*py;
  pointColor = baseImage.pixels[thisx+1 + (thisy+1)*baseImage.width];
  redValue += weight*red(pointColor);
  greenValue += weight*green(pointColor);
  blueValue += weight*blue(pointColor);
  
  return color(int(constrain(redValue, 0, 255)), int(constrain(greenValue, 0, 255)), int(constrain(blueValue, 0, 255)));
}
void onMessage(JSONObject data) {
  JSONObject msg = data;
  baseImage = remixed.get();
  warpers.add(new Warper(data.getFloat("y") * remixed.height));
  println(data.getFloat("y"));
}