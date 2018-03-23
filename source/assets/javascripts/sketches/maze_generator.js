//Maze generator for wholesomecircuits.com

//Shaurjya Banerjee 2018
//Based on maze generator 
//by Daniel Shiffman

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


function setup() {
  pixelDensity(1);
  createCanvas(window.innerWidth, window.innerHeight);

  w_mult = floor(random(8,17));
  w = w_mult * 5;

  cols = floor(width/w);
  rows = floor(height/w);

  total_cells = rows*cols;

  r_mult = random(0.01, 0.1);
  g_mult = random(0.01, 0.1);
  b_mult = random(0.01, 0.1);
  p_mult = random(0.005, 0.05);

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
}

function draw() {
  background(25);

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
    player_trail();
  	display_player();
  }

  //Check if the player is in the bottom right spot
  if (is_maze_generated) {
    if ((player_x > ((cols-1)*w)) && player_x < (cols*w)) {
      if ((player_y > ((rows-1)*w)) && player_y < (rows*w)) {
          
        if (game_over == false) { 
          save('wholesome_maze.jpg');
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
    removeWalls(current, next);
	// STEP 4
    current = next;
  } 

  else if (stack.length > 0) {
    current = stack.pop();
  }
}

function display_player() {

	//Neon Yellow (253,254,2)
	//Neon Green  (11 ,255,1)
	noStroke();
  rectMode(CENTER);

	fill(map(sin(frameCount*p_mult),-1,1,253,11 ),
	     map(sin(frameCount*p_mult),-1,1,254,255),
	     map(sin(frameCount*p_mult),-1,1,2  ,1  ));
	rect(player_x, player_y, w/2, w/2);

  rectMode(CORNER);

  fill(map(sin(frameCount*p_mult),-1,1,253,11 ),
       map(sin(frameCount*p_mult),-1,1,254,255),
       map(sin(frameCount*p_mult),-1,1,2  ,1  ),
       175);

  rect(w*(cols-1) + 1, w*(rows-1) + 1, w-2, w-2);
}

function player_trail() {
  if(move_count > 0) {
    for(var i = 0; i < move_count; i++) {

      stroke(map(sin(i*r_mult),-1,1,10,255),
             map(sin(i*g_mult),-1,1,10,255),
             map(sin(i*b_mult),-1,1,10,255));

      strokeWeight(w/5);

      //All the lines
      line(player_positions_x[i], player_positions_y[i], 
           player_positions_x[i-1], player_positions_y[i-1]);
      
      //The very last line (the one that connects to the player)
      if (i == move_count-1)
      {
        line(player_x, player_y, 
           player_positions_x[i], player_positions_y[i]);
      }
    }
  }
}

function xy_convertor (x, y) {
  return x + (y * cols);
}

function index(i, j) {
  if (i < 0 || j < 0 || i > cols-1 || j > rows-1) {
    return -1;
  }
  return i + j * cols;
}

function removeWalls(a, b) {
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
	    fill(map(sin(frameCount*r_mult),-1,1,255,10),
	     	   map(sin(frameCount*g_mult),-1,1,255,10),
	     	   map(sin(frameCount*b_mult),-1,1,255,10));
	    rect(x+1, y+1, w-1, w-1);
	  }
  }

  this.show = function() {
    var x = this.i*w;
    var y = this.j*w;

    //First, fill in color for visited spaces
    if (this.visited) {
      noStroke();
      fill(map(sin(inc1*r_mult),-1,1,10,255),
      	   map(sin(inc1*g_mult),-1,1,10,255),
		       map(sin(inc1*b_mult),-1,1,10,255),
		   200);
      rect(x, y, w, w);
    }

    //Then, draw the maze outline
    strokeWeight(2);
    stroke(map(sin(inc1*r_mult),-1,1,255,10),
    	     map(sin(inc1*g_mult),-1,1,255,10),
    	     map(sin(inc1*b_mult),-1,1,255,10));

    if (this.walls[0]) {
      line(x    , y    , x + w, y);
    }
    if (this.walls[1]) {
      line(x + w, y    , x + w, y + w);
    }
    if (this.walls[2]) {
      line(x + w, y + w, x    , y + w);
    }
    if (this.walls[3]) {
      line(x    , y + w, x    , y);
    }
  }
}
