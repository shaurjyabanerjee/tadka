import '../stylesheets/project.scss';

const flowfield               = require('./sketches/flowfield');
const flowfield_inverted      = require('./sketches/flowfield_inverted');
const border_walker           = require('./sketches/border_walker');
const border_walker_inverted  = require('./sketches/border_walker_inverted');
const gradient_snake          = require('./sketches/gradient_snake');
const phyllotaxis             = require('./sketches/phyllotaxis');
const maze_generator          = require('./sketches/maze_generator');
const feedbake_snake          = require('./sketches/feedbake_snake');
const grid_goop               = require('./sketches/goop1');

var bodyEl = document.getElementsByTagName('body')[0];
var which_sketch = Math.random();

//This is the sketch that is run on the sculptures page,
//as identified by the 'projects' class
if(bodyEl.classList.contains('projects')) {
  bodyEl.classList.add('grid_goop');
  bodyReady();
  grid_goop();
} 

//GAME PAGES ------------------------------------------------------------------------
//This is the sketch run on the games/maze generator page
else if (bodyEl.classList.contains('games_maze_generator')) {
  bodyEl.classList.add('maze_generator');
  bodyReady();
  maze_generator();
}

//This is the sketch run on the games/simple_snake page
else if (bodyEl.classList.contains('games_simple_snake')) {
  bodyEl.classList.add('simple_snake');
  bodyReady();
  gradient_snake();
}

//This is the sketch run on the games/simple_snake page
else if (bodyEl.classList.contains('games_feedbake_snake')) {
  bodyEl.classList.add('feedbake_snake');
  bodyReady();
  feedbake_snake();
}

//PROJECT SKETCHES ------------------------------------------------------------------
//These are the sketches that are chosen randomly on each 
//individual project page

else {
  if (which_sketch < 0.25) {
    bodyEl.classList.add('flowfield_inverted');
    bodyReady();
    flowfield_inverted();
  }

  else if (which_sketch >= 0.25 && which_sketch < 0.50) {
    bodyEl.classList.add('border');
    bodyReady();
    border_walker();
  }

  else if (which_sketch >= 0.50  && which_sketch < 0.75) {
    bodyEl.classList.add('flowfield');
    bodyReady();
    flowfield();
  }

  else if (which_sketch >= 0.75) {
    bodyEl.classList.add('border_inverted');
    bodyReady();
    border_walker_inverted();
  }
}

function bodyReady() {
  bodyEl.classList.remove('unready');
}
