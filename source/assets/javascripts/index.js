// Stylesheets

// Javascripts

const goop = require('./sketches/gradient_snake');
const border_walker = require('./sketches/gradient_snake');
const $ = require('jquery')

if( Math.random() > 0.5) {
	$('body').addClass('gradient_snake')
	$('body').removeClass("unready")
	goop()
} else {
	
	$('body').addClass('gradient_snake')
	$('body').removeClass('unready')

	border_walker()
}