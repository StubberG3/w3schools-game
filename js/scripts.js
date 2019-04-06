$("document").ready(function() {
    startGame();
})

function startGame() {
    redGamePiece = new component(75, 75, "red", 10, 10);
    yellowGamePiece = new component(75, 75, "yellow", 50, 60);
    blueGamePiece = new component(75, 75, "blue", 10, 110);

    myGameArea.start();
}

function component(width, height, color, x, y) {
  this.width = width;
  this.height = height;
  this.x = x;
  this.y = y;
  this.update = function(){
    ctx = myGameArea.context;
    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

function updateGameArea() {
    myGameArea.clear();

    redGamePiece.x += 2;
    redGamePiece.y += 2;
    yellowGamePiece.x += .5;
    yellowGamePiece.y += .5;
    blueGamePiece.x += -1;
    blueGamePiece.y += 2;

    redGamePiece.update();
    yellowGamePiece.update();
    blueGamePiece.update();
}

var redGamePiece, blueGamePiece, yellowGamePiece;

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}