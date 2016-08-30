var Game = function(boardString='0000000000000000') {
  this.board = generateNewBoard(boardString);
  this.moves = 0;

  this.toArray = function() {
    array = this.board[0].join(",") + "," + this.board[1].join(",") + "," + this.board[2].join(",") + "," + this.board[3].join(",");
    return array.split(",");
  }

  this.toString = function() {
    return this.board[0].join('') + "\n" + this.board[1].join('') + "\n" + this.board[2].join('') + "\n" + this.board[3].join('');
  }

  this.move = function(direction) {
    switch (direction) {
      case "up":
        this.board = resolveColUp(this.board);
        break;

      case "down":
        this.board = resolveColDown(this.board);
        break;

      case "left":
        this.board = resolveRowLeft(this.board);
        break;

      case "right":
        this.board = resolveRowRight(this.board);
        break;
    }
    this.board = spawnBlock(this.board)
    this.moves++;
  }
};

function spawnBlock(board, numBlocks=1) {
  var count = 0;
  while (count < numBlocks) {
    row = Math.floor(Math.random() * 4);
    col = Math.floor(Math.random() * 4);
    if (board[row][col] === 0) {
      board[row][col] = 2;
      count++;
    }
  }
  return board;
}

function generateNewBoard(boardString) {
  console.log("generating board from string " + boardString)
  var board = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ];
  if (boardString != "0000000000000000" && /^[02]+$/.test(boardString) && boardString.length == 16) {
    var count = 0;
    for(var x = 0; x < 4; x++) {
      for (var y = 0; y < 4; y++) {
        board[x][y] = parseInt(boardString[count]);
        count++;
      }
    }
  } else {
    board = spawnBlock(board, 2);
  } 
  return board;
}

function resolveColUp(board) {
  for (var col = 0; col < board.length; col++) { // run for each column
    for (var j = 0; j < 3; j++) { // run each column 3 times
      for (var i = 0; i < 3; i++) { // iterate through column
        if (board[i][col] == 0) {
          board[i][col] = board[i][col] + board[i + 1][col];
          board[i + 1][col] = 0;
        } else if (board[i][col] == board[i + 1][col] && board[i][col] != 0) {
          board[i][col] = board[i][col] + board[i + 1][col];
          board[i + 1][col] = 0;
          j++;
        }
      }
    }
  }
  return board;
}

function resolveColDown(board) {
  for (var col = 0; col < board.length; col++) {
    for (var j = 0; j < 3; j++) { // 3 times per column
      for (var i = 3; i > 0; i--) { //iterate through column from bottom up
        if (board[i][col] == 0) {
          board[i][col] = board[i][col] + board[i - 1][col];
          board[i - 1][col] = 0;
        } else if (board[i][col] == board[i - 1][col] && board[i][col] != 0) {
          board[i][col] = board[i][col] + board[i - 1][col];
          board[i - 1][col] = 0;
          j++;
        }
      }
    }
  }
  return board;
}

function resolveRowLeft(board) {
  for (var row = 0; row < board.length; row++) {
    for (var j = 0; j < 3; j++) {
      for (var i = 0; i < 3; i++) {
        if (board[row][i] == 0) {
          board[row][i] = board[row][i] + board[row][i + 1];
          board[row][i + 1] = 0;
        } else if (board[row][i] == board[row][i + 1] && board[row][i] != 0) {
          board[row][i] = board[row][i] + board[row][i + 1];
          board[row][i + 1] = 0;
          j++;
        }
      }
    }
  }
  return board;
}

function resolveRowRight(board) {
  for (var row = 0; row < board.length; row++) {
    for (var j = 0; j < 3; j++) {
      for (var i = 3; i > 0; i--) {
        if (board[row][i] == 0) {
          board[row][i] = board[row][i] + board[row][i - 1];
          board[row][i - 1] = 0;
        } else if (board[row][i] == board[row][i - 1] && board[row][i] != 0) {
          board[row][i] = board[row][i] + board[row][i - 1];
          board[row][i - 1] = 0;
          j++;
        }
      }
    }
  }
  return board;
}