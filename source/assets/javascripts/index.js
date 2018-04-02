// Stylesheets

// Javascripts

const goop = require('./sketches/swiper');
const border_walker = require('./sketches/swiper');
var bodyEl = document.getElementsByTagName('body')[0];

if( Math.random() > 0.5) {
  bodyEl.classList.add('swiper');
  bodyReady();

	goop()
} else {
  bodyEl.classList.add('swiper')
  bodyReady();

	border_walker()
}

function bodyReady() {
  bodyEl.classList.remove('unready');
}
