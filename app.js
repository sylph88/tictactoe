const gameUI = (() => {
  const play = document.querySelector(".play");
  const nodes = document.querySelectorAll(".square");

  const updateSquare = (position, player) => {
    nodes[position].textContent = player;
  };

  const clearBoard = () => {
    nodes.forEach((node) => (node.textContent = ""));
  };

  return {
    updateSquare,
    clearBoard,
    nodes,
    play,
  };
})();

//gameboard
const game = (() => {
  const player1 = "x";
  const player2 = "o";

  let moveCount = 0;
  let state = [];
  let isGameOver = false;

  const winConditions = [
    //horizontal
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    //vertical
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    //diagonal
    [0, 4, 8],
    [6, 4, 2],
  ];

  const updateState = (player, position) => {
    if (isGameOver) return;
    state[position] = player;
    gameUI.updateSquare(position, player);
    checkWinner(state);
  };

  const checkWinner = (state) => {
    for (const [a, b, c] of winConditions) {
      if (
        state[a] != undefined &&
        state[a] == state[b] &&
        state[a] == state[c]
      ) {
        console.log(`winner is ${state[a]}`);
        isGameOver = true;
        setTimeout(resetState, 1000);
        break;
      } else if (state.filter(Boolean).length == 9) {
        console.log("draw");
        isGameOver = true;
        setTimeout(resetState, 1000);
        break;
      }
    }
  };

  const resetState = () => {
    moveCount = 0;
    state = [];
    isGameOver = false;
    gameUI.clearBoard();
  };

  const initializeGame = () => {
    gameUI.nodes.forEach((node) =>
      node.addEventListener("click", (event) => {
        const position = event.target.getAttribute("data-index");
        if (state[position] === undefined) {
          const currentPlayer = moveCount % 2 === 0 ? player1 : player2;
          updateState(currentPlayer, position);
          moveCount += 1;
        }
      })
    );
  };
  return { resetState, initializeGame };
})();

game.initializeGame();
gameUI.play.addEventListener("click", game.resetState);
