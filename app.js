const play = document.querySelector(".play");
const nodes = document.querySelectorAll(".square");

//gameboard
const game = (() => {
  const p1 = "x";
  const p2 = "o";

  let count = 0;
  let state = [];

  const updateState = (player, position) => {
    state[position] = player;
    nodes[position].textContent = player;
    if (state.length == 9) {
      console.log("full");
    }
    //checkWinner()
  };

  const checkWinner = (state) => {
    return;
  }

  const isDraw = (state) => {
    return;
  }

  const resetState = () => {
    count = 0;
    state = [];
    nodes.forEach((node) => (node.textContent = ""));
  };

  const start = () => {
    nodes.forEach((node) =>
      node.addEventListener("click", (event) => {
        let position = event.target.getAttribute("data-index");
        if (event.target.textContent == "") {
          let player = count % 2 == 0 ? p1 : p2;
          updateState(player, position);
          count += 1;
        }
      })
    );
  };
  return { resetState, start };
})();

game.start();

//reset game
play.addEventListener("click", game.resetState);

//determine winner
