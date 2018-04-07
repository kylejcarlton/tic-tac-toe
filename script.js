$(document).ready(function(){
  var aiPlayer, huPlayer, turn, board = [0,1,2,3,4,5,6,7,8], availMoves = [], potentialMoves = [], moves = [];
  $("#x").click(function(){
    aiPlayer = "o";
    huPlayer = "x";
    turn = "huPlayer";
    gameTurn(aiPlayer, huPlayer, turn);
    $("#playerSelect").fadeOut();
  });
  $("#o").click(function(){
    aiPlayer = "x";
    huPlayer = "o";
    turn = "aiPlayer";
    gameTurn(aiPlayer, huPlayer, turn);
    $("#playerSelect").fadeOut();
  });

  function gameTurn (aiPlayer, huPlayer, turn){
    if(turn == "aiPlayer"){
      console.log("logic to make move and write it !!")

    }
    else if(turn == "huPlayer"){
      console.log("let human move now.")

    }
  }

  //aiPlayer = "x"; //remove when logic is in place.
  //huPlayer = "o";

  function aiMove(board, aiPlayer){
    potentialMoves = availSpots(board);
    for(j=0; j<potentialMoves.length; j++){
      var potentialBoard = board.slice(0);
      potentialBoard[potentialMoves[j]] = aiPlayer;
      moves.push({option:j,move:huPlayer,board:potentialBoard,level:0,rating:0});
      miniMax(moves[j]);
    }
    for(l=0; l<moves.length; l++){
      console.log(moves[l].rating);
      // https://stackoverflow.com/questions/4020796/finding-the-max-value-of-an-attribute-in-an-array-of-objects ?
      //if(moves[l].rating < 0){
        //moves.splice(l, 1);
      //}
    }
    console.log(moves);
  }
  function miniMax(pMove){
    pMove.level++;
    if(endGameEval(pMove.move, pMove.board) == false){
      switch(pMove.move){
        case "x":
          pMove.move = "o";
          break;
        case "o":
          pMove.move = "x";
          break;
      }
      if(pMove.rating == 0){
        var counter = availSpots(pMove.board).length;
        var boardOptions = availSpots(pMove.board);
        for(k=0; k<counter; k++){
          var boardOption = pMove.board.slice(0);
          boardOption[boardOptions[k]] = pMove.move;
          var pMoveCopy = Object.assign({}, pMove);
          pMoveCopy.board = boardOption;
          miniMax(pMoveCopy);
        }
      }
    }
    else{
      if (endGameEval(aiPlayer, pMove.board)){
        pMove.rating = 1;
        k = counter;
        moves[pMove.option] = pMove;
      }
      else if (endGameEval(huPlayer, pMove.board)){
        pMove.rating = -1;
        k = counter;
        moves[pMove.option] = pMove;
      }
      else{
        moves[pMove.option] = pMove;
      }
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
  //board = ["o",1,"x","x",4,"x",6,"o","o"]
  board = [0,1,2,3,4,5,6,7,8]
  aiMove(board, aiPlayer);
}); //END DOC READY
