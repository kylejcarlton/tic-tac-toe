$(document).ready(function(){
  var aiPlayer, huPlayer, board = [0,1,2,3,4,5,6,7,8], availMoves = [], potentialMoves = [], moves = [];
  aiPlayer = "x";
  huPlayer = "o"; //Need to define functions that ties these into initial menu
  function aiMove(board, aiPlayer){
    potentialMoves = availSpots(board);
    for(j=0; j<potentialMoves.length; j++){
      var potentialBoard = board.slice(0);
      potentialBoard[potentialMoves[j]] = aiPlayer;
      moves.push({option:j,move:aiPlayer,board:potentialBoard});
      miniMax(moves[j]);
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
  function miniMax(pMove){
    if(endGameEval(pMove.move, pMove.board) == false){
      console.log("true");
      //change player
      //if()
      //calculate available spots
      //assign changed player to each spot in each array value
      //pass each new board back to miniMax for evaluation
    }
    else{
      console.log("The End");
    }
  }

  board = ["o",1,"x","x",4,"x",6,"o","o"]
  aiMove(board, aiPlayer);
}); //END DOC READY
