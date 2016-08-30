var game;
$(document).ready(function() {
  game = new Game();
  render(game, true);
  console.log(game.toString());

  $('html').on('keyup', function(event) {
    switch (event.keyCode) {
      case 27:
        game = new Game();
        render(game, true);
        break;
      case 37:
        game.move('left');
        break;

      case 38:
        game.move('up');
        break;

      case 39:
        game.move('right');
        break;

      case 40:
        game.move('down');
        break;
    }
    render(game);
  });

  $("#restart").click(function(event){
    game = new Game();
    render(game, true);
  });
});

var render = function(game, animate=false) {
  var array = game.toArray()
  for (var i = 0; i < 16; i++) {
    var block = $('#' + i);
    block.html(array[i]);
    block.attr('val', array[i]);
    if (array[i] != 0) {
      block.animateCss('bounceIn');
    }
  }
  $("#moves").html(game.moves);
  if (animate) {
    $('#game-table').animateCss('bounceIn');
  }
} 



// extending jQuery for animation
$.fn.extend({
    animateCss: function (animationName) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        $(this).addClass('animated ' + animationName).one(animationEnd, function() {
            $(this).removeClass('animated ' + animationName);
        });
    }
});