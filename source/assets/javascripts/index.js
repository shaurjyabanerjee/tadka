// Stylesheets

// Javascripts

const gradient_snake = require('./sketches/gradient_snake');
const feedbake_snake = require('./sketches/feedbake_snake');
const maze_generator = require('./sketches/maze_generator');
const goop2          = require('./sketches/goop3_landing');

var bodyEl = document.getElementsByTagName('body')[0];

var which_sketch = Math.random();

if (which_sketch < 0.33) {
  bodyEl.classList.add('goop2');
  bodyReady();

  goop2();
} 

else if (which_sketch >= 0.33 && which_sketch < 0.66) {
  bodyEl.classList.add('goop2');
  bodyReady();

  goop2();
} 

else if (which_sketch >= 0.66) 
{
  bodyEl.classList.add('goop2')
  bodyReady();

  goop2();
}

function bodyReady() {
  bodyEl.classList.remove('unready');
}
