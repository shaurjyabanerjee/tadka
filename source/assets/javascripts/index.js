// Stylesheets

// Javascripts

const gradient_snake = require('./sketches/gradient_snake');
const feedbake_snake = require('./sketches/feedbake_snake');
const maze_generator = require('./sketches/maze_generator');

var bodyEl = document.getElementsByTagName('body')[0];

var which_sketch = Math.random();

if (which_sketch < 0.33) {
  bodyEl.classList.add('gradient_snake');
  bodyReady();

  gradient_snake();
} 

else if (which_sketch >= 0.33 && which_sketch < 0.66) {
  bodyEl.classList.add('feedbake_snake');
  bodyReady();

  feedbake_snake();
} 

else if (which_sketch >= 0.66) 
{
  bodyEl.classList.add('maze_generator')
  bodyReady();

  maze_generator();
}

function bodyReady() {
  bodyEl.classList.remove('unready');
}
