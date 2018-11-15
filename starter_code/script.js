window.onload = function () {
  document.getElementById("start-button").onclick = function () {
    startGame();
  };


  var jQueryCanvas = $('<canvas width="500" height="800"></canvas>');
  var canvas = jQueryCanvas[0];
  var ctx = canvas.getContext('2d');
  $('#game-board').append(canvas);

  var carXPosition = 250;
  var obstYPosition = 0;


  var imgCar = new Image();
  imgCar.src = "images/car.png";
  imgCar.onload = function () {
    ctx.drawImage(imgCar, carXPosition - 40, 640, 80, 160);
  }

  // var imgPow = new Image()
  // imgPow.src = "images/POW.png";


  var obstArr = [];
  class obstRandom {
    constructor() {
      this.obstXPosition = Math.floor(Math.random() * 500) + 1;
      this.obstYPosition = 0;
      this.heigth = 60;
      this.width = Math.floor(Math.random() * (500 - this.obstXPosition));
    }
  }

  var spaceBetweenObst = 250;

  function drawObst() {
    for(i = 0; i<obstArr.length; i++) {
      ctx.fillRect(
        obstArr[i].obstXPosition,
        obstArr[i].obstYPosition,
        obstArr[i].width,
        obstArr[i].height,
      );
      obstArr[i].obstYPosition +=3;
    }
    if(obstArr[0].obstYPosition > 803) obstArr.unshift(); //deletes first element of the array (which is the lowest down at the screen) --> array doesnt get infinite length
  }

  function startGame() {
    document.onkeydown = function (event) {
      var key = event.keyCode;
      if (key === 37) {
        carXPosition -= 5;
      } else if (key === 39) {
        carXPosition += 5;
      }
    }
    obstArr.push(new obstRandom());
    window.requestAnimationFrame(updateCanvas);
  }


  function updateCanvas() {
    if (
      intersect({
        x: 0,
        y: obstYPosition,
        width: 250,
        height: 60
      }, {
        x: carXPosition,
        y: 650,
        width: 80,
        height: 160
      })
    ) {
      alert("POW! You crashed");        
      ctx.drawImage(imgPow, powPosition, 250, 400, 50, 50);
    } else {
      obstYPosition += 2;
      ctx.clearRect(0, 0, 500, 800);
      drawObst();
      ctx.drawImage(imgCar, carXPosition - 40, 640, 80, 160);
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
  
      return !(rect1left > rect2right ||
        rect1right < rect2left ||
        rect1top > rect2bottom ||
        rect1bottom < rect2top)
    }
}