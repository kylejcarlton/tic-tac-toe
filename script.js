$(document).ready(function(){
  var aiPlayer, huPlayer, board = [9,1,2,3,4,5,6,7,8,9], availMoves = [], turn = "x", moves = {};
  // https://medium.freecodecamp.org/how-to-make-your-tic-tac-toe-game-unbeatable-by-using-the-minimax-algorithm-9d690bad4b37
  aiPlayer = "x";
  huPlayer = "o"; //Need to define functions that ties these into initial menu
  function endGameEval(player, board){
    if (
    (board[1] == player && board[2] == player && board[3] == player) ||
    (board[4] == player && board[5] == player && board[6] == player) ||
    (board[7] == player && board[8] == player && board[9] == player) ||
    (board[1] == player && board[4] == player && board[7] == player) ||
    (board[2] == player && board[5] == player && board[8] == player) ||
    (board[3] == player && board[6] == player && board[9] == player) ||
    (board[1] == player && board[5] == player && board[9] == player) ||
    (board[3] == player && board[5] == player && board[7] == player)
    ) {
      return true;
    } else {
      return false;
    }
  }
  function availSpots(board){
    availMoves = [];
    for(i=1; i<=board.length; i++){
      if(typeof(board[i]) == 'number'){
        availMoves.push(board[i]);
      }
    }
    availMoves.unshift(availMoves.length);
    console.log(availMoves);
    return availMoves;
  }
  function miniMax(board, turn){
    var evalBoard = board.slice(0);
    var moves = availSpots(board);
      for(i=1; i<=moves[0]; i++){
        evalBoard = board.slice(0);
        if(endGameEval(turn,evalBoard) == false){
          evalBoard[i] = turn;
          console.log(evalBoard);
          /*if(turn == "x"){
            turn = "o";
          }
          else{
            turn = "x";
          }
          //console.log(turn);
          //miniMax(evalBoard, turn);*/
        }
        else{
          console.log("win or tie.");
        }
      }
    }

  //availSpots(board);
  //endGameEval("x", board);
  miniMax(board, turn, aiPlayer, huPlayer);
}); //END DOC READY
