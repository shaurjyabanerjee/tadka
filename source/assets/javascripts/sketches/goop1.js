//Gradient Grid Feedback Gooper 1
//Mike Leisz and Shaurjya Banerjee 2018
import p5 from 'p5';

module.exports =  function() {
var sketch = function(p) {

  var num_steps = 42;
  var step_size;

  var r_mult;
  var g_mult;
  var b_mult;
  var a_mult;

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

    buffer = setupBuffer();

    step_size = p.width/num_steps;
    p.noStroke();

    r_mult = p.random(0.001, 0.1);
    g_mult = p.random(0.001, 0.1);
    b_mult = p.random(0.001, 0.1);
    a_mult = p.random(0.001, 0.1);
    x_mult = p.random(0.001, 0.1);
    y_mult = p.random(0.001, 0.1);
  };

  p.draw = function() {
    p.background(51);

    let translateX = (p.mouseX - p.width/2) * 0.024;
    let translateY = (p.mouseY - p.height/2) * 0.024;
    let scaleX = (p.mouseX - p.width/2) * 0.064;
    let scaleY = (p.mouseY - p.height/2) * 0.064;

    melt(translateX, translateY, scaleX, scaleY, 0.001);

    buffer.noStroke();

    p.gradient_grid();

    p.image(buffer, 0, 0);
  };

  p.gradient_grid = function() {
    var y_offset = 0;
    color_inc = 0;

    for(let j = 0; j<num_steps; j++) {
      var x_offset = 0;
      for(let i = 0; i<num_steps; i++) {

        buffer.fill(p.map(p.sin(color_inc+other_inc * r_mult), -1, 1, 0, 250),
          p.map(p.sin(color_inc+other_inc * g_mult), -1, 1, 0, 250),
          p.map(p.sin(color_inc+other_inc * b_mult), -1, 1, 0, 250),
          p.map(p.sin(color_inc+other_inc * a_mult), -1, 1, 10, 250));

        buffer.rect (i*step_size + p.map(p.cos(p.frameCount * x_mult),-1, 1, 0, step_size),
          j* step_size + p.map(p.sin(p.frameCount * y_mult),-1, 1, 0, step_size),
          p.map(p.mouseX, 0, p.width,  1, 16),
          p.map(p.mouseY, 0, p.height, 1, 16));

        color_inc += 0.001;
        x_offset += inc;
      }
      y_offset += inc;
      other_inc += 0.01;
    }
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
