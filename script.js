$(document).ready(function(){
  var aiPlayer, huPlayer, board = [0,1,2,3,4,5,6,7,8], availSpots = 9;

  function endGameEval(player, board){
    if(
      (player == board[0] == board[1] == board [2]) ||
      (player == board[3] == board[4] == board [5]) ||
      (player == board[6] == board[7] == board [8]) ||
      (player == board[0] == board[3] == board [6]) ||
      (player == board[1] == board[4] == board [7]) ||
      (player == board[2] == board[5] == board [8]) ||
      (player == board[0] == board[4] == board [8]) ||
      (player == board[6] == board[4] == board [2])
    ){
      return true;
    } else {
      return false;
    }
  }


  }

}); //END DOC READY
