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
      console.log("logic to make move and write it !!");
      aiMove(board, aiPlayer);
    }
    else if(turn == "huPlayer"){
      console.log("let human move now.");
      $(".avail").click(function(){
        $(this).html(huPlayer.toUpperCase());
        var clickedCell = $(this).attr('id').slice(1,2);
        board[clickedCell] = huPlayer;
        $(this).removeClass("avail");
        console.log(board);
        turn = "aiPlayer";
        gameTurn(aiPlayer, huPlayer, turn);
      });
    }
  }
  function aiMove(board, aiPlayer){
    potentialMoves = availSpots(board);
    for(j=0; j<potentialMoves.length; j++){
      var potentialBoard = board.slice(0);
      potentialBoard[potentialMoves[j]] = aiPlayer;
      moves.push({option:j,position:potentialMoves[j],move:huPlayer,board:potentialBoard,level:0,rating:0});
      miniMax(moves[j]);
    }
    var winningMoves = [];
    for(l=0; l<moves.length; l++){
      if(moves[l].rating > 0){
        winningMoves.push(moves[l]);
      }
    }
    // https://stackoverflow.com/questions/4020796/finding-the-max-value-of-an-attribute-in-an-array-of-objects
    // https://stackoverflow.com/questions/21255138/how-does-the-math-max-apply-work
    // https://jsperf.com/finding-the-max-value-an-array-of-objects
    let min = 9;
    for(m=0; m<winningMoves.length; m++){
      if(winningMoves[m].level < min){
        min = winningMoves[m].level;
      }
    }
    for(n=0; n<winningMoves.length; n++){
      if(winningMoves[n].level == min){
        //console.log(winningMoves[n].position);
        board[winningMoves[n].position] = aiPlayer;
        var cell = "s"+ winningMoves[n].position;
        //console.log(cell);
        $("#"+cell).html(aiPlayer.toUpperCase());
        $("#"+cell).removeClass("avail");
        console.log(board);
        turn = "huPlayer";
        gameTurn(aiPlayer, huPlayer, turn);
        return winningMoves[n].position;
      }
    }
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
}); //END DOC READY
