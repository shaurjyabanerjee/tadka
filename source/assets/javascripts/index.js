// Stylesheets

// Javascripts

const goop = require('./sketches/phyllotaxis');
const border_walker = require('./sketches/phyllotaxis');
const $ = require('jquery')

if( Math.random() > 0.5) {
	$('body').addClass('phyllotaxis')
	$('body').removeClass("unready")
	goop()
} else {
	
	$('body').addClass('phyllotaxis')
	$('body').removeClass('unready')

	border_walker()
}