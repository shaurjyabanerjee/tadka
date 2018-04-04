//FEEDBAKE SNAKE game for wholesomecircuits.com

import p5 from 'p5';
import 'hammerjs';

module.exports =  function() {
  var sketch = function(p) {

    var buffer;

    var step;
    var cols, rows;
    var s;
    var player_positions_x = [];
    var player_positions_y = [];
    var game_over;
    var bgnd_color;
    var bgnd_alpha;
    var gradient_mult;
    var highlight_weight;
    var snake_rate;
    var line_opacity;

        
    p.setup = function() {
      p.pixelDensity(1);
      p.createCanvas(window.innerWidth, window.innerHeight);

      // set options to prevent default behaviors for swipe, pinch, etc
      var options = {
        preventDefault: true
      }
     
      // document.body registers gestures anywhere on the page
      var hammer = new Hammer(document.body, options);

      hammer.get('swipe').set({direction: Hammer.DIRECTION_ALL});
      hammer.on("swipe", p.swiped); //tie event 'swipe' to function 'swiped'

      p.init();

      buffer = setupBuffer();
    }

    p.init = function() {

      //Initial conditions for computers
    if (p.windowWidth > p.windowHeight) {

      step = p.floor(p.random(20,75));

      cols = p.width/step;
      rows = p.height/step;

      snake_rate = p.floor(p.random(2,7));
      bgnd_color = 15;
      bgnd_alpha = 255;
      gradient_mult = p.floor(p.random(2, 7));
      highlight_weight = 1;
      game_over = false;
      line_opacity = 10;
    } 

    //Iniitial conditions for phones
    else if (p.windowWidth <= p.windowHeight)
    {
      step = p.floor(p.random(20,40));

      cols = p.width/step;
      rows = p.height/step;

      snake_rate = p.floor(p.random(3,12));
      bgnd_color = 15;
      bgnd_alpha = 255;
      gradient_mult = p.floor(p.random(2, 7));
      highlight_weight = 1;
      game_over = false;
      line_opacity = 30;
    }
      s = new Snake;

      p.noFill();
      p.rect(0,0, cols*step, rows*step);
      p.noStroke();
    }

    p.draw = function() {
      p.background(51);

      let translateX = ((p.mouseX - p.width/2) + 10) * 0.00024;
      let translateY = ((p.mouseY - p.height/2) + 10) * 0.00024;
      let scaleX = ((p.mouseX+200) - p.width/2) * 0.00064;
      let scaleY = ((p.mouseY+200) - p.height/2) * 0.00064;

      melt(translateX, translateY, scaleX, scaleY, 0.001);

      //Draw p5 stuff here (to the buffer)
      if (p.frameCount%snake_rate == 0) {
        p.draw_grid();
        s.update();
        s.display();
      }

      p.image(buffer, 0, 0);
    }



    p.draw_grid = function() {
      for(var i = 0; i < cols-1; i++) {
        for(var j = 0; j < rows-1; j++) {
          buffer.strokeWeight(1);

          buffer.stroke(p.map(p.sin((i/gradient_mult) + s.inc1 * s.r_mult),-1,1,255,10),
                        p.map(p.sin((i/gradient_mult) + s.inc1 * s.g_mult),-1,1,255,10),
                        p.map(p.sin((i/gradient_mult) + s.inc1 * s.b_mult),-1,1,255,10),
                        p.map(p.sin((i/gradient_mult) + s.inc1 * s.b_mult),-1,1,0,190));

          //noStroke();

          // buffer.fill(p.map(p.sin((i/gradient_mult) + s.inc1 * s.r_mult),-1,1,10,255),
          //    p.map(p.sin((i/gradient_mult) + s.inc1 * s.g_mult),-1,1,10,255),
          //    p.map(p.sin((i/gradient_mult) + s.inc1 * s.b_mult),-1,1,10,255),
          //    100);

          buffer.noFill();

          s.inc1 += 0.01;
          buffer.rect(i*step, j*step, step, step);
        }
      }
    }

    p.swiped = function(event) {

    //First handle, player movement
    if (s.len > 1) {
      if (event.direction == 8  && s.dir != 2) {s.dir = 0;}
      if (event.direction == 16 && s.dir != 0) {s.dir = 2;}
      if (event.direction == 4  && s.dir != 3) {s.dir = 1;}
      if (event.direction == 2  && s.dir != 1) {s.dir = 3;}
    }

    else if (s.len == 1) {
      if (event.direction == 8)  {s.dir = 0;}
      if (event.direction == 16) {s.dir = 2;}
      if (event.direction == 4)  {s.dir = 1;}
      if (event.direction == 2)  {s.dir = 3;}
    }
  }

    //0  -  1     - 2    - 3
    //Up -  Right - Down - Left  
    p.keyPressed = function() {

      //First handle, player movement
      if (s.len > 1) {
        if (p.keyCode == p.UP_ARROW    && s.dir != 2) {s.dir = 0;}
        if (p.keyCode == p.DOWN_ARROW  && s.dir != 0) {s.dir = 2;}
        if (p.keyCode == p.RIGHT_ARROW && s.dir != 3) {s.dir = 1;}
        if (p.keyCode == p.LEFT_ARROW  && s.dir != 1) {s.dir = 3;}
      }

      else if (s.len == 1) {
        if (p.keyCode == p.UP_ARROW)    {s.dir = 0;}
        if (p.keyCode == p.DOWN_ARROW)  {s.dir = 2;}
        if (p.keyCode == p.RIGHT_ARROW) {s.dir = 1;}
        if (p.keyCode == p.LEFT_ARROW)  {s.dir = 3;}
      }

      //Save frame to user's computer if they hit enter
      if(p.keyCode == p.ENTER) {
        p.save(buffer, 'wholesome_snake.jpg');
      }
    }


      function Snake() {
      //Variables to track states and scores
      this.x_pos  = p.floor(p.random(cols-1));
      this.y_pos  = p.floor(p.random(rows-1));
      this.food_x = p.floor(p.random(cols-1));
      this.food_y = p.floor(p.random(rows-1));
      this.c_width  = cols * step;
      this.c_height = rows * step;
      this.dir    = 1;
      this.len    = 3;
      this.snake_frame_count = 0;
      this.is_dead = false;

      //Variables to modulate color
      this.r_mult = p.random(0.001, 0.01);
      this.g_mult = p.random(0.001, 0.01);
      this.b_mult = p.random(0.001, 0.01);

      this.inc1 = 0.01;
      
      this.update = function() {
        this.check_death();

        if (this.is_dead != true) {
          this.snake_frame_count++;

          if (this.dir == 0) {this.y_pos --;}
          if (this.dir == 1) {this.x_pos ++;}
          if (this.dir == 2) {this.y_pos ++;}
          if (this.dir == 3) {this.x_pos --;}

          this.wrap_edges();

          this.x_pos = p.floor(this.x_pos);
          this.y_pos = p.floor(this.y_pos);

          this.check_food();
          this.log_positions();
        }
      }

      this.check_food = function() {
        //If we are at the food location
        if (this.x_pos == this.food_x && this.y_pos == this.food_y)
        {
          this.generate_food();
          this.len ++;
        }
      }

      this.check_death = function () {

        for(var i = 1; i < this.len; i++) {
          if (this.x_pos == player_positions_x[this.snake_frame_count-i]) {
            if (this.y_pos == player_positions_y[this.snake_frame_count-i]) {
              this.is_dead = true;
            }
          }
        }
      }

      this.log_positions = function () {
        player_positions_x[this.snake_frame_count] = this.x_pos;
          player_positions_y[this.snake_frame_count] = this.y_pos;
      }

      this.display_trail = function () {
        for(var i = 1; i < this.len; i++) {

          if (this.is_dead == true) {
            buffer.fill(0);
          }

          if (this.is_dead == false) {
            buffer.fill (p.map(p.sin(p.frameCount * this.r_mult),-1,1,10,245),
                         p.map(p.sin(p.frameCount * this.g_mult),-1,1,10,245),
                         p.map(p.sin(p.frameCount * this.b_mult),-1,1,10,245));
          }
        
          buffer.rect(player_positions_x[this.snake_frame_count-i]*step,
                      player_positions_y[this.snake_frame_count-i]*step,
                      step, step);
        }
      }

      this.generate_food = function () {
        this.food_x = p.floor(p.random(cols-1));
        this.food_y = p.floor(p.random(rows-1));


        //Iterate through all the spaces currently occupied by the snake,
        //And check if our food has been generated in an already occupied space
        //If it is, generate a new x and y position for the food
        for (var i = 1; i < this.len; i++) {
          if (this.food_x == player_positions_x[this.snake_frame_count-i]) {
            if (this.food_y == player_positions_y[this.snake_frame_count-i]) {
              
              this.food_x = p.floor(p.random(cols-1));
              this.food_y = p.floor(p.random(rows-1));
            }
          }
        }
      }

      this.display_food = function () {
        buffer.fill (p.map(p.sin(p.frameCount * this.r_mult),-1,1,255,190),0,0);
        buffer.rect(this.food_x*step, this.food_y*step, step, step);
      }

      this.wrap_edges = function() {
        if (this.x_pos > cols-1) {this.x_pos = 0;}
        if (this.y_pos > rows-1) {this.y_pos = 0;}
        if (this.x_pos < 0) {this.x_pos = cols-1;}
        if (this.y_pos < 0) {this.y_pos = rows-1;}
      }

      this.display = function() {

        this.display_food();
        if (this.len > 1) {this.display_trail();}

        //Fill with this color if you are dead
        if (this.is_dead == true) {buffer.fill(0);}

        //Fill with this color if you are still alive
        if (this.is_dead == false) {
          buffer.fill (p.map(p.sin(p.frameCount * this.r_mult),-1,1,10,245),
                       p.map(p.sin(p.frameCount * this.g_mult),-1,1,10,245),
                       p.map(p.sin(p.frameCount * this.b_mult),-1,1,10,245),
                       50);
        }
        
        buffer.rect(this.x_pos*step, this.y_pos*step, step, step); 

        if (game_over == false && this.is_dead == true) { 
              p.save(buffer, 'feedbake_snake.jpg');
              game_over = true;
        }
      }
    }

    //FEEDBACK FUNCTIONS --------------------------------------------------------------

    //Function create feedback from canvas translation and rotation
    function melt(tx, ty, sx, sy, angle){
      buffer.push()
      buffer.translate(tx + p.width/2, ty + p.height/2);
      buffer.rotate(angle);
      buffer.image(buffer, -sx/2 - p.width/2, -sy/2 - p.height/2, sx + p.width, sy + p.height);
      buffer.pop()
    }

    p.windowResized = function() {
      p.resizeCanvas(window.innerWidth, window.innerHeight);
      buffer = setupBuffer();
    }

    function setupBuffer() {
      let b = p.createGraphics(window.innerWidth, window.innerHeight);

      let canvas = b.canvas;
      let ctx = canvas.getContext('2d');
      ctx.imageSmoothingEnabled = false;
      ctx.imageSmoothingQuality = 'off';

      return b;
    }
  };

  var myp5 = new p5(sketch, 'feedabake_snake');
}