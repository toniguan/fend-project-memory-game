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

let move = document.querySelector('.moves');
let restart = document.querySelector('.restart');
restart.addEventListener('click',init);
let deck = document.querySelector('.deck');
deck.addEventListener('click', clickCard);


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

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

function initScoreAndRating(){
  openCards = [];
  score = 0;
  movesCounter = 0;
  timer = 0;
  move.textContent = movesCounter;
  ratings = 3;
  drawRating(ratings);
}


function ratingCheck(){
  if(movesCounter > 5 && score < 1
    ||movesCounter > 10 && score < 3
  ||movesCounter > 16 && score < 5 ){
    ratings--;
    drawRating(ratings);
  }
}

function drawRating(n){
  //defaul to 3 stars rating
  const rating = 3;

  //remove old ratings
  let stars = document.querySelector('.stars');
  let parent = stars.parentElement;
  stars.remove();

  stars = document.createElement('ul');
  stars.className = "stars";

//draw solid star
  for(let i = 0; i < n; i++){
    let starli = document.createElement('li');
    let stari = document.createElement('i');
    stari.className = "fa fa-star";
    starli.appendChild(stari);
    stars.appendChild(starli);
  }
  //draw open star
  for(let i= n; i < rating; i++){
    let starli = document.createElement('li');
    let stari = document.createElement('i');
    stari.className = "fa fa-star-o";
    starli.appendChild(stari);
    stars.appendChild(starli);

  }
  parent.insertBefore(stars, parent.firstElementChild);

}


function initDeck(){

  //remove all cards
  const deckSize = deck.childElementCount;
  for(let i = 0; i < deckSize; i++){
    deck.removeChild(deck.firstElementChild);
  }

  cards = shuffle(cards);

  const docFrag = document.createDocumentFragment();
  for(let i = 0; i < cards.length; i++){
    let card = document.createElement('li');
    card.className = "card";
    let icon = document.createElement('i');
    icon.classList.add("fa");
    icon.classList.add(cards[i]);
    card.appendChild(icon);
    docFrag.appendChild(card);
  }
  deck.appendChild(docFrag);
}

function clickCard(event){
  let card = event.target;
  let classes = card.className.split(' ');
    if(card.nodeName === 'LI' && !classes.includes('open')&& !classes.includes('match') ){
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
  //console.log("moves: "+movesCounter);
  move.textContent = movesCounter;

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
    }else{
      console.log("no match");
    }
}

function updateScore(){
  score++;
  winCheck();
}

function winCheck(){
  if(score >= 1){
    modal.style.display = "block";
    let detailmsg = document.querySelector('.detailmsg');
    if(detailmsg != null){
      detailmsg.remove();
    }

    const btnparent = modalBtn.parentElement;
    detailmsg = document.createElement('p');
    detailmsg.className = "detailmsg";
    detailmsg.textContent = "With " + movesCounter + " Moves and " + ratings + " Stars ";
    btnparent.insertBefore(detailmsg, modalBtn);

  //  console.log("you win");
  }

}

function init(){
  initScoreAndRating();
  initDeck(cards);
}






// Get the modal
var modal = document.getElementById('myModal');

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
let winmsg = document.querySelector('.winmsg');


// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}


// When the user clicks anywhere outside of the modal, close it
/*
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}*/
let modalBtn = document.querySelector('.modalBtn');
modalBtn.addEventListener('click', restartFn);

function restartFn(){
  console.log("restart is click");
  modal.style.display = "none";
  init();
}

let myVar = setInterval(myTimer, 1000);

function myTimer() {
    timer++;
    let h = Math.floor(timer / (60 * 60));
    let m = Math.floor(timer%(60*60) / 60);
    let s = timer %60;
    document.querySelector(".timer").innerHTML = `${("0"+h).slice(-2)}:${("0"+m).slice(-2)}:${("0"+s).slice(-2)}`;
}
let d1 = new Date();
let d2 = new Date();
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
