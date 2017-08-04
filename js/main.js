(function(){
  'use strict';

//reindexes array to any words with length greater than 3
commonWords = commonWords.filter(function(word){
  return word.length > 3;
})
//random word selector
let randomWord = commonWords[Math.floor(Math.random() * commonWords.length)];
//splits the random word into an array of its letters
let wordLetter = randomWord.split('');
//testing
console.log(wordLetter);
console.log(randomWord);
//defining html selection
let buttonRow = document.querySelector('.buttons');
let wordRow = document.querySelector('.words');
let guessedRow = document.querySelector('.guessed');
//alphabet variable
let alphabet = ['a', 'b','c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

//array to store letters you have guessed when pressing alphabet button
let lettersGuessed = [];

//creates the answer area
wordLetter.forEach(function(item, index){
  let button = document.createElement('p');
  button.textContent = '_';
  wordRow.appendChild(button);
})
//creates the row of guessed letters
let guessed = document.createElement('p');
guessedRow.appendChild(guessed);

//selects area to put win or loss message
let winOrLossArea = document.querySelector('.win-or-loss');
//attempts counter
let attemptCounter = document.createElement('p');
let attempts = wordLetter.length + 5;
attemptCounter.textContent = 'Attempts Remaining: ' + attempts;
winOrLossArea.appendChild(attemptCounter);

//creates the alphabet buttons, adds event listener, runs funtions, then pushes content to screen
alphabet.forEach(function(item, index){
  let button = document.createElement('button');
  button.textContent = item;
  button.addEventListener('click', function(e){
    //e.target selects the target of the event listener e (e is the thing triggering the event)
    let button = e.target;
    //functions that run on button click
    recordGuess(button);
    checkGuess(button);
    winGame();
  });
  buttonRow.appendChild(button);
});

//checks the guess
function checkGuess(button){
  let guess = button.textContent;
  //this will select all the p tags under my words class
  let displayLetters = document.querySelectorAll('.words p');
  //This will check the index of my wordLetter and if the click
  //is equal to one of the letters in the array, it will replace
  //that _ with the letter in the array
  wordLetter.forEach(function(letter, index){
    if (guess === letter) {
      displayLetters[index].textContent = letter;
    }
  });
  console.log('check guess');
}
//function that records the guess in the array
function recordGuess(button){
  // if a letter has already been guessed, bail
  if (lettersGuessed.includes(button.textContent)) {
    return
  }
  // record the guessed letter and display on screen
  lettersGuessed.push(button.textContent);
  guessed.textContent = lettersGuessed;
  attempts = attempts - 1;
  //if attempts is 0, bail so numbers don't go negative
  if (attempts <= -1){
    return
  }
  attemptCounter.textContent = 'Attempts Remaining: ' + attempts;
}


//creates and sets win message to empty string
let winMessage = document.createElement('p');
winMessage.textContent = '';
winOrLossArea.appendChild(winMessage);
//displays winning message
function winGame(){
  //array.prototype.slice.call(whatever) will turn a nodelist into an array
  let displayLetters = Array.prototype.slice.call(document.querySelectorAll('.words p'));
  //get text content from above array and change array to letters
  let displayLettersArray = displayLetters.map(function(item){
    return item.textContent;
  });
  //if the letters on screen match the letters of the word, display win message
  if (displayLettersArray.join() === wordLetter.join() && attempts > 0) {
    winMessage.textContent = 'You Win!';
  } else if (attempts === 0) {
    winMessage.textContent = 'Loser! You\'re a loser! You big baby!';
  }
};
//displays losing message


}());
