function Obj(_x, _y) {

   this.x = _x;
   this.y = _y;
   this.y0 = _y;
   //this.val = 20;
   this.val = sin(frameCount*.5)*5;
   this.rand = this.val*3 +1;
   this.a = 255;

  this.createTriangle = function() {
      strokeWeight();
      stroke(255,255,0,this.a);
      noFill();
      triangle(this.x-10, this.y-10, this.x+10, this.y+10, this.x+20, this.y-20);

    }

    this.createDot = function() {
        noStroke();
        fill(100,255,0, this.a);
        ellipse(this.x, this.y, this.val, this.val);

    }

    this.createAura = function() {

        fill(0,100,100,2);
        strokeWeight(.2);
        stroke(0,255,255,this.a);
        ellipse(this.x, this.y, this.val*10, this.val*10);


    }

  this.wiggle = function() {

      var m = map(this.x, 0,width,20,3);
      var dy = m*sin(frameCount*.5)*5;


      if (this.x > width*.66)
      {
          this.x += 10;
          this.y = random(this.y -2, this.y +2);
      }
      else
      {
          this.x = random(this.x, this.x+10);
          this.y = random(this.y-this.rand, this.y+this.rand);
      }
  }

  this.alpha = function (){

      this.a -= .5;
  }

  this.isOut = function()
  {
      if (this.x > width){
          return true;
      }
      return false;
  }


}
