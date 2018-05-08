//Blank p5.js sketch template
//Shaurjya Banerjee - 2018

import p5 from 'p5';

module.exports =  function() {
  var sketch = function(p) {
    var numberSquares;
    var squareWidth;

    var xSquareValue;
    var ySquareValue;

    var brushColor;

    var canvasSquares = [];


    p.setup = function()
    {
      numberSquares = 70;
    	brushColor = 0;

    	p.createCanvas(600,600);
    	p.noStroke();
    	squareWidth = p.width/numberSquares;

    	for (var i = 0; i < numberSquares; i+=1) {
    		canvasSquares[i] = [];
        	for (var j = 0; j <numberSquares; j+=1) {
        		canvasSquares[i][j] = 255;
        	}
      	}
    }

    p.draw = function()
    {
      p.displayCanvas();
    }

    p.displayCanvas = function()
    {
      for (var i = 0; i < numberSquares; i+=1) {
        for (var j = 0; j <numberSquares; j+=1) {     
          p.fill(canvasSquares[i][j]);
          p.rect(i*squareWidth, j*squareWidth, squareWidth, squareWidth);
        }
      }
    }

    p.mouseDragged = function()
    //The value of xSquareValue is determined by rounding down the pixel
    //located at mouseX, mapped between 0 and the width, to a value in numberSquares
    {
      xSquareValue = p.constrain(p.floor(p.map(p.mouseX, 0, p.width, 0, numberSquares)), 0, numberSquares-1);
      ySquareValue = p.constrain(p.floor(p.map(p.mouseY, 0, p.height, 0, numberSquares)), 0, numberSquares-1);
      
    //Processing is told by this function to fill the xSquareValue and ySquareValue in
    //my array with the float brushColor (below)

      canvasSquares[xSquareValue][ySquareValue] = brushColor;
    }

    p.keyPressed = function(){
      if (p.key == 'B') {brushColor = p.color(20, 60, 200);}
      else if (p.key == 'R') {brushColor = p.color(230, 10, 0);}
      else if (p.key == 'G') {brushColor = p.color(96, 169, 23);}
      else if (p.key == 'Y') {brushColor = p.color(250, 200, 0);}
      else if (p.key == 'P') {brushColor = p.color(250, 140, 190);}
      else if (p.key == 'Q') {brushColor = p.color(0);}
      else if (p.key == 'O') {brushColor = p.color(250, 104, 0);}
      else if (p.key == 'E') {brushColor = 255;}
      else if (p.key == 'X') {p.eraseCanvas();}
      else if (p.key == 'S') {p.downloadCanvas ();}
    }

    p.eraseCanvas = function()
    //Tells Processing to go through the squares and change them back to white
    {
      for (var i = 0; i < numberSquares; i+=1) {
        for (var j = 0; j <numberSquares; j+=1) {
          canvasSquares[i][j] = 255;
        }
      }
    }

    p.downloadCanvas = function(){
    	p.save('BeautifulArt.jpg');
    }
  };

  var myp5 = new p5(sketch, 'artscanvus');
}