


import p5 from 'p5';
import 'hammerjs';

module.exports =  function() {
	var sketch = function(p) {

		var msg = "swipe";
		 
		p.setup = function() {
		  p.createCanvas(640, 480);
		  p.textSize(12);
		  p.noStroke();
		 
		  // set options to prevent default behaviors for swipe, pinch, etc
		  var options = {
		    preventDefault: true
		  };
		 
		  // document.body registers gestures anywhere on the page
		  var hammer = new Hammer(document.body, options);
		  hammer.get('swipe').set({
		    direction: Hammer.DIRECTION_ALL
		    //direction: Hammer.DIRECTION_VERTICAL
		  });

		  hammer.get('swipe').set({
		    //direction: Hammer.DIRECTION_ALL
		    direction: Hammer.DIRECTION_VERTICAL
		  });
		 
		  hammer.on("swipe", p.swiped); //tie event 'swipe' to function 'swiped'
		}
		 
		 
		p.draw = function() {
		  p.background(255);
		  p.fill(255, 0, 0);
		 
		  p.text(msg, 12, 12);
		}
		 
		 
		p.swiped = function(event) {
		  console.log(event);
		  if (event.direction == 1) {
		    msg = "you swiped up";
		  }
		  else if (event.direction == 3) {
		    msg = "you swiped down";
		  }
		  else if (event.direction == 4) {
		    msg = "you swiped right";

		  } else if (event.direction == 2) {
		    msg = "you swiped left";
		  }
		}

	};


var myp5 = new p5(sketch, 'gradient_snake');

}