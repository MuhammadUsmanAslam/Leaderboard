import addScore from './modules/handle-score.js';

import './style.css';

const displayScore = async () => {
  const scoreList = document.getElementById('score-list');
  scoreList.innerHTML = '';
  await fetch(
    'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/yAPvdugADNNsXSbzR52S/scores/').then((response) => response.json()).then((json) => { 
      let scores = json.result;
      scores.forEach((scoreListItem) => {
        const scoreItem = document.createElement('li');
        scoreItem.className = 'scrore-list-item';
        scoreItem.innerHTML = `Name: ${scoreListItem.user}, Score: ${scoreListItem.score}`;
        scoreList.appendChild(scoreItem);
      });
    });
};

window.addEventListener('load', () => {
  displayScore();
  const refresh = document.getElementById('refresh');
  refresh.addEventListener('click', () => {
    displayScore();
  });
  const addNewScore = document.getElementById('add-new-score');
  addNewScore.addEventListener('click', (e) => {
    e.preventDefault();
    const inputName = document.getElementById('input-name');
    const inputScore = document.getElementById('input-score');
    addScore(inputName.value, inputScore.value);
    inputName.value = '';
    inputScore.value = '';
    displayScore();
  });
});