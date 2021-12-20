'use strict';


const player0El= document.querySelector('.player--0');
const player1El= document.querySelector('.player--1');
const score0El= document.querySelector('#score--0');
const score1El= document.getElementById('score--1');
const diceEl=document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnroll = document.querySelector('.btn--roll');
const btnhold = document.querySelector('.btn--hold');
const current0El= document.getElementById('current--0');
const current1El= document.getElementById('current--1');
const btnHold = document.querySelector('.btn--hold');
const btnNewGame = document.querySelector('.btn--new');

let scores,currentScore, activePlayer, playing;

// starting conditions
const init = function(){
scores =[0,0];

currentScore=0;
activePlayer=0;
playing = true; //At the beginning the game most be in playing mode

diceEl.classList.add('hidden'); //removing/hiding dice roll from UI

// setting all total score to 0
score0El.textContent =0;
score1El.textContent =0;
current0El.textContent =0;
current1El.textContent =0;

// reset player winner from black to normal
   player0El.classList.remove('player--winner');
   player1El.classList.remove('player--winner');

//setting the initial player active interface to pink
   player0El.classList.add('player--active');
   player1El.classList.remove('player--active');
}
init();

const switchPlayer = function(){
    document.getElementById(`current--${activePlayer}`).textContent =0;
        currentScore=0;
        activePlayer= (activePlayer === 0 ? 1:0); //activePlayer is equal newActivePlayer =0, then newActivePlayer is 1, else 0
        
        player0El.classList.toggle('player--active');
        player1El.classList.toggle('player--active');
}

diceEl.classList.add('hidden');

// rolling dice functionality
btnroll.addEventListener('click', function(){
    if (playing) {// to check if we are playing
    // generation a random number
     let diceRoll= Math.floor(Math.random()*6 +1);
     
     //display dice roll
     diceEl.classList.remove('hidden');
     diceEl.src= `dice-${diceRoll}.png`;

// check if dice rolled is not 1 
     if (diceRoll !== 1){
         currentScore+= diceRoll;
         document.getElementById(`current--${activePlayer}`).textContent=currentScore;
       // current0El.textContent = currentScore; same as above. 
console.log(currentScore);

    }else{
        //switch to next player
       
        switchPlayer();
        
    }
    }
    
})

btnHold.addEventListener('click', function(){
    if(playing){
    // Add current score to active player total score
    scores[activePlayer]+=currentScore ;
    //score[1] =scores[1]]+ currentScore;
    document.getElementById(`score--${activePlayer}`).textContent=scores[activePlayer]; 

    //finish the game if playerScore >100
    if(scores[activePlayer] >=100){
        playing = false;// game ends when any player scores more than 100
        
     diceEl.classList.add('hidden'); //removing/hiding dice roll from UI

     // removing the active play background and replacing with the dark winner background
        document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
        document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
    } else{
    // switch player
    switchPlayer();
    }
    }
});

btnNewGame.addEventListener('click', init);

