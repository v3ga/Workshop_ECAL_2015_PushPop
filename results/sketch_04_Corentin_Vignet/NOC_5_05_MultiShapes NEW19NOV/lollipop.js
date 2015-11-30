// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// A rectangular box


// Constructor
function Lollipop(x, y)
{
  this.w = 8;
  this.h = 24;
  this.r = 8;

  // Define a body
  var bd = new box2d.b2BodyDef();
  bd.type = box2d.b2BodyType.b2_dynamicBody;
  bd.position = scaleToWorld(x,y);

  // Define fixture #1
  /*
  var fd1 = new box2d.b2FixtureDef();
  // Fixture holds shape
  fd1.shape = new box2d.b2PolygonShape();
  fd1.shape.SetAsBox(scaleToWorld(this.w/2), scaleToWorld(this.h/2));
  fd1.density = 1.0;
  fd1.friction = 0.5;
  fd1.restitution = 0.2;
*/
  // Define fixture #2
  var fd2 = new box2d.b2FixtureDef();
  fd2.shape = new box2d.b2CircleShape();
  fd2.shape.m_radius = scaleToWorld(this.r);
  var offset = scaleToWorld(new box2d.b2Vec2(0,-this.h/2));
  fd2.shape.m_p = new box2d.b2Vec2(offset.x,offset.y);
  fd2.density = 1.0;
  fd2.friction = 0.0;
  fd2.restitution = 0.7;

  // Create the body
  this.body = world.CreateBody(bd);
  // Attach the fixture
//  this.body.CreateFixture(fd1);
  this.body.CreateFixture(fd2);

  // Some additional stuff
  this.body.SetLinearVelocity(new box2d.b2Vec2(random(25, 45), random(-1, 1)));
    this.body.SetAngularVelocity(random(-5,5));

  // This function removes the particle from the box2d world
  this.killBody = function() {
    world.DestroyBody(this.body);
  }

  // Is the particle ready for deletion?
  this.done = function() {
    // Let's find the screen position of the particle
    var pos = scaleToPixels(this.body.GetPosition());
    // Is it off the bottom of the screen?
    if (pos.x > width || pos.x<0) {
      this.killBody();
      return true;
    }
    return false;
  }

  this.getY = function() {
    var pos = scaleToPixels(this.body.GetPosition());
    return pos.y;
  }

  // Drawing the box
  this.display = function() {
    // Get the body's position
    var pos = scaleToPixels(this.body.GetPosition());
    // Get its angle of rotation
    var a = this.body.GetAngleRadians();

    // Draw it!
    rectMode(CENTER);
    push();
    translate(pos.x, pos.y);
    rotate(a);


    fill(245,65,35);
      //fill(0,152,216);
    stroke(245,65,35);
    strokeWeight(2);

    //rect(0,0,this.w,this.h);
    ellipse(0, -this.h/2, this.r*2, this.r*2);
    pop();
  }
}
