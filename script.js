$(document).ready(function(){
  var aiPlayer, huPlayer, board = [0,1,2,3,4,5,6,7,8], availMoves = [], turn = "x", moves = {};
  // https://medium.freecodecamp.org/how-to-make-your-tic-tac-toe-game-unbeatable-by-using-the-minimax-algorithm-9d690bad4b37
  aiPlayer = "x";
  huPlayer = "o"; //Need to define functions that ties these into initial menu
  function endGameEval(player, board){
    if (
    (board[0] == player && board[1] == player && board[2] == player) ||
    (board[3] == player && board[4] == player && board[5] == player) ||
    (board[6] == player && board[7] == player && board[8] == player) ||
    (board[0] == player && board[3] == player && board[6] == player) ||
    (board[1] == player && board[4] == player && board[7] == player) ||
    (board[2] == player && board[5] == player && board[8] == player) ||
    (board[0] == player && board[4] == player && board[8] == player) ||
    (board[2] == player && board[4] == player && board[6] == player)
    ) {
      return true;
    } else {
      return false;
    }
  }
  function availSpots(board){
    availMoves = [];
    for(i=0; i<=board.length; i++){
      if(typeof(board[i]) == 'number'){
        availMoves.push(board[i]);
      }
    }
    availMoves.unshift(availMoves.length);
    console.log("availMoves:"+availMoves);
    return availMoves;
  }
  function miniMax(board, turn){
    var depth = 0;
    var evalBoard = board.slice(0);
    var moves = availSpots(board);
    console.log(evalBoard, moves);
    for(i = 0; i < moves[0]; i++){
      console.log(evalBoard[availMoves[i+1]]);
    }
    }

    board = ["x","x","x",3,4,5,6,7,8]
    miniMax(board, turn);
}); //END DOC READY
