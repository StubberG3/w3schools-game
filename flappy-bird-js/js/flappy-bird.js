var cvs = document.getElementById("canvas");  // 288w x 512h
var ctx = cvs.getContext("2d");

// load images

var bird      = new Image();  // Bird
var bg        = new Image();  // Background
var fg        = new Image();  // Foreground
var pipeNorth = new Image();  // Top Pipe
var pipeSouth = new Image();  // Bottom Pipe

bird.src      = "../images/bird.png";       // 38w x 26h
bg.src        = "../images/bg.png";         // 288w x 512h
fg.src        = "../images/fg.png";         // 306w x 118h
pipeNorth.src = "../images/pipeNorth.png";  // 52w x 242h
pipeSouth.src = "../images/pipeSouth.png";  // 52w x 378h

// Setup Pipes

var pX    = 100;
var P_GAP = 85;
var pK    = pipeNorth.height + P_GAP;

// Setup Foreground

var fgY = cvs.height - fg.height;

// Setup Bird

var bX = 10;
var bY = 150;

var gravity = 1.5;

// Setup Score

var score = 0;

// Setup Audio

var flySound   = new Audio();
var scoreSound = new Audio();
var jabSound   = new Audio();

flySound.src   = "../audio/fly.mp3";
scoreSound.src = "../audio/score.mp3";
jabSound.src   = "../audio/jab.mp3";

// on keydown

document.addEventListener("keydown", moveUp);

function moveUp() {
    bY -= 25;
    flySound.play();
}

// pipe coordinates

var pipes = [];

pipes[0] = {
    x: cvs.width,
    y: 0
}

// draw images
function draw(){
    var gameOver = false;

    // Background
    ctx.drawImage(bg, 0, 0);

    // Pipes
    for (let i = 0; i < pipes.length; i++) {
        ctx.drawImage(pipeNorth, pipes[i].x, pipes[i].y);
        ctx.drawImage(pipeSouth, pipes[i].x, pipes[i].y + pK);

        pipes[i].x-=2;

        if ( pipes[i].x == 124 ) {
            pipes.push( {
                x: cvs.width,
                y: getRandomHeight()
            });
        }

        if (detectCollision(pipes[i].x, pipes[i].y)) {
            gameOver = true;
        } else {
            updateScore(pipes[i].x);
        }
    }

    function updateScore(pX) {
        if (pX === 6) {
            score++;
            scoreSound.play();
        }
    }

    /**
     * Shifts pipeNorth and pipeSouth up or down by a random amount
     * @returns (number) - a random number
     */
    function getRandomHeight() {
        return Math.floor(Math.random()*pipeNorth.height) - pipeNorth.height;
    }

    function endGame() {
        jabSound.play();
        setTimeout(function() {
            location.reload();
        }, 1000);
    }

    function detectCollision(pX, pY) {
        var touchLeftSide      = bX + bird.width >= pX;
        var touchRightSide     = bX <= pX + pipeNorth.width;
        var touchNorthLid  = bY <= pY + pipeNorth.height;
        var touchSouthLid  = bY + bird.height >= pY + pK;
        var touchFg            = bY + bird.height >= cvs.height - fg.height;

        if (
            (
              (touchLeftSide && touchRightSide) // Touch left or right sides of pipe
              &&
              (touchNorthLid || touchSouthLid) // Touch top or bottom pipe lid
            )
            || touchFg // Touch foreground
        ) {
            return true;
        } else {
            return false;
        }
    }

    // Foreground
    ctx.drawImage(fg, 0, fgY);

    // Bird
    ctx.drawImage(bird, bX, bY);

    bY += gravity;

    // Score
    ctx.fillStyle = "#000";
    ctx.font = "20px Verdana";
    ctx.fillText("Score : "+ score, 10, cvs.height-20);

    if (gameOver) {
        endGame();
        return false;
    } else {
        window.requestAnimationFrame(draw);
    }
}

draw();























