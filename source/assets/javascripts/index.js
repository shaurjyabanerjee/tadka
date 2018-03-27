// Stylesheets

// Javascripts

const goop = require('./sketches/maze_generator');
const border_walker = require('./sketches/maze_generator');
var bodyEl = document.getElementsByTagName('body')[0];

if( Math.random() > 0.5) {
  bodyEl.className = 'maze_generator';

	goop()
} else {
	bodyEl.className = 'maze_generator';

	border_walker()
}
