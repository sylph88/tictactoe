// UI
const gameUI = (() => {
  const reset = document.querySelector(".reset");
  const nodes = document.querySelectorAll(".square");

  const updateSquare = (position, player) => {
    nodes[position].textContent = player;
  };

  const clearBoard = () => {
    nodes.forEach((node) => (node.textContent = ""));
  };

  const winAnimation = (a, b, c) => {
    nodes[a].classList.add("winning");
    nodes[b].classList.add("winning");
    nodes[c].classList.add("winning");

    setTimeout(() => {
      nodes[a].classList.remove("winning");
      nodes[b].classList.remove("winning");
      nodes[c].classList.remove("winning");
    }, 1000);
  };

  return {
    updateSquare,
    clearBoard,
    winAnimation,
    nodes,
    reset,
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
        isGameOver = true;
        gameUI.winAnimation(a, b, c);
        setTimeout(resetState, 1000);
        break;
      } else if (state.filter(Boolean).length == 9) {
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
gameUI.reset.addEventListener("click", game.resetState);
