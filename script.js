'use strict';
const yourScore = document.querySelector('.your');
const pcScore = document.querySelector('.pc');
const drawScore = document.querySelector('.draw');
const myImg = document.querySelector('.img1');
const pcImg = document.querySelector('.img2');
const playAgain = document.querySelector('.again');
const resultMessage = document.querySelector('.resultMess');
const selectBtn = document.querySelectorAll('.select-btn');

const images = ['rock.png', 'paper.png', 'scissors.png'];

let roboScoreCount = 0;
let yourScoreCount = 0;
let draw = 0;

function gameReset() {
  myImg.src = 'none.png';
  pcImg.src = 'none.png';
  roboScoreCount = 0;
  yourScoreCount = 0;
  draw = 0;
  yourScore.textContent = yourScoreCount;
  pcScore.textContent = roboScoreCount;
  drawScore.textContent = draw;
  resultMessage.textContent = '';
  resultMessage.style.color = 'black';
}

selectBtn.forEach((btn) => {
  btn.addEventListener('click', function () {
    let guessNum1 = Number(btn.id);
    let guessNum2 = Math.floor(Math.random() * 3);
    myImg.src = images[guessNum1];
    pcImg.src = images[guessNum2];

    function decisionMaker(num) {
      if (guessNum1 === num) {
        resultMessage.textContent = 'You Won';
        yourScoreCount++;
        if (yourScoreCount === 20 && roboScoreCount < 20) {
          resultMessage.textContent = `You Won by ${yourScoreCount} - ${roboScoreCount}`;
          resultMessage.style.color = '#00d400';
          setTimeout(() => {
            gameReset();
          }, 2000);
        }
      } else if (guessNum2 === num) {
        resultMessage.textContent = 'Robo Won';
        roboScoreCount++;
        if (roboScoreCount === 20 && yourScoreCount < 20) {
          resultMessage.textContent = `Robo Won by ${roboScoreCount} - ${yourScoreCount}`;
          resultMessage.style.color = '#ff2323';
          setTimeout(() => {
            gameReset();
          }, 2000);
        }
      }
    }

    function guesser(num1, num2) {
      if (
        (guessNum1 === num1 && guessNum2 === num2) ||
        (guessNum1 === num2 && guessNum2 === num1)
      ) {
        return true;
      }
      return false;
    }

    function printScore() {
      yourScore.textContent = yourScoreCount;
      pcScore.textContent = roboScoreCount;
      drawScore.textContent = draw;
    }

    if (guessNum1 === guessNum2) {
      resultMessage.textContent = "It's Draw!";
      draw++;
      if (draw === 5 && roboScoreCount < 5 && yourScoreCount < 5) {
        resultMessage.textContent = 'Sadly No One Won';
      }
      printScore();
    } else if (guesser(0, 1)) {
      decisionMaker(1);
      printScore();
    } else if (guesser(1, 2)) {
      decisionMaker(2);
      printScore();
    } else if (guesser(0, 2)) {
      decisionMaker(0);
      printScore();
    }
  });
});

playAgain.addEventListener('click', gameReset);
