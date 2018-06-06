/*
* Create a list that holds all of your cards
*/

let cards = ["fa-diamond","fa-paper-plane-o","fa-anchor","fa-bolt",
"fa-cube","fa-leaf","fa-bicycle","fa-bomb",
"fa-diamond","fa-paper-plane-o","fa-anchor","fa-bolt",
"fa-cube","fa-leaf","fa-bicycle","fa-bomb"];




let score;
let movesCounter;
let openCards;
let ratings;
let timer;
let startTimer; //a boolean flag for game start.
let timerVar;

let move = document.querySelector('.moves');
let timer_span = document.querySelector(".timer");
let restart = document.querySelector('.restart');
let deck = document.querySelector('.deck');

restart.addEventListener('click',init);
deck.addEventListener('click', clickCard);


init();

function init(){
  if(timerVar){
    clearInterval(timerVar);
  }
  initScorePanel();
  initDeck(cards);
}

function initScorePanel(){
  openCards = [];
  score = 0;

  ratings = 3;
  drawRating(ratings);

  movesCounter = 0;
  move.textContent = `0 Moves`;

  startTimer = false;
  timer = 0; //7235;
  timer_span.innerHTML = "00:00:00";
}


function ratingCheck(){
  ratings = 3;
  if(movesCounter >= 8 && movesCounter <=16)
  ratings = 2;
  if(movesCounter > 16)
  ratings  = 1;
  drawRating(ratings);
}
function drawRating(n){
  //defaul to 3 stars rating
  const N = 3;

  //remove old ratings
  let stars = document.querySelector('.stars');
  let parent = stars.parentElement;
  stars.remove();

  stars = document.createElement('ul');
  stars.className = "stars";

  //draw solid star
  let htmltxt = "";
  for(let i = 0; i < n; i++){
    htmltxt += `<li><i class="fa fa-star"></i></li>`;
  }
  //draw open star
  for(let i= n; i < N; i++){
    htmltxt += `<li><i class="fa fa-star-o"></i></li>`;
  }
  stars.innerHTML = htmltxt;
  parent.insertBefore(stars, parent.firstElementChild);

}



/*
* Display the cards on the page
*   - shuffle the list of cards using the provided "shuffle" method below
*   - loop through each card and create its HTML
*   - add each card's HTML to the page
*/
function initDeck(){
  //remove all cards
  const deckSize = deck.childElementCount;
  for(let i = 0; i < deckSize; i++){
    deck.removeChild(deck.firstElementChild);
  }

  cards = shuffle(cards);

  let cardhtml = "";
  for(let i = 0; i < cards.length; i++){
    cardhtml += `<li class="card"><i class="fa ${cards[i]}"></i></li>`;
  }
  deck.innerHTML = cardhtml;
}


function clickCard(event){
  let card = event.target;
  let classes = card.className.split(' ');
  /* only card element is clicked
   the clicked card is face down
   opencard list has <=1 cards
   */
  if(card.nodeName === 'LI' &&
   !classes.includes('open')&& !classes.includes('match')
    && openCards.length <=1 ){
    if(!startTimer){
      startTimer = true;
      timerVar = setInterval(myTimer, 1000);//start timer
    }
    displayCard(event.target);
    if(openCards.length === 2){
      setTimeout(matchCheck, 1000);
      updateMoves();
      ratingCheck();
    }
  }

}
function updateMoves(){
  movesCounter++;
  move.textContent = `${movesCounter} Moves`;

}

function displayCard(card){
  card.classList.add("open", "show");
  openCards.push(card);
}

function matchCheck(){
  let card0 = openCards.pop();
  let card1 = openCards.pop();
  card0.classList.remove("open", "show");
  card1.classList.remove("open", "show");
  if(card0.firstElementChild.className === card1.firstElementChild.className){
    card0.classList.add("match");
    card1.classList.add("match");

    updateScore();
  }

}

function updateScore(){
  score++;
  winCheck();
}

function winCheck(){
  if(score >= 8){
    //stop timer
    clearInterval(timerVar);

    //show modal
    showWinModal();
  }

}

function showWinModal(){
  modal.style.display = "block";
  let detailmsg = document.querySelector('.detailmsg');
  if(detailmsg != null){
    detailmsg.remove();
  }

  let period = timer_span.innerHTML.split(":");

  detailmsg = document.createElement('p');
  detailmsg.className = "detailmsg";
  detailmsg.innerHTML = `With ${movesCounter} Moves and ${ratings} Stars </br>
  in ${parseInt(period[1],10)}min  ${parseInt(period[2],10)}sec`;
  document.querySelector('.modal').insertBefore(detailmsg,
    document.querySelector('.modalBtn'));

  }
  //modal code from w3schools
  let modal = document.querySelector('.modal');
  let winmsg = document.querySelector('.winmsg');

  document.querySelector(".close").addEventListener('click', function() {
    modal.style.display = "none";
  });

  document.querySelector('.modalBtn').addEventListener('click', restartFn);

  function restartFn(){
    modal.style.display = "none";
    init();
  }

  function myTimer() {
    timer++;
    let h = Math.floor(timer/60/60);
    let m = Math.floor(timer%(60*60) / 60);
    let s = timer %60;
    timer_span.innerHTML = `${("0"+h).slice(-2)}:${("0"+m).slice(-2)}:${("0"+s).slice(-2)}`;
  }


  // Shuffle function from http://stackoverflow.com/a/2450976
  function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }
  /*
  * set up the event listener for a card. If a card is clicked:
  *  - display the card's symbol (put this functionality in another function that you call from this one)
  *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
  *  - if the list already has another card, check to see if the two cards match
  *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
  *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
  *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
  *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
  */
