const player = document.querySelectorAll(".player");
//
const score = document.querySelectorAll(".score");
//
const rolldingScore = document.querySelectorAll(".rolldingScore");

//
const newGame = document.getElementById("newGame");
const dice = document.getElementById("dice");
const rollDice = document.getElementById("rollDice");
const hold = document.getElementById("hold");

let turn = 0;
let playerScore = [0, 0];
// function
function roll() {
  return Math.floor(Math.random() * 6) + 1;
}
function restart_current() {
  rolldingScore[1].textContent = 0;
  rolldingScore[0].textContent = 0;
}
function restart() {
  playerScore[0] = 0;
  playerScore[1] = 0;
  score[0].textContent = 0;
  score[1].textContent = 0;
  restart_current();
  turn = 0;
  console.log("restart " + turn + " " + playerScore);
}

function _rollDice() {
  let rollValue = roll();
  dice.src = `./dice-${rollValue}.png`;
  rolldingScore[turn].textContent = rollValue;

  // if()
}
function _hold() {
  playerScore[turn] += Number(rolldingScore[turn].textContent);
  console.log("playerScore[turn]", playerScore[turn], turn);
  score[turn].textContent = playerScore[turn];
  if (turn == 0) {
    restart_current();

    player[turn].classList.remove("myturn");
    turn = 1;
    player[turn].classList.add("myturn");
  } else {
    restart_current();
    player[turn].classList.remove("myturn");
    turn = 0;
    player[turn].classList.add("myturn");
  }
}
newGame.addEventListener("click", restart);
rollDice.addEventListener("click", _rollDice);
hold.addEventListener("click", _hold);
