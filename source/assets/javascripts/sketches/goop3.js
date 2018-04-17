//Goop 3 - Random Points Drawn into feedback
//with procedural selection of color palettes
//Shaurjya Banerjee 2018
//Using canvas feedback framework by Mike Leisz 2018

//-----------------------------------------------------------------

import p5 from 'p5';

module.exports =  function() {
var sketch = function(p) {

  var num_steps = 42;
  var step_size;

  var r_max;
  var g_max;
  var b_max;
  var num_points;

  var which_color;

  var x_mult;
  var y_mult;

  var perlin_val;
  var color_inc = 0;
  var other_inc = 0;
  var inc = 0.1;

  var buffer;
    
  p.setup = function() {
    p.pixelDensity(1);
    p.createCanvas(p.windowWidth, p.windowHeight);
    num_points = p.floor(p.random(5, 50));
    p.choose_color();

    buffer = setupBuffer();

    step_size = p.width/num_steps;
    p.noStroke();
  };

  p.draw = function() {
    p.background(51);

    let translateX = (p.mouseX - p.width/2) * 0.024;
    let translateY = (p.mouseY - p.height/2) * 0.024;
    let scaleX = (p.mouseX - p.width/2) * 0.064;
    let scaleY = (p.mouseY - p.height/2) * 0.064;

    melt(translateX, translateY, scaleX, scaleY, 0.001);

    buffer.noStroke();

    p.seed_points();
    p.image(buffer, 0, 0);
  };

  p.seed_points = function() {
    for (var i = 0; i < num_points; i++) {

      buffer.stroke(p.random(r_max), p.random(g_max), p.random(b_max), 10);
      buffer.point(p.random(p.width), p.random(p.height));
    }
  }

  //This function determines the start colors for our seed points
  p.choose_color = function() {
    which_color = p.ceil(p.random(0, 5));
    //which_color = 5;

    //Reds and blues with this color seed
    if (which_color == 1) {r_max = 255; g_max = 102; b_max = 204;}

    //Oranges, greens and yellows with this color seed
    else if (which_color == 2) {r_max = 255; g_max = 154; b_max = 40;}

    //Blues and greens with this color seed
    else if (which_color == 3) {r_max = 0; g_max = 160; b_max = 204;}

    //This color seed gives rainbowing
    else if (which_color == 4) {r_max = 204; g_max = 159; b_max = 202;}

    //This color seed gives green centric rainbowing
    else if (which_color == 5) {r_max = 117; g_max = 215; b_max = 255;}

    else if (which_color == 6) {r_max = 0; g_max = 0; b_max = 0;}

    else if (which_color == 7) {r_max = 0; g_max = 0; b_max = 0;}
  }

  p.windowResized = function() {
    p.resizeCanvas(window.innerWidth, window.innerHeight);
  }

  //FEEDBACK FUNCTIONS ----------------------------------------------------------------

  function melt(tx, ty, sx, sy, angle){
    buffer.push();
    buffer.translate(tx + p.width/2, ty + p.height/2);
    buffer.rotate(angle);
    buffer.image(buffer, -sx/2 - p.width/2, -sy/2 - p.height/2, sx + p.width, sy + p.height);
    buffer.pop();
  }

  p.windowResized = function() {
    p.resizeCanvas(window.innerWidth, window.innerHeight);
    buffer = setupBuffer();
  };

  function setupBuffer() {
    let b = p.createGraphics(window.innerWidth, window.innerHeight);

    let canvas = b.canvas;
    let ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;
    ctx.imageSmoothingQuality = 'off';

    return b;
  }
};

var myp5 = new p5(sketch, 'gradient_goop');
}
