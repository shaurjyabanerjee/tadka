//Flowfield Sketch Goop for wholesomecircuits.com
//Shaurjya Banerjee 2018

import p5 from 'p5';

module.exports =  function() {
var sketch = function(p) {

  var inc = 0.1;
  var scl = 10;
  var cols, rows;
  var zoff = 0;
  var particles = [];
  var flowfield;
  var color_vals = [];
  var which_color;


  p.setup = function () {
    p.createCanvas(p.windowWidth, p.windowHeight);
    cols = p.floor(p.width / scl);
    rows = p.floor(p.height / scl);
    flowfield = new Array(cols * rows);

    p.color_select();

    //Create Particle objects 
    for (var i = 0; i < 300; i++) {
      particles[i] = new Particle();
    }

    p.background(255);
  }

  p.draw = function () {

    var yoff = 0;
    for (var y = 0; y < rows; y++) {
      var xoff = 0;
      for (var x = 0; x < cols; x++) {
        var index = x + y * cols;
        var angle = p.noise(xoff, yoff, zoff) * p.TWO_PI * 4;
        var v = p5.Vector.fromAngle(angle);
        v.setMag(1);
        flowfield[index] = v;
        xoff += inc;
        p.stroke(0, 50);
      }
      yoff += inc;

      zoff += 0.0003;
    }

    for (var i = 0; i < particles.length; i++) {
      particles[i].follow(flowfield);
      particles[i].update();
      particles[i].edges();
      particles[i].display();
    }
  }


  //Color Crossfade Pairs
  //Hot Pink      (255,20,147) to Purple          (38,43,226)
  //Spring Green  (0,255,127)  to Light Sea Green (32,178,170)
  //Coral         (255,127,80) to Gold            (255,215,0)
  //Turquoise     (64,224,208) to Teal            (0,128,128)
  //Deep Sky Blue (0,191,255)  to Midnight Blue   (25,25,112)

  p.color_select = function() {
    
    //Global color selection variable
    which_color = p.floor(p.random(1, 5));

    if (which_color == 1) {
      //Color 1 - Hot Pink (255,20,147)
      color_vals[0] = 255; color_vals[1] = 20; color_vals[2] = 147;
      //Color 2 - Purple (38,43,226)
      color_vals[3] = 38; color_vals[4] = 43; color_vals[5] = 226;
      console.log("Hot Pink and Purple");
    }

    else if (which_color == 2) {
      //Color 1 - Spring Green (0,255,127)
      color_vals[0] = 0; color_vals[1] = 255; color_vals[2] = 127;
      //Color 2 - Light Sea Green (32,178,170)
      color_vals[3] = 32; color_vals[4] = 178; color_vals[5] = 170;
      console.log("Spring Green and Light Sea Green");
    }

    else if (which_color == 3) {
      //Color 1 - Coral (255,127,80)
      color_vals[0] = 255; color_vals[1] = 127; color_vals[2] = 80;
      //Color 2 - Gold (255,215,0)
      color_vals[3] = 255; color_vals[4] = 215; color_vals[5] = 0;
      console.log("Coral and Gold");
    }

    else if (which_color == 4) {
      //Color 1 - Turquoise (64,224,208)
      color_vals[0] = 64; color_vals[1] = 224; color_vals[2] = 208;
      //Color 2 - Teal (0,128,128)
      color_vals[3] = 0; color_vals[4] = 128; color_vals[5] = 128;
      console.log("Turquoise and Teal");
    }

    else if (which_color == 5) {
      //Color 1 - Deep Sky Blue (0,191,255)
      color_vals[0] = 0; color_vals[1] = 191; color_vals[2] = 255;
      //Color 2 - Midnight Blue (25,25,112)
      color_vals[3] = 25; color_vals[4] = 25; color_vals[5] = 112;
      console.log("Deep Sky Blue and Midnight Blue");
    }
  }

  function Particle () {

    this.r_mult = p.random(0.001, 0.01);

    this.pos = p.createVector(p.random(p.width), p.random(p.height));
    this.vel = p.createVector(0, 0);
    this.acc = p.createVector(0, 0);
    this.maxspeed = 4;

    this.prevPos = this.pos.copy();

    this.update = function() {
      this.vel.add(this.acc);
      this.vel.limit(this.maxspeed);
      this.pos.add(this.vel);
      this.acc.mult(0);
    }

    this.follow = function(vectors) {
      var x = p.floor(this.pos.x / scl);
      var y = p.floor(this.pos.y / scl);
      var index = x + y * cols;
      var force = vectors[index];
      this.applyForce(force);
    }

    this.applyForce = function(force) {
      this.acc.add(force);
    }

    this.display = function() {

      //This stroke is set up to crossfade between
      //our two color values as per a sine function
      p.stroke(p.map(p.sin(p.frameCount*this.r_mult),-1,1,color_vals[0], color_vals[3]),
               p.map(p.sin(p.frameCount*this.r_mult),-1,1,color_vals[1], color_vals[4]),
               p.map(p.sin(p.frameCount*this.r_mult),-1,1,color_vals[2], color_vals[5]),
               20);

      p.strokeWeight(1);
      p.line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
      this.updatePrev();
    }

    this.updatePrev = function() {
      this.prevPos.x = this.pos.x;
      this.prevPos.y = this.pos.y;
    }

    //Function to allow particles to wrap around screen edges
    this.edges = function() {
      if (this.pos.x > p.width) {
        this.pos.x = 0;
        this.updatePrev();
      }
      if (this.pos.x < 0) {
        this.pos.x = p.width;
        this.updatePrev();
      }
      if (this.pos.y > p.height) {
        this.pos.y = 0;
        this.updatePrev();
      }
      if (this.pos.y < 0) {
        this.pos.y = p.height;
        this.updatePrev();
      }
    }
  }
};

var myp5 = new p5(sketch, 'flowfield');

}
