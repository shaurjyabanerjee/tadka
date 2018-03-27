// Stylesheets

// Javascripts

const goop = require('./sketches/gradient_snake_sound');
const border_walker = require('./sketches/gradient_snake_sound');
var bodyEl = document.getElementsByTagName('body')[0];

if( Math.random() > 0.5) {
  bodyEl.classList.add('gradient_snake_sound');
  bodyReady();

	goop()
} else {
  bodyEl.classList.add('gradient_snake_sound')
  bodyReady();

	border_walker()
}

function bodyReady() {
  bodyEl.classList.remove('unready');
}
