// Stylesheets
import '../stylesheets/project.scss';

const flowfield = require('./sketches/flowfield');
const border_walker = require('./sketches/border_walker');
const gradient_snake = require('./sketches/gradient_snake');
const phyllotaxis = require('./sketches/phyllotaxis');
const maze_generator = require('./sketches/maze_generator');

const $ = require('jquery')


var which_sketch = Math.random();

console.log(which_sketch);

if (which_sketch < 0.25) {
	$('body').addClass('flowfield')
	$('body').removeClass("unready")

	flowfield()
} 

else if (which_sketch >= 0.25 && which_sketch < 0.50) {
	$('body').addClass('border')
	$('body').removeClass("unready")

	border_walker()
}

else if (which_sketch >= 0.50  && which_sketch < 0.75) {
	$('body').addClass('maze_generator')
	$('body').removeClass("unready")

	maze_generator()
}

else if (which_sketch >= 0.75) {
	$('body').addClass('phyllotaxis')
	$('body').removeClass("unready")

	phyllotaxis()
}