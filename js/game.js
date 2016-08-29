var Game = function(board = [0,0,0,0,2,0,2,0,0,0,0,0,0,0,0,0]){
  this.board = board;

  this.toString = function() {
    string = board.join("");
    return string;
  }
  
};