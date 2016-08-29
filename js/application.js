var render = function(string) {
  $(".game-board").append(string.substring(0, 4) + "<br />");
  $(".game-board").append(string.substring(4, 8) + "<br />");
  $(".game-board").append(string.substring(8, 12) + "<br />");
  $(".game-board").append(string.substring(12, 16) + "<br />");
} 

$(document).ready(function() {
  var game = new Game();
  render(game.toString());
});