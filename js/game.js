var Game = function(boardString='0000000000000000') {
  this.board = generateNewBoard(boardString);

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
        for (var i = 0; i < this.board.length; i++) {
          this.board = resolveColUp(i, this.board);
        }
        break;

      case "down":
        for (var i = 0; i < this.board.length; i++) {
          this.board = resolveColDown(i, this.board);
        }
        break;

      case "left":
        for (var i = 0; i < this.board.length; i++) {
          this.board = resolveRowLeft(i, this.board);
        }
        break;

      case "right":
        for (var i = 0; i < this.board.length; i++) {
          this.board = resolveRowRight(i, this.board);
        }
        break;
    }
    this.board = spawnBlock(this.board)
  }
};

function spawnBlock(board, numBlocks=1) {
  console.log("spawning "+ numBlocks + " block")
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
        console.log(count);
        board[x][y] = parseInt(boardString[count]);
        count++;
      }
    }
  } else {
    board = spawnBlock(board, 2);
  } 
  return board;
}

function resolveColUp(col, board) {
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
  return board;
}

function resolveColDown(col, board) {
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
  return board;
}

function resolveRowLeft(row, board) {
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
  return board;
}

function resolveRowRight(row, board) {
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
  return board;
}