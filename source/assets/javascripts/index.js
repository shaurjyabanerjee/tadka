// Stylesheets

// Javascripts

const goop = require('./sketches/feedbake_snake');
const border_walker = require('./sketches/feedbake_snake');
var bodyEl = document.getElementsByTagName('body')[0];

if( Math.random() > 0.5) {
  bodyEl.classList.add('feedbake_snake');
  bodyReady();

	goop()
} else {
  bodyEl.classList.add('feedbake_snake')
  bodyReady();

	border_walker()
}

function bodyReady() {
  bodyEl.classList.remove('unready');
}
