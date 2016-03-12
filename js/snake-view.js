(function(){
  window.SNAKE = window.SNAKE || {};

  var View = SNAKE.View = function($el){
    this.$el = $el;
    this.board = new SNAKE.Board(20);
    this.setupGrid();

    $(document).keydown(this.handleKeyEvents.bind(this));
  };

  View.KEYS = {
    37 : "W",
    38 : "N",
    39 : "E",
    40 : "S"
  }

  View.prototype.setupGrid = function(){
    var html = "";

    for (var i = 0; i < this.board.dim; i++) {
      html += "<ul>";
      for (var j = 0; j < this.board.dim; j++) {
        html += "<li></li>";
      }
      html += "</ul>";
    }

    this.$el.html(html);
  }
  View.TIMEINTERVAL = 250;
  View.prototype.start = function(){
    console.log("start");
    this.render();
    this.interval = window.setInterval(this.step.bind(this), View.TIMEINTERVAL);
  }

  View.prototype.render = function(){
    var grid = this.board.render();
    var children = $(".snake").children();
    for (var i = 0; i < this.board.dim; i++) {
      var row = $(children[i]);
      for (var j = 0; j < this.board.dim; j++) {
        var $li = $(row.children()[j]);
        if(grid[i][j] === "@"){ $li.addClass("apple"); }
        if(grid[i][j] === "$"){ $li.addClass("snakeSeg"); }
        if(grid[i][j] === "*"){
          if($li.hasClass('snakeSeg')){ $li.removeClass("snakeSeg"); }
          if($li.hasClass("apple")){ $li.removeClass("apple"); }
        }
      }
    }
  }

  View.prototype.isStart = function(){
    return $(document).hasClass(".start");
  }

  View.prototype.isRestart = function(){
    return $(document).hasClass(".restart");
  }

  View.prototype.handleKeyEvents = function(e){
    e.preventDefault();
    if(View.KEYS[e.keyCode] && !this.isStart() && !this.isRestart()){
      this.board.snake.turn(View.KEYS[e.keyCode]);
    }else{
      $('.start').remove();
      $('.restart').remove();
      this.board = new SNAKE.Board(20);
      this.start();
    }
  }

  View.prototype.step = function(){
    if(this.board.snake.segments.length > 0){
      this.board.snake.move();
      this.render();
    }else{
      window.clearInterval(this.interval);
      $(".game").append("<div class='restart'><h2>Game Over\n "+
            " Press Any Key to Play Again</h2></div>");
    }
  }

})();
