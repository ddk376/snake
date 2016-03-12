(function(){
  window.SNAKE = window.SNAKE || {};

  var Snake = SNAKE.Snake = function Snake(board){
    this.direction = "W";
    this.board = board;

    this.segments = [new SNAKE.Coord((board.dim/2)-1, (board.dim/2)-1)];
  }

  Snake.MOVEMENT = {
    "N": new SNAKE.Coord(-1,0),
    "E": new SNAKE.Coord(0,1),
    "S": new SNAKE.Coord(1,0),
    "W": new SNAKE.Coord(0,-1)
  }

  Snake.prototype.isSegmentCoord = function (pos) {
    var result = false;
    this.segments.forEach(function (seg) {
      if (seg.x === pos[0] && seg.y === pos[1]) {
        result = true;
        return result;
      }
    });
    return result;
  };

  Snake.prototype.eatsApple = function(){
    if (this.firstSeg().equals(this.board.apple.pos)) {
      return true;
    } else {
      return false;
    }
  }

  Snake.prototype.firstSeg = function () {
    return this.segments[0];
  };

  Snake.prototype.isValid = function () {
    if (!this.board.notOutOfBounds(this.firstSeg())) { return false; }

    for (var i = 1; i < this.segments.length; i++) {
      if (this.segments[i].equals(this.firstSeg())) { return false; }
    }

    return true;
  };

  Snake.prototype.move = function(){
    this.segments.unshift(this.firstSeg().plus(Snake.MOVEMENT[this.direction]));

    if (this.eatsApple()) {
      this.board.apple.generate();
    }else{
      this.segments.pop();
    }

    if (!this.isValid()) {
      this.segments = [];
    }
  }
  Snake.prototype.oppositeDir = function(){
      switch(this.direction){
        case "N": return "S";
        case "S": return "N";
        case "W": return "E";
        case "E": return "W";
      }
  }

  Snake.prototype.turn = function(dir){
    if(this.oppositeDir()=== dir){ return;}
    this.direction = dir;
  }
})();
