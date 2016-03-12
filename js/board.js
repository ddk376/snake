(function(){
  window.SNAKE = window.SNAKE || {};

  var Board = SNAKE.Board = function(dim){
    this.dim = dim;

    this.snake = new SNAKE.Snake(this);
    this.apple = new SNAKE.Apple(this);
  }

  Board.makeGrid = function (dim) {
    var grid = [];
    for (var i = 0; i < dim; i++) {
      var row = [];
      for (var j = 0; j < dim; j++) { row.push("*"); }
      grid.push(row);
    }

    return grid;
  };

  Board.prototype.render = function () {
    var grid = Board.makeGrid(this.dim);
    grid[this.apple.pos.x][this.apple.pos.y] = "@";
    this.snake.segments.forEach(function(seg){ grid[seg.x][seg.y] = "$"; });

    return grid;
  };

  Board.prototype.notOutOfBounds = function(coord){
    return (coord.x >= 0 && coord.x < this.dim) &&
      (coord.y >= 0 && coord.y < this.dim);
  }
})();
