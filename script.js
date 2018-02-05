$(document).ready(function(){
  var aiPlayer, huPlayer, board = [0,1,2,3,4,5,6,7,8], availMoves = [], moves = [];
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
    return availMoves;
  }
  function miniMax(board, aiPlayer){
    console.log(availSpots(board));

  }
  function aiMove(board, aiPlayer){
    var potentialMoves = availSpots(board);
    for(i=0; i<potentialMoves.length; i++){
      var potentialBoard = board.slice(0);
      potentialBoard[potentialMoves[i]] = aiPlayer;
      moves.push(potentialBoard);
    }
    console.log(moves);

  }

  board = ["o",1,"x","x",4,"x",6,"o","o"]
  aiMove(board, aiPlayer);
}); //END DOC READY
