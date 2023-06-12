const boxes = document.querySelectorAll(".box");
const gameinfo = document.querySelector(".game-info");
const newgamebtn = document.querySelector(".btn");
var audio = new Audio("click.mp3");
var newgamesound = new Audio("new.mp3");

let currplayer;
let gamegrid;

const winningpositions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
  [2, 4, 6],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
];

initgame();
// function to initialise the game

function initgame() {
  currplayer = "X";
  gamegrid = ["", "", "", "", "", "", "", "", ""];

  // green background hata do last game ka bhai
  // boxes[pos[0]].classList.remove("win");
  // boxes[pos[1]].classList.remove("win");
  // boxes[pos[2]].classList.remove("win");

  boxes.forEach((box) => {
    box.classList.remove("win");
  });

  // ui me b update kar do

  boxes.forEach((box, index) => {
    box.style.pointerEvents = "all";
    box.innerText = "";
  });
  newgamebtn.classList.remove("active");
  gameinfo.innerText = `Currunt Player - ${currplayer}`;
}

boxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    handleclick(index);
  });
});

// handleclick function

function handleclick(index) {
  if (gamegrid[index] === "") {
    boxes[index].innerText = currplayer;
    gamegrid[index] = currplayer;
    boxes[index].style.pointerEvents = "none";

    // turn swap kar do bhai
    swapturn();
    // check koi jeet to nahi gya hai..?
    checkgameover();
    // audio b play kar do bhai
    audio.play();
  }
}

// swapturn function

function swapturn() {
  if (currplayer === "X") {
    currplayer = "O";
  } else {
    currplayer = "X";
  }
  gameinfo.innerText = `Currunt Player - ${currplayer}`;
}

newgamebtn.addEventListener("click", () => {
  initgame();
  newgamesound.play();
});

function checkgameover() {
  let ans = "";

  winningpositions.forEach((pos) => {
    if (
      (gamegrid[pos[0]] !== "" ||
        gamegrid[pos[1]] !== "" ||
        gamegrid[pos[2]] !== "") &&
      gamegrid[pos[0]] === gamegrid[pos[1]] &&
      gamegrid[pos[1]] === gamegrid[pos[2]]
    ) {
      if (gamegrid[pos[0]] === "X") {
        ans = "X";
      } else {
        ans = "O";
      }

      // ab pointer events hata o bhai jisse orr jada click na ho pae

      boxes.forEach((box) => {
        box.style.pointerEvents = "none";
      });

      // green mark kar do bhai winner k path ko
      boxes[pos[0]].classList.add("win");
      boxes[pos[1]].classList.add("win");
      boxes[pos[2]].classList.add("win");
    }
  });

  if (ans !== "") {
    gameinfo.innerText = `Winner Is Player - ${ans}`;
    newgamebtn.classList.add("active");
    return;
  }

  // check for game tie

  let fillcount = 0;
  boxes.forEach((box) => {
    if (box.innerText !== "") {
      fillcount++;
    }
  });

  if (fillcount == 9) {
    gameinfo.innerText = "Game Tie";
    newgamebtn.classList.add("active");
    return;
  }
}
