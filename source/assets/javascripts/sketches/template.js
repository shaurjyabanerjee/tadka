//Gradient Snake Game for wholesomecircuits.com


import p5 from 'p5';
import 'hammerjs';

module.exports =  function() {
var sketch = function(p) {

	var msg = "swipe";

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
		p.createCanvas(p.windowWidth, p.windowHeight);

		p.init();
	}

	p.init = function () {

		//Initial conditions for computers
		if (p.windowWidth > p.windowHeight) {

			
		}	

		//Iniitial conditions for phones
		else if (p.windowWidth <= p.windowHeight)
		{
			
		}
	}

	p.draw = function () {

	}

	p.draw_grid = function () {
	}


	p.swiped = function(event) {

	}

	p.keyPressed = function () {

	}

	p.windowResized = function() {
      p.resizeCanvas(window.innerWidth, window.innerHeight);
      p.init();
    }

	//----------------------------------------------------------------

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
		this.r_mult = p.random(0.005, 0.02);
		this.g_mult = p.random(0.005, 0.02);
		this.b_mult = p.random(0.005, 0.02);

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
					p.fill(0);
				}

				if (this.is_dead == false) {
					p.fill (p.map(p.sin(p.frameCount * this.r_mult),-1,1,10,245),
					 	    p.map(p.sin(p.frameCount * this.g_mult),-1,1,10,245),
					  	    p.map(p.sin(p.frameCount * this.b_mult),-1,1,10,245));
				}
			
				p.rect(player_positions_x[this.snake_frame_count-i]*step,
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
			p.fill (p.map(p.sin(p.frameCount * this.r_mult),-1,1,255,190),0,0);
			p.rect(this.food_x*step, this.food_y*step, step, step);
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

			//p.Fill with this color if you are dead
			if (this.is_dead == true) {p.fill(0);}

			//p.Fill with this color if you are still alive
			if (this.is_dead == false) {
				p.fill (p.map(p.sin(p.frameCount * this.r_mult),-1,1,10,245),
					    p.map(p.sin(p.frameCount * this.g_mult),-1,1,10,245),
					    p.map(p.sin(p.frameCount * this.b_mult),-1,1,10,245));
			}
			
			p.rect(this.x_pos*step, this.y_pos*step, step, step);	

			if (game_over == false && this.is_dead == true) { 
	        	p.save('wholesome_snake.jpg');
	        	game_over = true;
	        }
		}
	}
};


var myp5 = new p5(sketch, 'gradient_snake');

}