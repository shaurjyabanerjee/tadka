// Stylesheets

// Javascripts

const goop = require('./sketches/maze_generator');
const border_walker = require('./sketches/maze_generator');
const $ = require('jquery')

if( Math.random() > 0.5) {
	$('body').addClass('maze_generator')
	$('body').removeClass("unready")
	goop()
} else {
	
	$('body').addClass('maze_generator')
	$('body').removeClass('unready')

	border_walker()
}