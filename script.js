$(document).ready(function(){
  var aiPlayer, huPlayer, board = [0,1,2,3,4,5,6,7,8], availMoves = [], potentialMoves = [], moves = [];
  aiPlayer = "x";
  huPlayer = "o"; //Need to define functions that ties these into initial menu
  function aiMove(board, aiPlayer){
    potentialMoves = availSpots(board);
    for(i=0; i<potentialMoves.length; i++){
      var potentialBoard = board.slice(0);
      potentialBoard[potentialMoves[i]] = aiPlayer;
      moves.push({option:i,move:aiPlayer,board:potentialBoard});
      miniMax(moves[i]);
    }
  }
  function endGameEval(player, board){
    if (
    (board[0] == player && board[1] == player && board[2] == player) ||
    (board[3] == player && board[4] == player && board[5] == player) ||
    (board[6] == player && board[7] == player && board[8] == player) ||
    (board[0] == player && board[3] == player && board[6] == player) ||
    (board[1] == player && board[4] == player && board[7] == player) ||
    (board[2] == player && board[5] == player && board[8] == player) ||
    (board[0] == player && board[4] == player && board[8] == player) ||
    (board[2] == player && board[4] == player && board[6] == player) ||
    (availSpots(board).length == 0)
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
  function miniMax(moves){
    if(endGameEval(moves.move, moves.board) == false){
      console.log(moves);
    }
  }

  board = ["o",1,"x","x",4,"x",6,"o","o"]
  aiMove(board, aiPlayer);
}); //END DOC READY
