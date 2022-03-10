const choices = document.querySelectorAll('.choice');
const score = document.getElementById('score');
let result = document.getElementById('result');
const restart = document.getElementById('restart');
const desk = document.querySelector('.desk');
let round = 1;
const scoreboard = {
  player: 0,
  computer: 0
};

let play = e => {
  const playerChoice = e.target.id;
  const computerChoice = getComputerChoice();
  const winner = getWinner(playerChoice, computerChoice);
  showWinner(winner, playerChoice, computerChoice);
};

let getComputerChoice = () => {
  const rand = Math.random();
  if (rand < 0.34) {
    return 'rock';
  } else if (rand <= 0.67) {
    return 'paper';
  } else {
    return 'scissors';
  }
};

let getWinner = (p, c) => {
  let winName = { 
  rock : { scissors : 'player', paper : 'computer'} ,
  paper : { rock : 'player', scissors : 'computer' },
  scissors : { paper : 'player', rock : 'computer' }
};
  if (p === c) {
    return 'draw';
  } else {
   return winName[p][c] ;
  }
};

let showWinner = (winner, playerChoice, computerChoice) => {
  if (winner === 'player') {
    scoreboard.player++;
    let div = document.createElement('div');
    div.innerHTML = `
      <p>Round ${round}, ${playerChoice.charAt(0).toUpperCase() +
        playerChoice.slice(1)} vs. ${computerChoice.charAt(0).toUpperCase() +
        computerChoice.slice(1)}, You’ve WON!</p>
    `;
     result.appendChild(div);
  } else if (winner === 'computer') {
    scoreboard.computer++;
    let div = document.createElement('div');
    div.innerHTML = `
      <p>Round ${round}, ${playerChoice.charAt(0).toUpperCase() +
        playerChoice.slice(1)} vs. ${computerChoice.charAt(0).toUpperCase() +
        computerChoice.slice(1)}, You’ve LOST!</p>
    `;
     result.appendChild(div);
  } else {
    let div = document.createElement('div');
    div.innerHTML = `
      <h1></h1>
      <p>Round ${round}, ${playerChoice.charAt(0).toUpperCase() +
        playerChoice.slice(1)} vs. ${computerChoice.charAt(0).toUpperCase() +
        computerChoice.slice(1)}, It's A DRAW!</p>
    `;
     result.appendChild(div);
  }
 
  if (scoreboard.player === 3){
    result.innerHTML = `
      <h2>The Winner is Player</h2>
    `;
    restart.style.display = 'inline-block';
  } else if (scoreboard.computer === 3){
    result.innerHTML = `
      <h2>The Winner is Computer</h2>
    `; 
    restart.style.display = 'inline-block';
  };
  
  score.innerHTML = `
    <p>Player: ${scoreboard.player}</p>
    <p>Computer: ${scoreboard.computer}</p>
    `;
  desk.style.display = 'block';
  round ++;
};

let restartGame = () => {
  restart.style.display = 'none';
  scoreboard.player = 0;
  scoreboard.computer = 0;
  score.innerHTML = `
    <p>Player: 0</p>
    <p>Computer: 0</p>
  `;
  desk.style.display = 'none';
  result.innerHTML = ''; 
  round = 1;
};

choices.forEach(choice => choice.addEventListener('click', play));
restart.addEventListener('click', restartGame);