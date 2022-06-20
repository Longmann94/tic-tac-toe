
//factory for creation of player objects
const Player = (name) => {
  let playerScore = 0;
  const getName = () => name;
  const setScore = (score) => playerScore = score;
  const getScore = () => playerScore;

return { getName, setScore, getScore};
};

//module pattern for game logic
const gameMain = (() => {
  const allSquares = document.querySelectorAll(".squares");
  const gameTitle = document.querySelector(".game-title");
  const player1ScoreArea = document.querySelector("#player1Score");
  const player2ScoreArea = document.querySelector("#player2Score");
  const nextRoundBtn = document.querySelector("#nextRound");

  let player1;
  let player2;

  let turn = 1;

  let gameBoard = ["", "", "", "", "", "", "", "", ""];

  const initializeGame = () => {
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    allSquares.forEach(square => {      
      square.classList.remove("animateMove");
      square.addEventListener("click", playerMove);
    });
    gameTitle.innerHTML = "GO!";
    updateBoard();
    turn = 1;
  }

  const newGame = () => {
      let player1Name = document.querySelector("#player1").value;
      let player2Name = document.querySelector("#player2").value;
      player1 = Player(player1Name);
      player2 = Player(player2Name);
      initializeGame();
      nextRoundBtn.addEventListener("click", initializeGame);
  }

  const displayController = () => {
    allSquares.forEach(square => square.innerHTML = gameBoard[square.id]);
    player1ScoreArea.innerHTML = `${player1.getScore()}`
    player2ScoreArea.innerHTML = `${player2.getScore()}`
  }

  const legalMove = (m) => {
    if(gameBoard[m] === ""){
      turn++
      return true
    }
  }

  const playerMove = (e) => {
    if(turn%2 === 1 ){
      if(legalMove(e.target.id)){
        e.srcElement.classList.add("animateMove");
        gameBoard[e.target.id] = "X";
      }
    }else{
      if(legalMove(e.target.id)){
        e.srcElement.classList.add("animateMove");
        gameBoard[e.target.id] = "O"
      }
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
       player1.setScore(player1.getScore() + 1);
       gameTitle.innerHTML = `${player1.getName()} Won this game!`;
     }else if(circleWins) {
       allSquares.forEach(square => square.removeEventListener("click", playerMove));
       player2.setScore(player2.getScore() + 1);
       gameTitle.innerHTML = `${player2.getName()} Won this game!`;
     }else if(turn > 9) {
       allSquares.forEach(square => square.removeEventListener("click", playerMove));
       gameTitle.innerHTML = "This game is a Draw!";
     }
  }

  const updateBoard = () => {
    displayController(gameBoard);
  }

  return {
    newGame,
  };
})();

const startGameButton = document.querySelector(".start-game-btn");

startGameButton.addEventListener("click", gameMain.newGame);
