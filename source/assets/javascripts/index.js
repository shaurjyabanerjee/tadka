// Stylesheets

// Javascripts

const goop = require('./sketches/gradient_snake');
const border_walker = require('./sketches/gradient_snake');
var bodyEl = document.getElementsByTagName('body')[0];

if( Math.random() > 0.5) {
  bodyEl.classList.add('gradient_snake');
  bodyReady();

	goop()
} else {
  bodyEl.classList.add('gradient_snake')
  bodyReady();

	border_walker()
}

function bodyReady() {
  bodyEl.classList.remove('unready');
}
