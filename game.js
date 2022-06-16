//module pattern for game logic
const gameMain = (() => {
  const allSquares = document.querySelectorAll(".squares");
  let turn = 0;
  let gameBoard = ["X", "O", "X",
                     "O", "X", "O",
                     "X", "O", "X"];

  const initializeGame = () => {
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    allSquares.forEach(square => square.addEventListener("click", playerMove));
  }

  const displayController = (gameBoard) => {
    console.log(`update game board ${gameBoard}`);
    allSquares.forEach(square => square.innerHTML = gameBoard[square.id]);
  }

  const playerMove = (e) => {
    if(turn === 0 || turn%2 === 0 ){
      gameBoard[e.target.id] = "X";
      console.log("player 1 turn");
      updateBoard();
      turn++
    }else{
      gameBoard[e.target.id] = "O";
      console.log("player 2 turn");
      updateBoard();
      turn++
    }
    }

  const checkWinner = (gameBoard) => console.log("checking for winner");

  const updateBoard = () => {
    displayController(gameBoard);
  }

  return {
    initializeGame
  };
})();

gameMain.initializeGame();



//factory for creation of player objects
const Player = (name, marker) => {
  const getName = () => name;
  const getMarker = () => console.log(name + " is playing using " + marker);

return { getName, getMarker};
};

const long = Player("long mann", "X");
const player2 = Player("player2", "O");
long.getMarker();
player2.getMarker();
