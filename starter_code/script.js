window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    startGame();
  };


  var jQueryCanvas = $('<canvas width="500" height="800"></canvas>');
  var canvas = jQueryCanvas[0];
  var ctx = canvas.getContext('2d');
  $('#game-board').append(canvas);

  var carXPosition = 250;
  var obstYPosition = 50;


  var img = new Image();
  img.src = "images/car.png";
  img.onload = function(){
    ctx.drawImage(img,carXPosition-40,640,80,160);
  }

  ctx.fillRect(50, obstYPosition, 160,60);

  function startGame() {
    document.onkeydown = function(e) {
      switch(e.keyCode) {
        case 37: carXPosition-=3;
        case 39: carXPosition+=3;
      }
      window.requestAnimationFrame(updateCanvas);
    }
  }

  //use this function inside updateCanvas() to check if car and obstacle crash
  function intersect(rect1, rect2) {
    rect1left = rect1.x
    rect1top = rect1.y
    rect1right = rect1.x + rect1.width
    rect1bottom = rect1.y + rect1.height

    rect2left = rect2.x
    rect2top = rect2.y
    rect2right = rect2.x + rect2.width
    rect2bottom = rect2.y + rect2.height

    return !(rect1left > rect2right
      || rect1right < rect2left
      || rect1top > rect2bottom
      || rect1bottom < rect2top)
  }

  function updateCanvas() {
    obstYPosition +=2;
    ctx.clearRect(0,0,500,800);
    ctx.fillRect(50, obstYPosition, 160,60);
    ctx.drawImage(img,carXPosition-40,640,80,160);
    window.requestAnimationFrame(updateCanvas);
    }
};
