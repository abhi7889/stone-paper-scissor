const handOptions = {
  "rock": "./assets/Group 2.png",
  "scissors": "./assets/Group 3.png",
  "paper": "./assets/Group 1.png"
};

const handIcon = {
  "rock": "./assets/icons8-fist-67 1.png",
  "scissors": "./assets/17911 1.png",
  "paper": "./assets/icons8-hand-64 1.png"
};

let YOUR_SCORE = 0;
let PC_SCORE = 0;

const setScore = (newScore, isUserScore) => {
  if (isUserScore) {
    YOUR_SCORE = newScore;
    localStorage.setItem("yourScore", newScore);
    document.querySelectorAll(".points")[1].innerText = newScore;
  } else {
    PC_SCORE = newScore;
    localStorage.setItem("pcScore", newScore);
    document.querySelectorAll(".points")[0].innerText = newScore;
  }
};

document.addEventListener("DOMContentLoaded", function () {
  const rulesButton = document.getElementById("rulesButton");
  const rulesPopup = document.getElementById("rulesPopup");
  const closeButton = document.getElementById("closeButton");
  document.getElementById("nextb").style.display = "none";


  rulesButton.addEventListener("click", function () {
    rulesPopup.style.display = "block";
  });

  closeButton.addEventListener("click", function () {
    rulesPopup.style.display = "none";
  });


  const storedYourScore = localStorage.getItem("yourScore");
  const storedPcScore = localStorage.getItem("pcScore");

  if (storedYourScore !== null) {
    YOUR_SCORE = parseInt(storedYourScore, 10);
    document.querySelectorAll(".points")[1].innerText = YOUR_SCORE;
  }

  if (storedPcScore !== null) {
    PC_SCORE = parseInt(storedPcScore, 10);
    document.querySelectorAll(".points")[0].innerText = PC_SCORE;
  }
});

const pickUserHand = (hand) => {
  let hands = document.querySelector(".hands");
  hands.style.display = "none";

  let contest = document.querySelector(".contest");
  contest.style.display = "flex";

  document.getElementById("userPickImage").src = handOptions[hand];
  document.getElementById("userPickIcon").src = handIcon[hand];

  pickComputerHand(hand);
};


const pickComputerHand = (hand) => {
  let hands = ["rock", "scissors", "paper"];
  let cpHand = hands[Math.floor(Math.random() * hands.length)];

  document.getElementById("computerPickImage").src = handOptions[cpHand];
  document.getElementById("computerPickIcon").src = handIcon[cpHand];

  referee(hand, cpHand);
};


const referee = (userHand, cpHand) => {
  let userWins = false;
  let pcWins = false;
  let isTie = false;

  if ((userHand === "rock" && cpHand === "scissors") ||
      (userHand === "scissors" && cpHand === "paper") ||
      (userHand === "paper" && cpHand === "rock")) {
    userWins = true;
  } else if ((cpHand === "rock" && userHand === "scissors") ||
             (cpHand === "scissors" && userHand === "paper") ||
             (cpHand === "paper" && userHand === "rock")) {
    pcWins = true;
  }
  if (userWins || pcWins) {
    document.getElementById("nextb").style.display = "block";
  } else {
    document.getElementById("nextb").style.display = "none";
  }

  document.getElementById("userPickImage").classList.remove("winner");
  document.getElementById("computerPickImage").classList.remove("winner");


  if (userWins) {
    YOUR_SCORE++;
    setScore(YOUR_SCORE, true);
    setDecision("YOU WIN!");
    document.getElementById("userPickImage").classList.add("winner");
  } else if (pcWins) {
    PC_SCORE++;
    setScore(PC_SCORE, false);
    setDecision("YOU LOSE!");
    document.getElementById("computerPickImage").classList.add("winner");
  } else {
    isTie = true;
    setDecision("It's a tie!");
  }
  const replayButton = document.getElementById("replayButton");
  replayButton.innerText = isTie ? "REPLAY" : "PLAY AGAIN";
};


const restartGame = () => {
  let contest = document.querySelector(".contest");
  contest.style.display = "none";

  let hands = document.querySelector(".hands");
  hands.style.display = "flex";

  document.getElementById("userPickImage").classList.remove("winner");
  document.getElementById("computerPickImage").classList.remove("winner");
  document.getElementById("nextb").style.display = "none";
  const replayButton = document.getElementById("replayButton");
  replayButton.innerText = "PLAY AGAIN";
};


const setDecision = (decision) => {
  document.querySelector(".decision h1").innerText = decision;
};


