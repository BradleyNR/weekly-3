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
//creates the alphabet buttons, adds event listener, runs funtions, then pushes content to screen
alphabet.forEach(function(item, index){
  let button = document.createElement('button');
  button.textContent = item;
  button.addEventListener('click', function(e){
    //e.target selects the target of the event listener e (e is the thing triggering the event)
    var button = e.target;
    //functions that run on button click
    recordGuess(button);
    checkGuess(button);
    displayGuessed(button);
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
  })

}
//function that records the guess in the array
function recordGuess(button){
  if (lettersGuessed.includes(button.textContent)) {
    return
  } else {
    lettersGuessed.push(button.textContent);
    return console.log(lettersGuessed);
  }
}

//creates the answer area
wordLetter.forEach(function(item, index){
  let button = document.createElement('p');
  button.textContent = '_';
  wordRow.appendChild(button);
})
//creates the row of guessed letters
let guessed = document.createElement('p');
guessedRow.appendChild(guessed);
//adds guessed letters to guessed row once
function displayGuessed(button){
  guessed.textContent = lettersGuessed;
};






}());
