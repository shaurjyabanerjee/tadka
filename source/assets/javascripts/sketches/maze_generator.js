//Maze generator for wholesomecircuits.com

//Shaurjya Banerjee 2018
//Based on maze generator 
//by Daniel Shiffman


import p5 from 'p5';
import "p5/lib/addons/p5.sound";

module.exports =  function() {
  var sketch = function(p) {

    //Counter variables to keep track
    //of oscillating gradient
    var inc1 = 0.01;
    var inc2 = 0.01;

    //Step speed variables to adjust 
    //gradient 'rate'
    var step1 = 0.075;
    var step2 = 0.50;

    var cols, rows;
    var w;
    var grid = [];
    var total_cells;
    var visited_cells = 0;
    var is_maze_generated = false;

    var current;
    var stack = [];
    var r_mult, g_mult, b_mult;
    var p_mult;
    var w_mult;

    var player_x, player_y;
    var player_step;
    var move_count;
    var game_x = 0;
    var game_y = 0;
    var game_over = false;

    var player_positions_x = [];
    var player_positions_y = [];


    var osc1;
    var osc2;
    var env;


    p.setup = function() {
      p.pixelDensity(1);
      p.createCanvas(window.innerWidth, window.innerHeight);

      w_mult = p.floor(p.random(8,17));
      w = w_mult * 5;

      cols = p.floor(p.width/w);
      rows = p.floor(p.height/w);

      total_cells = rows*cols;

      r_mult = p.random(0.01, 0.1);
      g_mult = p.random(0.01, 0.1);
      b_mult = p.random(0.01, 0.1);
      p_mult = p.random(0.005, 0.05);

      player_x = w/2;
      player_y = w/2;
      player_step = w;
      move_count = 0;

      //Instantiate all our cell objects
      for (var   j = 0; j < rows; j++) {
        for (var i = 0; i < cols; i++) {
          var cell = new Cell(i, j);
          grid.push(cell);
        }
      }
      current = grid[0];

      osc1 = new p5.Oscillator();
      osc1.setType('square');
      osc1.freq(110);
      osc1.amp(0.5);
      osc1.start();

      osc2 = new p5.Oscillator();
      osc2.setType('square');
      osc2.freq(440);
      osc2.amp(1000);
      osc2.start();

      env = new p5.Env();
      env.setADSR(0.001, 0.15, 0, 0.5);
      env.setRange(1, 0);

      osc1.amp(env);
      osc2.amp(env);

      osc2.disconnect();
      osc1.freq(osc2);
    }

    p.draw = function() {
      p.background(25);

      inc1 = inc2;
      visited_cells = 0;

      //Increment through each cell, display and count them
      for (var i = 0; i < grid.length; i++) {
        grid[i].show();
       	inc1 += step1;

       	//Count how many cells have been visited each frame
       	if (grid[i].visited == true) {visited_cells++;}
      }
      inc2 += step2;

      //Check if all cells have been visited 
      if (visited_cells == total_cells) {is_maze_generated = true;}

      if (is_maze_generated)
      {
        p.player_trail();
      	p.display_player();
      }

      //Check if the player is in the bottom right spot
      if (is_maze_generated) {
        if ((player_x > ((cols-1)*w)) && player_x < (cols*w)) {
          if ((player_y > ((rows-1)*w)) && player_y < (rows*w)) {
              
            if (game_over == false) { 
              p.save('wholesome_maze.jpg');
            }
          game_over = true;
          }
        }
      }

      current.visited = true;
      current.highlight();

      // STEP 1
      var next = current.checkNeighbors();
      if (next) {
        next.visited = true;
    	// STEP 2
        stack.push(current);
    	// STEP 3
        p.removeWalls(current, next);
    	// STEP 4
        current = next;
      } 

      else if (stack.length > 0) {
        current = stack.pop();
      }
    }

    p.display_player = function() {

    	//Neon Yellow (253,254,2)
    	//Neon Green  (11 ,255,1)
    	p.noStroke();
      p.rectMode(p.CENTER);

    	p.fill(p.map(p.sin(p.frameCount*p_mult),-1,1,253,11 ),
    	       p.map(p.sin(p.frameCount*p_mult),-1,1,254,255),
    	       p.map(p.sin(p.frameCount*p_mult),-1,1,2  ,1  ));
    	p.rect(player_x, player_y, w/2, w/2);

      p.rectMode(p.CORNER);

      p.fill(p.map(p.sin(p.frameCount*p_mult),-1,1,253,11 ),
             p.map(p.sin(p.frameCount*p_mult),-1,1,254,255),
             p.map(p.sin(p.frameCount*p_mult),-1,1,2  ,1  ),
             175);

      p.rect(w*(cols-1) + 1, w*(rows-1) + 1, w-2, w-2);
    }

    p.player_trail = function() {
      if(move_count > 0) {
        for(var i = 0; i < move_count; i++) {

          p.stroke(p.map(p.sin(i*r_mult),-1,1,10,255),
                 p.map(p.sin(i*g_mult),-1,1,10,255),
                 p.map(p.sin(i*b_mult),-1,1,10,255));

          p.strokeWeight(w/5);

          //All the p.lines
          p.line(player_positions_x[i], player_positions_y[i], 
               player_positions_x[i-1], player_positions_y[i-1]);
          
          //The very last p.line (the one that connects to the player)
          if (i == move_count-1)
          {
            p.line(player_x, player_y, 
               player_positions_x[i], player_positions_y[i]);
          }
        }
      }
    }

    p.xy_convertor = function(x, y) {
      return x + (y * cols);
    }

    p.index = function(i, j) {
      if (i < 0 || j < 0 || i > cols-1 || j > rows-1) {
        return -1;
      }
      return i + j * cols;
    }

    p.removeWalls = function(a, b) {
      var x = a.i - b.i;
      if (x === 1) {
        a.walls[3] = false;
        b.walls[1] = false;
      } else if (x === -1) {
        a.walls[1] = false;
        b.walls[3] = false;
      }
      var y = a.j - b.j;
      if (y === 1) {
        a.walls[0] = false;
        b.walls[2] = false;
      } else if (y === -1) {
        a.walls[2] = false;
        b.walls[0] = false;
      }
    }

    p.keyReleased = function() {

    	//Save frame to user's computer if they hit enter
    	if(p.keyCode == p.ENTER) {
    		p.save('wholesome_maze.jpg');
    	}

    	//Handle player location tracking if the maze has
    	//already been generated
    	if (is_maze_generated) {
        //Log all of the player's visited spaces to display a trail
        player_positions_x[move_count] = player_x;
        player_positions_y[move_count] = player_y;

    		if(p.keyCode == p.LEFT_ARROW && player_x > w/2 && grid[p.xy_convertor(game_x, game_y)].walls[3] == false) {
        //if(p.keyCode == p.LEFT_ARROW && player_x > w/2) {
          player_x -= player_step;
          game_x -= 1;
        }
    		if(p.keyCode == p.RIGHT_ARROW && player_x < (w/2 + ((cols-1)*w)) && grid[p.xy_convertor(game_x, game_y)].walls[1] == false) {
        //if(p.keyCode == p.RIGHT_ARROW && player_x < (w/2 + ((cols-1)*w))) {
          player_x += player_step;
          game_x += 1;
        }
    		if(p.keyCode == p.UP_ARROW && player_y > w/2 && grid[p.xy_convertor(game_x, game_y)].walls[0] == false) {
        //if(p.keyCode == p.UP_ARROW && player_y > w/2) {
          player_y -= player_step;
          game_y -= 1;
        }
    		if(p.keyCode == p.DOWN_ARROW && player_y < (w/2 + ((rows-1)*w)) && grid[p.xy_convertor(game_x, game_y)].walls[2] == false ) {
        //if(p.keyCode == p.DOWN_ARROW && player_y < (w/2 + ((rows-1)*w))) {
          player_y += player_step;
          game_y += 1;
        }
    	}
      move_count ++;
    }

    function Cell(i, j) {

      this.i = i;
      this.j = j;
      this.walls = [true, true, true, true];
      this.visited = false;

      this.checkNeighbors = function() {
        var neighbors = [];

        var top    = grid[p.index(i, j -1)];
        var right  = grid[p.index(i+1, j)];
        var bottom = grid[p.index(i, j+1)];
        var left   = grid[p.index(i-1, j)];

        if (top && !top.visited) {
          neighbors.push(top);
        }
        if (right && !right.visited) {
          neighbors.push(right);
        }
        if (bottom && !bottom.visited) {
          neighbors.push(bottom);
        }
        if (left && !left.visited) {
          neighbors.push(left);
        }

        if (neighbors.length > 0) {
          var r = p.floor(p.random(0, neighbors.length));
          return neighbors[r];
        } 
        else {
          return undefined;
        }
      }

      //Function to highlight the currently active square
      this.highlight = function() {
        var x = this.i*w;
        var y = this.j*w;
        p.noStroke();
        //Only highlight square if the maze has not been 
        //generated yet
        if (is_maze_generated != true)
        {
    	    p.fill(p.map(p.sin(p.frameCount*r_mult),-1,1,255,10),
    	     	     p.map(p.sin(p.frameCount*g_mult),-1,1,255,10),
    	     	     p.map(p.sin(p.frameCount*b_mult),-1,1,255,10));
    	    p.rect(x+1, y+1, w-1, w-1);
    	  }
      }

      this.show = function() {
        var x = this.i*w;
        var y = this.j*w;

        //First, p.fill in color for visited spaces
        if (this.visited) {
          p.noStroke();
          p.fill(p.map(p.sin(inc1*r_mult),-1,1,10,255),
          	     p.map(p.sin(inc1*g_mult),-1,1,10,255),
    		         p.map(p.sin(inc1*b_mult),-1,1,10,255),
    		         200);
          p.rect(x, y, w, w);
        }

        //Then, draw the maze outp.line
        p.strokeWeight(2);
        p.stroke(p.map(p.sin(inc1*r_mult),-1,1,255,10),
        	       p.map(p.sin(inc1*g_mult),-1,1,255,10),
        	       p.map(p.sin(inc1*b_mult),-1,1,255,10));

        if (this.walls[0]) {
          p.line(x    , y    , x + w, y);
        }
        if (this.walls[1]) {
          p.line(x + w, y    , x + w, y + w);
        }
        if (this.walls[2]) {
          p.line(x + w, y + w, x    , y + w);
        }
        if (this.walls[3]) {
          p.line(x    , y + w, x    , y);
        }
      }
    }
  };

  var myp5 = new p5(sketch, 'maze_generator');
}
