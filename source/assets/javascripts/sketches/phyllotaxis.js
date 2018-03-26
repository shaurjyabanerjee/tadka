

import p5 from 'p5';

module.exports =  function() {
  var sketch = function(p) {

    var n = 0;
    var c = 30;

    var points = [];

    var start = 0;

    var r_mult;
    var g_mult;
    var b_mult;

    var inc = 0.1;
    var inc2 = 0.1;

    var direction = 0;

    p.setup = function() {
      p.createCanvas(window.innerWidth, window.innerHeight);
      p.angleMode(p.DEGREES);

      r_mult = p.random(0.07, 0.7);
      g_mult = p.random(0.07, 0.7);
      b_mult = p.random(0.07, 0.7);
    }

    p.draw = function() {
      p.background(0,5);
      p.translate(p.width / 2, p.height / 2);
      p.rotate(n * 0.3);

      inc = inc2;

      for (var i = 0; i < n; i++) {
        var a = i * p.map(p.mouseX, 0, p.width, 132, 140);
        var r = c * p.sqrt(i);
        var x = r * p.cos(a);
        var y = r * p.sin(a);

        var size = p.map(p.mouseY, 0, p.width, 2, c);

        p.fill(p.map(p.sin(inc*r_mult), -1,1,10,255),
               p.map(p.sin(inc*g_mult), -1,1,10,255),
               p.map(p.sin(inc*b_mult), -1,1,10,255));

        p.stroke(p.map(p.sin(inc*r_mult), -1,1,255,10),
                 p.map(p.sin(inc*g_mult), -1,1,255,10),
                 p.map(p.sin(inc*b_mult), -1,1,255,10));

        inc += 0.001;
        p.strokeWeight(p.map(p.mouseX, 0, p.width, 0, 4));
        p.ellipse(x, y, size, size);
      }

      inc2 += 1;

      //p.linear_n();

      n = p.map(p.sin(p.frameCount * 0.1), -1, 1, 0, p.max(p.width, p.height));
      start += 5;
    }

    p.linear_n = function() {
      if (direction == 0) {n += 5;}
      else if (direction == 1) {n -= 5;}

      if (n > p.max(p.width, p.height)) {direction = 1;}
      if (n < 0)         {direction = 0;}
    }
  };

  var myp5 = new p5(sketch, 'phyllotaxis');

}
