
//factory for creation of player objects
const Player = (name, playerId) => {
  const getName = () => name;
  const getPlayerId = () => playerId;

return { getName, getPlayerId};
};


//module pattern for game logic
const gameMain = (() => {
  const allSquares = document.querySelectorAll(".squares");
  const gameTitle = document.querySelector(".game-title");

  let turn = 1;

  let gameBoard = ["", "", "", "", "", "", "", "", ""];

  const initializeGame = () => {
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    allSquares.forEach(square => square.addEventListener("click", playerMove));
  }

  const selectGame = () => {
    const player1 = Player("long mann", "X");
    const player2 = Player("player2", "O");
  }

  const displayController = () => {
    allSquares.forEach(square => square.innerHTML = gameBoard[square.id]);
  }

  const legalMove = (m) => {
    if(gameBoard[m] === ""){
      turn++
      return true
    }
  }

  const playerMove = (e) => {
    if(turn%2 === 1 ){
      if(legalMove(e.target.id)) gameBoard[e.target.id] = "X";
    }else{
      if(legalMove(e.target.id)) gameBoard[e.target.id] = "O";
    }
    updateBoard();
    checkWinner();
    }

  const checkWinner = () => {
    const winPatternArr = [
                           [gameBoard[0], gameBoard[1], gameBoard[2]],
                           [gameBoard[3], gameBoard[4], gameBoard[5]],
                           [gameBoard[6], gameBoard[7], gameBoard[8]],
                           [gameBoard[0], gameBoard[3], gameBoard[6]],
                           [gameBoard[1], gameBoard[4], gameBoard[7]],
                           [gameBoard[2], gameBoard[5], gameBoard[8]],
                           [gameBoard[0], gameBoard[4], gameBoard[8]],
                           [gameBoard[2], gameBoard[4], gameBoard[6]],
                          ]

     const crossWins = winPatternArr.find(pattern => (pattern.join("") === "XXX"));
     const circleWins = winPatternArr.find(pattern => (pattern.join("") === "OOO"));

     if(crossWins) {
       allSquares.forEach(square => square.removeEventListener("click", playerMove));
       gameTitle.innerHTML = "X Won this game!";
     }else if(circleWins) {
       allSquares.forEach(square => square.removeEventListener("click", playerMove));
       gameTitle.innerHTML = "O Won this game!";
     }else if(turn > 9) {
       allSquares.forEach(square => square.removeEventListener("click", playerMove));
       gameTitle.innerHTML = "This game is a Draw!";
     }
  }

  const updateBoard = () => {
    displayController(gameBoard);
  }

  return {
    initializeGame,
  };
})();

gameMain.initializeGame();
