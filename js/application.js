var game;
$(document).ready(function() {
  if (!localStorage.length) {
    console.log("no localstorage")
    game = new Game();
    populateLocalStorage(game);
  } else {
    console.log("local exists")
    game = new Game(localStorage.board.split(","));
    console.log(game);
    game.moves = parseInt(localStorage.getItem('moves'));
    game.score = parseInt(localStorage.getItem('score'));
  }
  render(localStorage, true);
  console.log(game.toString());

  $('html').on('keyup', function(event) {
    switch (event.keyCode) {
      case 27:
        game = new Game();
        populateLocalStorage(game);
        render(localStorage, true);
        break;
      case 37:
        game.move('left');
        populateLocalStorage(game);
        break;

      case 38:
        game.move('up');
        populateLocalStorage(game);
        break;

      case 39:
        game.move('right');
        populateLocalStorage(game);
        break;

      case 40:
        game.move('down');
        populateLocalStorage(game);
        break;
    }
    render(localStorage);
  });

  $("#restart").click(function(event){
    game = new Game();
    populateLocalStorage(game);
    render(localStorage, true);
  });
});

var render = function(storage, animate=false) {
  array = storage.board.split(",");
  for (var i = 0; i < 16; i++) {
    var block = $('#' + i);
    block.html(array[i]);
    block.attr('val', array[i]);
    if (array[i] != 0) {
      block.animateCss('bounceIn');
    }
  }
  $("#moves").html(storage.moves);
  $("#score").html(storage.score);
  if (animate) {
    $('#game-table').animateCss('bounceIn');
  }
} 

function populateLocalStorage(game) {
  localStorage.setItem('board', game.toArray().join(","));
  localStorage.setItem('score', game.score);
  localStorage.setItem('moves', game.moves);
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