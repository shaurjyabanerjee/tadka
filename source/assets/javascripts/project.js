// Stylesheets
import '../stylesheets/project.scss';

const flowfield = require('./sketches/flowfield');
const border_walker = require('./sketches/border_walker');
const gradient_snake = require('./sketches/gradient_snake');

const $ = require('jquery')


var which_sketch = Math.random();

console.log(which_sketch);

if (which_sketch < 0.33) {
	$('body').addClass('flowfield')
	$('body').removeClass("unready")

	flowfield()
} 

else if (which_sketch >= 0.33 && which_sketch < 0.66) {
	$('body').addClass('border')
	$('body').removeClass("unready")

	border_walker()
}

else if (which_sketch >= 0.66) {
	$('body').addClass('gradient_snake')
	$('body').removeClass("unready")

	gradient_snake()
}