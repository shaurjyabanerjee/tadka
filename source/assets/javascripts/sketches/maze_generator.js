
//THIS SKETCH IS FUCKING BRICKED


//Maze generator for wholesomecircuits.com

//Shaurjya Banerjee 2018
//Based on maze generator 
//by Daniel Shiffman

import p5 from 'p5';

module.exports =  function() {
var sketch = function(p) {

  //Counter variables to keep track
  //of oscillating gradient
  p.inc1 = 0.01;
  p.inc2 = 0.01;

  //Step speed variables to adjust 
  //gradient 'rate'
  p.step1 = 0.075;
  p.step2 = 0.50;

  p.cols, rows;
  p.w;
  p.grid = [];
  p.total_cells;
  p.visited_cells = 0;
  p.is_maze_generated = false;

  p.current;
  p.stack = [];
  p.r_mult, g_mult, b_mult;
  p.p_mult;
  p.w_mult;

  p.player_x, player_y;
  p.player_step;
  p.move_count;
  p.game_x = 0;
  p.game_y = 0;
  p.game_over = false;

  p.player_positions_x = [];
  p.player_positions_y = [];


  p.setup = function() {
    p.pixelDensity(1);
    p.createCanvas(window.innerWidth, window.innerHeight);

    p.w_mult = p.floor(p.random(8,17));
    p.w = p.w_mult * 5;

    p.cols = p.floor(p.width/p.w);
    p.rows = p.floor(p.height/p.w);

    p.total_cells = p.rows*p.cols;

    p.r_mult = p.random(0.01, 0.1);
    p.g_mult = p.random(0.01, 0.1);
    p.b_mult = p.random(0.01, 0.1);
    p.p_mult = p.random(0.005, 0.05);

    p.player_x = p.w/2;
    p.player_y = p.w/2;
    p.player_step = p.w;
    p.move_count = 0;

    //Instantiate all our cell objects
    for (var   j = 0; j < rows; j++) {
      for (var i = 0; i < cols; i++) {
        p.cell = new Cell(i, j);
        p.grid.push(cell);
      }
    }
    p.current = p.grid[0];
  }

  p.draw() = function() {
    p.background(25);

    p.inc1 = p.inc2;
    p.visited_cells = 0;

    //Increment through each cell, display and count them
    for (var i = 0; i < grid.length; i++) {
      p.grid[i].show();
     	p.inc1 += p.step1;

     	//Count how many cells have been visited each frame
     	if (p.grid[i].visited == true) {p.visited_cells++;}
    }
    p.inc2 += p.step2;

    //Check if all cells have been visited 
    if (p.visited_cells == p.total_cells) {p.is_maze_generated = true;}

    if (p.is_maze_generated)
    {
      p.player_trail();
    	p.display_player();
    }

    //Check if the player is in the bottom right spot
    if (p.is_maze_generated) {
      if ((p.player_x > ((p.cols-1)*p.w)) && p.player_x < (p.cols*p.w)) {
        if ((p.player_y > ((p.rows-1)*p.w)) && p.player_y < (p.rows*p.w)) {
            
          if (p.game_over == false) { 
            p.save('wholesome_maze.jpg');
          }
        p.game_over = true;
        }
      }
    }

    p.current.visited = true;
    p.current.highlight();

    // STEP 1
    p.next = p.current.checkNeighbors();
    if (p.next) {
      p.next.visited = true;
  	// STEP 2
      p.stack.push(current);
  	// STEP 3
      p.removeWalls(current, next);
  	// STEP 4
      p.current = p.next;
    } 

    else if (p.stack.length > 0) {
      p.current = p.stack.pop();
    }
  }

  p.display_player = function(){

  	//Neon Yellow (253,254,2)
  	//Neon Green  (11 ,255,1)
  	p.noStroke();
    p.rectMode(CENTER);

  	p.fill(p.map(p.sin(p.frameCount*p.p_mult),-1,1,253,11 ),
  	     p.map(p.sin(p.frameCount*p.p_mult),-1,1,254,255),
  	     p.map(p.sin(p.frameCount*p.p_mult),-1,1,2  ,1  ));
  	p.rect(p.player_x, p.player_y, p.w/2, p.w/2);

    p.rectMode(CORNER);

    p.fill(p.map(p.sin(p.frameCount*p.p_mult),-1,1,253,11 ),
         p.map(p.sin(p.frameCount*p.p_mult),-1,1,254,255),
         p.map(p.sin(p.frameCount*p.p_mult),-1,1,2  ,1  ),
         175);

    p.rect(p.w*(p.cols-1) + 1, p.w*(p.rows-1) + 1, p.w-2, p.w-2);
  }

  p.player_trail = function () {
    if(move_count > 0) {
      for(var i = 0; i < move_count; i++) {

        p.stroke(p.map(p.sin(i*r_mult),-1,1,10,255),
               p.map(p.sin(i*g_mult),-1,1,10,255),
               p.map(p.sin(i*b_mult),-1,1,10,255));

        p.strokeWeight(w/5);

        //All the lines
        p.line(p.player_positions_x[i], p.player_positions_y[i], 
             p.player_positions_x[i-1], p.player_positions_y[i-1]);
        
        //The very last line (the one that connects to the player)
        if (i == p.move_count-1)
        {
          p.line(p.player_x, p.player_y, 
             p.player_positions_x[i], p.player_positions_y[i]);
        }
      }
    }
  }

  p.xy_convertor = function(x, y) {
    return x + (y * p.cols);
  }

  p.index = function(i, j) {
    if (i < 0 || j < 0 || i > cols-1 || j > rows-1) {
      return -1;
    }
    return i + j * p.cols;
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

  function keyReleased() {

  	//Save frame to user's computer if they hit enter
  	if(keyCode == ENTER) {
  		save('wholesome_maze.jpg');
  	}

  	//Handle player location tracking if the maze has
  	//already been generated
  	if (is_maze_generated) {
      //Log all of the player's visited spaces to display a trail
      player_positions_x[move_count] = player_x;
      player_positions_y[move_count] = player_y;

  		if(keyCode == LEFT_ARROW && player_x > w/2 && grid[xy_convertor(game_x, game_y)].walls[3] == false) {
      //if(keyCode == LEFT_ARROW && player_x > w/2) {
        player_x -= player_step;
        game_x -= 1;
      }
  		if(keyCode == RIGHT_ARROW && player_x < (w/2 + ((cols-1)*w)) && grid[xy_convertor(game_x, game_y)].walls[1] == false) {
      //if(keyCode == RIGHT_ARROW && player_x < (w/2 + ((cols-1)*w))) {
        player_x += player_step;
        game_x += 1;
      }
  		if(keyCode == UP_ARROW && player_y > w/2 && grid[xy_convertor(game_x, game_y)].walls[0] == false) {
      //if(keyCode == UP_ARROW && player_y > w/2) {
        player_y -= player_step;
        game_y -= 1;
      }
  		if(keyCode == DOWN_ARROW && player_y < (w/2 + ((rows-1)*w)) && grid[xy_convertor(game_x, game_y)].walls[2] == false ) {
      //if(keyCode == DOWN_ARROW && player_y < (w/2 + ((rows-1)*w))) {
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

      var top    = grid[index(i, j -1)];
      var right  = grid[index(i+1, j)];
      var bottom = grid[index(i, j+1)];
      var left   = grid[index(i-1, j)];

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
        var r = floor(random(0, neighbors.length));
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
      noStroke();
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

      //First, fill in color for visited spaces
      if (this.visited) {
        p.noStroke();
        p.fill(p.map(p.sin(p.inc1*p.r_mult),-1,1,10,255),
        	     p.map(p.sin(p.inc1*p.g_mult),-1,1,10,255),
  		         p.map(p.sin(p.inc1*p.b_mult),-1,1,10,255),
  		   200);
        rect(x, y, w, w);
      }

      //Then, draw the maze outline
      p.strokeWeight(2);
      p.stroke(p.map(p.sin(p.inc1*p.r_mult),-1,1,255,10),
      	       p.map(p.sin(p.inc1*p.g_mult),-1,1,255,10),
      	       p.map(p.sin(p.inc1*p.b_mult),-1,1,255,10));

      if (this.walls[0]) {
        p.line(p.x    , p.y    , p.x + p.w, p.y);
      }
      if (this.walls[1]) {
        p.line(p.x + p.w, p.y    , p.x + p.w, p.y + p.w);
      }
      if (this.walls[2]) {
        p.line(p.x + p.w, p.y + p.w, p.x    , p.y + p.w);
      }
      if (this.walls[3]) {
        p.line(p.x    , p.y + p.w, p.x    , p.y);
      }
    }
  }
};


var myp5 = new p5(sketch, 'maze_generator');

}