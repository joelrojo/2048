var game;
$(document).ready(function() { // can also write it $(function(){ code here })
  if (!localStorage.length) {
    game = new Game();
    populateLocalStorage(game);
  } else {
    console.log("localstorage available");
    console.log(localStorage);
    game = new Game(localStorage.board.split(",").map(Number));
    game.moves = parseInt(localStorage.getItem('moves'));
    game.score = parseInt(localStorage.getItem('score'));
  }
  render(localStorage, true);

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
        render(localStorage);
        break;

      case 38:
        game.move('up');
        populateLocalStorage(game);
        render(localStorage);
        break;

      case 39:
        game.move('right');
        populateLocalStorage(game);
        render(localStorage);
        break;

      case 40:
        game.move('down');
        populateLocalStorage(game);
        render(localStorage);
        break;
    }
  });

  $("#restart").click(function(event){
    game = new Game();
    populateLocalStorage(game);
    render(localStorage, true);
  });

  $("#auto").click(function(event){
    var keyCodes = [37,38,39,40];
    (function theLoop (i) {
      setTimeout(function () {
        var index = Math.floor(Math.random()*keyCodes.length);
        var e = $.Event("keyup", {keyCode: keyCodes[index]});
         $('html').trigger(e);
        if (--i) {          // If i > 0, keep going
          theLoop(i);       // Call the loop again, and pass it the current value of i
        }
      }, 300);
    })(parseInt($("#amount").val()));
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