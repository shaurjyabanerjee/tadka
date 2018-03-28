// Stylesheets
import '../stylesheets/project.scss';

const flowfield      = require('./sketches/flowfield');
const border_walker  = require('./sketches/border_walker');
const gradient_snake = require('./sketches/gradient_snake');
const phyllotaxis    = require('./sketches/phyllotaxis');
const maze_generator = require('./sketches/maze_generator');
const feedbake_snake = require('./sketches/feedbake_snake');
const grid_goop      = require('./sketches/goop1');

var bodyEl = document.getElementsByTagName('body')[0];

var which_sketch = Math.random();

console.log(which_sketch);

if (which_sketch < 0.25) {
  bodyEl.classList.add('flowfield');
  bodyReady();

	flowfield()
}

else if (which_sketch >= 0.25 && which_sketch < 0.50) {
  bodyEl.classList.add('border');
  bodyReady();

	border_walker()
}

else if (which_sketch >= 0.50  && which_sketch < 0.75) {
  bodyEl.classList.add('grid_goop');
  bodyReady();

	grid_goop()
}

else if (which_sketch >= 0.75) {
  bodyEl.classList.add('phyllotaxis');
  bodyReady();

	phyllotaxis()
}

function bodyReady() {
  bodyEl.classList.remove('unready');
}
