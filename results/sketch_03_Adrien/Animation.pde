class Animation 
{
  PImage[] images;
  int imageCount;
  float offsetx, offsety;
  
  Animation(String imagePrefix, int count) 
  {
    imageCount = count;
    images = new PImage[imageCount];

    for (int i = 1; i <= imageCount; i++) 
    {
      // Use nf() to number format 'i' into four digits
      String filename = imagePrefix + nf(i, 2) + ".png";
      images[i-1] = loadImage(filename);
    }
  }

  void display(int frame, float xpos, float ypos) {
    image(images[frame], xpos-offsetx, ypos-offsety);
  }
  
  int getWidth() {
    return images[0].width;
  }
}