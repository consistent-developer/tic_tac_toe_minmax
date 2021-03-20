
let board = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

let w; // = width / 3;
let h; // = height / 3;

let ai = "X";
let human = "O";
let currentPlayer = human;
var canvas;
function setup() {
  if(windowWidth <= 400){
  canvas = createCanvas(windowWidth * 0.8, windowWidth * 0.8);}
  else if(windowWidth > 400 && windowWidth <=550 ){
  canvas = createCanvas(windowWidth * 0.7, windowWidth * 0.7);}
  else{
  canvas = createCanvas(425, 425);}
  canvas.parent('sketch-holder');
  w = width / 3;
  h = height / 3;
  //bestMove();
}
function equals3(a, b, c) {
  return a == b && b == c && a != "";
}

function checkWinner() {
  let winner = null;

  // horizontal
  for (let i = 0; i < 3; i++) {
    if (equals3(board[i][0], board[i][1], board[i][2])) {
      winner = board[i][0];
    }
  }

  // Vertical
  for (let i = 0; i < 3; i++) {
    if (equals3(board[0][i], board[1][i], board[2][i])) {
      winner = board[0][i];
    }
  }

  // Diagonal
  if (equals3(board[0][0], board[1][1], board[2][2])) {
    winner = board[0][0];
  }
  if (equals3(board[2][0], board[1][1], board[0][2])) {
    winner = board[2][0];
  }

  let openSpots = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] == "") {
        openSpots++;
      }
    }
  }

  if (winner == null && openSpots == 0) {
    return "tie";
  } else {
    return winner;
  }
}

function mousePressed() {
  if (currentPlayer == human) {
    // Human make turn
    let i = floor(mouseX / w);
    let j = floor(mouseY / h);
    // If valid turn
    if (board[i][j] == "") {
      board[i][j] = human;
      currentPlayer = ai;
      bestMove();
    }
  }
}

function draw() {
  background(250,74,74);
  stroke(255,255,255); //yellow
  strokeWeight(1);
  line(w, 0, w, height);
  line(w * 2, 0, w * 2, height);
  line(0, h, width, h);
  line(0, h * 2, width, h * 2);

  for (let j = 0; j < 3; j++) {
    for (let i = 0; i < 3; i++) {
      let x = w * i + w / 2;
      let y = h * j + h / 2;
      let spot = board[i][j];
      textSize(32);
      let r = w / 4;
      if (spot == human) {
        noFill();
        stroke(251,198,38);
        strokeWeight(10);
        ellipse(x, y, r * 2.5);
      } else if (spot == ai) {
        strokeWeight(10);
        stroke(128,255,219);
        line(x - r, y - r, x + r, y + r);
        line(x + r, y - r, x - r, y + r);
      }
    }
  }
  
  let result = checkWinner();
  if (result != null) {
    noLoop();
    let resultP = createP("");
    resultP.style("color", "#FF9B85");
    if (result == "tie") {
      document.getElementById("result").innerHTML = "Tie!";
      // resultP.html("Tie!");
    } else {
      document.getElementById("result").innerHTML = `${result} wins!`;
      // resultP.html(`${result} wins!`);
    }
  }  
}
