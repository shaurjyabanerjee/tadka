// Stylesheets

// Javascripts

const goop = require('./sketches/feedbake_snake_sound');
const border_walker = require('./sketches/feedbake_snake_sound');
var bodyEl = document.getElementsByTagName('body')[0];

if( Math.random() > 0.5) {
  bodyEl.classList.add('feedbake_snake_sound');
  bodyReady();

	goop()
} else {
  bodyEl.classList.add('feedbake_snake_sound')
  bodyReady();

	border_walker()
}

function bodyReady() {
  bodyEl.classList.remove('unready');
}
