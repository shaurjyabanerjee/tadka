// Stylesheets
import '../stylesheets/project.scss';

const goop = require('./sketches/goop1');
const border_walker = require('./sketches/border_walker') 
const $ = require('jquery')

if( Math.random() > 0.5) {
	$('body').addClass('goop')
	$('body').removeClass("unready")

	goop()
} else {
	$('body').addClass('border')
	$('body').removeClass("unready")

	border_walker()
}