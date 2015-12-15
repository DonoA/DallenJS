// Based off code from here - http://www.reddit.com/r/gifs/comments/2on8si/connecting_to_server_so_mesmerizing/cmow0sz

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var numBalls = 50; // numb balls
var timeStep = 0;
var ballYTravel = 55;
var poscolors = ["black", "red", "blue", "green", "gold", "purple", "pink", "orange", "brown"];
var colors = []
var num = Math.floor(Math.random()*4) + 2;
for(var k = 0; k < num; k++){
    colors.push(poscolors[Math.floor(Math.random()*poscolors.length)]);
}
var animationPosX = 12;

function clearCanvas() {
     ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawBall(y, x, radius, color) {
     ctx.beginPath();
     ctx.arc(y, x, radius, 0, 2 * Math.PI);
     ctx.strokeStyle=color;
     ctx.stroke();
}

function animateBalls() {
     clearCanvas();
     var j = 0;
     for (var i = 0; i < numBalls; i++) {
          drawBall(animationPosX + 20 * i, getY(i, timeStep) - 160, 5, colors[j]);
          if(j<colors.length - 1){
              j++;
          }else{
              j = 0;
          }
     }

     timeStep++;
}

function getY(i, timeStep) {
 return 200 + ballYTravel / 2 * (Math.sin(timeStep * (i / 200 + 0.08)));
}

setInterval(animateBalls, 1000 / 60);
