$(document).ready(function(){
  var aiPlayer, huPlayer, turn, board = [0,1,2,3,4,5,6,7,8], availMoves = [], potentialMoves = [], moves = [];
  /*FUNCTION TESTING
  endGameEval("x", ["x", "o", "o", "x", "x", "x", "o", "x", "o"]);
  endGameEval("o", ["x", "o", "o", "x", "x", "x", "o", "x", "o"]);
  */
  //aiMove(["x", 1, 2, 3, "x", 5, "o", "x", "o"], "o");

  $("#x").click(function(){
    aiPlayer = "o";
    huPlayer = "x";
    turn = "huPlayer";
    gameTurn(aiPlayer, huPlayer, turn, board);
    $("#playerSelect").fadeOut();
  });
  $("#o").click(function(){
    aiPlayer = "x";
    huPlayer = "o";
    turn = "aiPlayer";
    gameTurn(aiPlayer, huPlayer, turn, board);
    $("#playerSelect").fadeOut();
  });
  $("#playagain").click(function(){
    location.reload();
  });
  $(".avail").click(function(){
    $(this).html(huPlayer.toUpperCase());
    var clickedCell = $(this).attr('id').slice(1,2);
    board[clickedCell] = huPlayer;
    $(this).removeClass("avail");
    console.log(board);
    //https://stackoverflow.com/questions/10366387/pausing-javascript-execution-until-button-press?noredirect=1&lq=1
    turn = "aiPlayer";
    gameTurn(aiPlayer, huPlayer, turn, board);
  });
  function gameTurn (aiPlayer, huPlayer, turn, board){
    if(endGameEval(aiPlayer, board) || endGameEval(huPlayer, board) == true){
      if(endGameEval(aiPlayer, board) == true){
        $("#gameEnd").fadeIn();
        $("#winner").html(aiPlayer.toUpperCase());
      }
      else{
        $("#gameEnd").fadeIn();
        $("#winner").html(huPlayer.toUpperCase());
      }
    }
    else{
      if(turn == "aiPlayer"){
        aiMove(board, aiPlayer);
      }
      else if(turn == "huPlayer"){
        console.log("let human move now.");
      }
    }
  }
  function aiMove(board, aiPlayer){
    potentialMoves = availSpots(board);
    moves = [];
    console.log("potentialMoves:");
    console.log(potentialMoves);
    for(j=0; j<potentialMoves.length; j++){
      var potentialBoard = board.slice(0);
      potentialBoard[potentialMoves[j]] = aiPlayer;
      moves.push({option:j,position:potentialMoves[j],move:aiPlayer,board:potentialBoard,level:0,rating:0});
      miniMax(moves[j]);
    }
    console.log("Moves:");
    console.log(moves);
    var winningMoves = [];
    for(l=0; l<moves.length; l++){
      if(moves[l].rating >= 0){
        winningMoves.push(moves[l]);
      }
    }
    /*for(p=0; p<winningMoves.length; p++){
      if(endGameEval(huPlayer, winningMoves[p].board) == true){
          winningMoves.splice(p,1);
      }
    }*/
    let min = 9;
    for(m=0; m<winningMoves.length; m++){
      if(winningMoves[m].level < min){
          min = winningMoves[m].level;
      }
    }
    console.log("Winning Moves:");
    console.log(winningMoves);
    for(n=0; n<winningMoves.length; n++){
      if(winningMoves[n].level == min /*&& endGameEval(huPlayer, winningMoves.board) != true*/){
        //if(endGameEval(huPlayer, winningMoves[n].board) != true){
          board[winningMoves[n].position] = aiPlayer;
          var cell = "s"+ winningMoves[n].position;
          console.log(cell);
          $("#"+cell).html(aiPlayer.toUpperCase());
          $("#"+cell).removeClass("avail");
          console.log(board);
          turn = "huPlayer";
          gameTurn(aiPlayer, huPlayer, turn, board);
          return winningMoves[n].position;
        //}
      }
    }
  }
  function miniMax(pMove){
    pMove.level++;
    //console.log(pMove);
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
      //if (endGameEval(aiPlayer, pMove.board) && gameTieEval(pMove.board) == false){
      if (winner(aiPlayer, pMove.board)){
          //pMove.rating = 1;
          pMove.rating++;
          k = counter;
          moves[pMove.option] = pMove;
      }
      //else if (endGameEval(huPlayer, pMove.board) && gameTieEval(pMove.board) == false){
      else if (winner(huPlayer, pMove.board)){
        //pMove.rating = -1;
        pMove.rating--;
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
  function winner(player, board){
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
  function gameTieEval(board){
    if(availSpots(board).length == 0){
      return true;
    }
    else{
      return false;
    }
  }
}); //END DOC READY
