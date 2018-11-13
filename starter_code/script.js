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
    ctx.drawImage(img,carXPosition-80,480,160,320);
  }


  function updateCanvas() {
    ctx.clearRect(0,0,500,800);
    ctx.drawImage(img,carXPosition-80,480,160,320)
  }
  updateCanvas();
  
  ctx.fillRect(50,obstYPosition,160,80);
  ctx.fillStyle("red");


  function startGame() {
    document.onkeydown = function(e) {
      if(e.keyCode === 37) {
        carXPosition--;
        ctx.clearRect(0,0,500,800);
        ctx.drawImage(img,carXPosition-80,480,160,320)
      }
      if(e.keyCode === 39) {
        carXPosition++;
        ctx.clearRect(0,0,500,800);
        ctx.drawImage(img,carXPosition-80,480,160,320)
      }
    }
  }
};
