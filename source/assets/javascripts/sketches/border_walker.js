import p5 from 'p5';

module.exports =  function() {
var sketch = function(p) {

  var walkers = [];
  var num_walkers;

  p.setup = function() {
    var body = document.body,
        html = document.documentElement;
    var height = Math.max( body.scrollHeight, body.offsetHeight, 
      html.clientHeight, html.scrollHeight, html.offsetHeight );
    
    p.pixelDensity(1);
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.noStroke();
    p.frameRate(60);
    num_walkers = p.floor(p.random(1, 30));

    for (var i = 0; i<num_walkers; i++) {
      walkers[i] = new Walker(50, 2);
    }
  };

  
  p.draw = function() {
    for (var i = 0; i<num_walkers; i++) {
      walkers[i].update();
      walkers[i].display();
    }
  };

  p.windowResized = function() {
      p.resizeCanvas(window.innerWidth, window.innerHeight);
  }

  function Walker(m, s) {
    
    this.margin = m;
    this.x_pos  = p.random(0 , m);
    this.y_pos  = p.random(0 , m);
    this.step_size = s;

    this.r_mult = p.random(0.001, 0.05);
    this.g_mult = p.random(0.001, 0.05);
    this.b_mult = p.random(0.001, 0.05);
    this.a_mult = p.random(0.001, 0.05);

    this.which_quadrant = 0;
    this.where = 0;

    this.limit_1 = 50;
    this.limit_2 = 30;
    this.limit_3 = 10;

    this.move = function(quad)
    {
      this.where = p.random(0, 100);

      if (quad == 0) {
        if (this.where > this.limit_1 && this.check_edges(2)) 
        {this.x_pos += this.step_size;} //50% chance of going right

        else if ((this.where <= this.limit_1 && this.where > this.limit_2) && this.check_edges(1)) 
        {this.y_pos -= this.step_size;} //20% chance of going up

        else if ((this.where <= this.limit_2 && this.where > this.limit_3) && this.check_edges(3)) 
        {this.y_pos += this.step_size;} //20% chance of going down

        else if ((this.where <= this.limit_3) && this.check_edges(4)) 
        {this.x_pos -= this.step_size;} //10% chance of going left
      }

      if (quad == 1) {
        if (this.where > this.limit_1 && this.check_edges(3)) 
        {this.y_pos += this.step_size;} //50% chance of going down

        else if ((this.where <= this.limit_1 && this.where > this.limit_2) && this.check_edges(4)) 
        {this.x_pos -= this.step_size;} //20% chance of going left

        else if ((this.where <= this.limit_2 && this.where > this.limit_3) && this.check_edges(2)) 
        {this.x_pos += this.step_size;} //20% chance of going right

        else if (this.where <= this.limit_3 && this.check_edges(1))
        {this.y_pos -= this.step_size;} //10% chance of going up
      }

      if (quad == 2) {
        if (this.where > this.limit_1 && this.check_edges(4))
        {this.x_pos -= this.step_size;} //50% chance of going left

        else if ((this.where <= this.limit_1 && this.where > this.limit_2) && this.check_edges(1)) 
        {this.y_pos -= this.step_size;} //20% chance of going up

        else if ((this.where <= this.limit_2 && this.where > this.limit_3) && this.check_edges(3)) 
        {this.y_pos += this.step_size;} //20% chance of going down

        else if (this.where <= this.limit_3 && this.check_edges(2)) 
        {this.x_pos += this.step_size;} //10% chance of going right
      }

      if (quad == 3) {
        if (this.where > this.limit_1 && this.check_edges(1))
        {this.y_pos -= this.step_size;} //50% chance of going up

        else if ((this.where <= this.limit_1 && this.where > this.limit_2) && this.check_edges(4)) 
        {this.x_pos -= this.step_size;} //20% chance of going left

        else if ((this.where <= this.limit_2 && this.where > this.limit_3) && this.check_edges(2)) 
        {this.x_pos += this.step_size;} //20% chance of going right

        else if (this.where <= this.limit_3 && this.check_edges(3))
        {this.y_pos += this.step_size;} //10% chance of going down
      }
    };

    this.check_quadrant = function()
    {
      if (p.frameCount <= 60) {this.which_quadrant = 0;}

      if (p.frameCount > 60)
      {
        //Upper Left Quadrant of the screen
        if (this.x_pos >= 0 && this.x_pos < p.width-this.margin) {
          if (this.y_pos >=0 && this.y_pos < this.margin) {
            this.which_quadrant = 0;
          }
        }
        //Upper Right Quadrant of the screen
        if (this.x_pos >= (p.width-this.margin) && this.x_pos < p.width) {
          if (this.y_pos >=0 && this.y_pos < p.height) {
            this.which_quadrant = 1;
          }
        }
        //Lower Right Quadrant of the screen
        if (this.x_pos >= 0 && this.x_pos < p.width-this.margin) {
          if (this.y_pos >= p.height-this.margin && this.y_pos < p.height) {
            this.which_quadrant = 2;
          }
        }
        //Lower Left Quadrant of the screen
        if (this.x_pos >= 0 && this.x_pos < this.margin) {
          if (this.y_pos >= 0 && this.y_pos < p.height-this.margin) {
            this.which_quadrant = 3;
          }
        }
      }
      return this.which_quadrant;
    };

    this.check_edges = function(which_neighbour)
    {
      //Check top boundaries
      if (which_neighbour == 1) {
        if (this.y_pos - this.step_size < 0) {
          return false;
        }
        else {return true;} 
      }
      //Check right boundaries
      if (which_neighbour == 2) {
        if (this.x_pos + this.step_size > p.width) { 
          return false;
        }
        else {return true;}
      }
      //Check bottom boundaries
      if (which_neighbour == 3) {
        if (this.y_pos + this.step_size > p.height) {
          return false;
        }
        else {return true;}
      }
      //Check left boundaries
      if (which_neighbour == 4) {
        if(this.x_pos - this.step_size < 0) {
          return false;
        }
        else {return true;}
      }
      else {return true;}
    };

    this.update = function()
    {
      this.move(this.check_quadrant());
    };

    this.display = function()
    {
      p.fill(p.map(p.sin(p.frameCount*this.r_mult), -1, 1, 10,  255),
         p.map(p.sin(p.frameCount*this.g_mult), -1, 1, 10,  255),
         p.map(p.sin(p.frameCount*this.b_mult), -1, 1, 10,  255),
         p.map(p.sin(p.frameCount*this.a_mult), -1, 1, 100, 250));

      p.rect(this.x_pos, this.y_pos, this.step_size, this.step_size);
    };
  }
};

var myp5 = new p5(sketch, 'border_walker');

}

