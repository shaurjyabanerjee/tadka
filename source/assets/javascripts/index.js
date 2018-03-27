// Stylesheets

// Javascripts

const goop = require('./sketches/maze_generator');
const border_walker = require('./sketches/maze_generator');
var bodyEl = document.getElementsByTagName('body')[0];

if( Math.random() > 0.5) {
  bodyEl.className = 'maze_generator';
  bodyReady();

	goop()
} else {
	bodyEl.className = 'maze_generator';
  bodyReady();

	border_walker()
}

function bodyReady() {
  bodyEl.classList.remove('unready');
}
