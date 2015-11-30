
// blue 0,152,216
// orange 245, 65, 35
// beige 229, 231, 222
// green 11, 53, 54

function Particle(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.a = 255;
    this.val = sin(frameCount*10)*random(10,30);
    this.rand = this.val*3 +1;

    this.addForce = function(force) {
        this.acc.add(force);
    }

    this.checkEdges = function() {

        // Left edge
        if (this.pos.x < 0){
            this.vel.x = Math.abs(this.vel.x);
        }

        // Bottom
        if (this.pos.y > height){
            this.vel.y = -Math.abs(this.vel.y);
        }

        // right edge
        if (this.pos.x > width){
            var normalisedY = this.pos.y / height;
            send(IP_VOISIN, { y: normalisedY});

            // enlever
            var index = particles.indexOf(this);
            particles.splice(index, 1);

        }

    }

    this.update = function() {
        this.vel = this.vel.add(this.acc);

        this.pos.add(this.vel);
        this.acc.mult(0);

        this.checkEdges();
    }

    this.createDot = function() {
        noStroke();
        fill(245, 65, 35, this.a);
        ellipse(this.pos.x, this.pos.y, this.val, this.val);
        ellipse(this.pos.x, this.pos.y, this.val, this.val);

    }

    this.createAura = function() {

        fill(0, 152, 216,this.a*.05);
        strokeWeight(.5);
        stroke(0, 152, 216,this.a);
        ellipse(this.pos.x, this.pos.y, this.val*10, this.val*10);

    }

    this.createCircles = function() {
        push();
        strokeWeight(.5);
        stroke(11, 53, 54,this.a);
        noFill();
        var rand = random(5,10);
        ellipse(this.pos.x, this.pos.y,rand*this.val,rand*this.val);
    }


    this.alpha = function () {

        this.a -= .1;
    }

    this.wiggle = function() {

            this.pos.x = random(this.pos.x-30, this.pos.x+30);
            this.pos.y = random(this.pos.y-this.rand, this.pos.y+this.rand);
    }


    this.isOut = function() {
      if (this.pos.x > width || this.pos.y > height){
          return true;
      }
      return false;
    }

    this.evolving = function() {

      var k = random(.7,1.3);

      this.val *=k;
    }

}

    // // // //

function Repeller(x, y, power) {
    this.pos = createVector(x, y);
    this.power = power;

    this.display = function() {
        fill(229, 231, 222);
        noStroke();
        ellipse(this.pos.x, this.pos.y, this.power, this.power);
    }

}
