(function(){
  window.SNAKE = window.SNAKE || {};

  var Apple = SNAKE.Apple = function (board){
    this.board = board;
    this.generate();
  }

  Apple.prototype.generate = function(){
    var x = Math.floor(Math.random() * this.board.dim);
    var y = Math.floor(Math.random() * this.board.dim);

    while (this.board.snake.isSegmentCoord([x, y])) {
      x = Math.floor(Math.random() * this.board.dim);
      y = Math.floor(Math.random() * this.board.dim);
    }

    this.pos = new SNAKE.Coord(x,y);
  }
})();
