$(document).ready(function(){
  var aiPlayer, huPlayer, board = [0,1,2,3,4,5,6,7,8], availMoves = [], openSpots = [9,[0,1,2,3,4,5,6,7,8]], turn = x;
  // https://medium.freecodecamp.org/how-to-make-your-tic-tac-toe-game-unbeatable-by-using-the-minimax-algorithm-9d690bad4b37
  aiPlayer = x;
  huPlayer = o; //Need to define functions that ties these into initial menu
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
  function availSpots(board){
    var counter = 9;
    availMoves = [];
    board.forEach((element =>{
      if(typeof(element) == 'number'){
        //counter++;
        availMoves.push(board.indexOf(element));
      }
      else{
        counter--;
      }
    }));
    openSpots = [counter, availMoves];
  }
  function miniMax(openSpots, board, aiPlayer){
    //console.log(board);
    //console.log(openSpots);
    availSpots(board);
    if(openSpots[0] == 9){
      board.shift();
      board.unshift("x");
    }
    else{
      for(i=0; i<openSpots[0]; i++){
        console.log(openSpots[1][i]);
      }
    }
    console.log(board);

  }
  miniMax(openSpots, board, aiPlayer);
  miniMax(openSpots, board, aiPlayer);
}); //END DOC READY
