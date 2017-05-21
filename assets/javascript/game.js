

var wordList = ["mixer", "club", "treble", "nightlife", "turntables", "hangover", "requests", "bass", "speakers", "headphones", "microphone", "vinyl"];


var DJstage = 0;

var imgDJstage = document.getElementById("Djstage");


//runs game

function Game() {
	 
	this.guessLetters = document.getElementById("guessLetters").firstChild;
	this.guessCountNode = document.getElementById("guessCount").firstChild;
	this.guessCount = globalGuessCount;
	
	//holds the HTML element that contains puzzle
	this.puzzle = document.getElementById("myPuzzle");
	//holds current word all lowercase
	this.word= "a";
	//holds each word of multi-word puzzle
	this.words = [];
	this.guesses= [];
	this.wins= 0;
	this.remainingLetters = 50;


	//collection of DJs
	this.DJs = [];

	this.guess = function(letter){
		var i = 0;
		var w = 0;
		var isMatched = false;
		var isGuessed = false;
		var txt = "";
		var puzzleString ;
		//Check if the letter has been guessed
		for (i =0; i < this.guesses.length; i++){
			if (this.guesses[i] === letter.toUpperCase()){
				//this letter already been guessed
				//there is no need to check anything else
				isGuessed = true;
			}
		}
		//if letter was not guessed
		if (isGuessed === false){
			//add letter to the guesses
			this.guesses.push(letter.toUpperCase());
			//see if guess is in the current puzzle
			for (w = 0; w < this.words.length; w++){
				puzzleString = this.puzzle.childNodes[w*2].nodeValue;
				for (i =0;i< this.words[w].length; i++){
					if (this.words[w][i].toLowerCase() === letter){
						//if any letter matches, it shows up in the correct spot
						txt += " "+letter.toUpperCase();
						isMatched = true;
						this.remainingLetters -= 1;
					} else {
						//if the guess does not go in that spot, leave a blank
						txt += " " + puzzleString[(i*2)+1];
					}
				}
				//change word
				this.puzzle.childNodes[w*2].nodeValue = txt;
				txt = "";
			}
			
			if (isMatched) {
				//check if the puzzle is finished
				
				if (this.remainingLetters === 0){
					//win
					this.win();
				}
			} else {
				//if no match found, letter added to the guessLetters
				this.guessLetters.nodeValue += letter.toUpperCase() + " , ";
				//remaining guesses decrease by -1
				this.guessCount -= 1;
				this.guessCountNode.nodeValue = this.guessCount;
				if (this.guessCount === 0 ){
					//lose

					this.lose();
				} else if (this.guessCount === Math.floor(globalGuessCount/0) ){
					//stage all DJs
					for (var i= 0;i < this.DJs.length;i++){
						this.DJs[i].stage();
					}
				//} else if (this.guessCount === Math.floor(globalGuessCount*2/3) ){
					//stage some DJs
					for (var i= 0;i < this.DJs.length;i++){
						if (Math.random() < 0.5){
							this.DJs[i].stage();
						}
					}
				}

			}
		} else if (isGuessed === true){
			//do nothing if the letter has already been guessed
		}
	};

	this.win = function() {
		// Make this play sound effect;

		waiting = true;
	};

	this.lose = function(){
		//kill any DJs based on the number of missing letters
		var missingLetters = this.remainingLetters;
		for (var i = 1; i <= missingLetters; i++){
			if(this.DJs.length-i >= 0){
				this.DJs[this.DJs.length-1].kill(this);
			}
		}
		
		//starts a newWord
		//this.newWord();
		waiting = true;
	};

	this.newWord = function(){
		waiting = false;
		var rand = randBetween(0,myWords.length-1);
		this.word = myWords[rand];
		myWords.splice(rand,1);
		//split the chosen word into array
		this.words = this.word.split(" ");
		this.remainingLetters = 0;
		//clears old puzzle
		var txt;
		while (this.puzzle.hasChildNodes()) {
			this.puzzle.removeChild(this.puzzle.lastChild);
		}
		//generates new puzzle
		for (var w = 0; w< this.words.length; w++) {
			txt = "";
			this.remainingLetters += this.words[w].length;
			for (var i = 0; i < this.words[w].length; i++) {
				txt += " _";	
			}
			//gives word a line
			myGame.puzzle.appendChild(document.createTextNode(txt));
			
		}
		//clears out the guesses
		this.guesses = [];
		this.guessLetters.nodeValue = " ";
		this.guessCount = globalGuessCount;
		this.guessCountNode.nodeValue = this.guessCount;
	};
	
	document.onkeypress = function(event) {
		var charCode = event.which;
		//registers only letters
		if (waiting){
			myGame.newWord();
		} else if ((charCode >= 97 )&&(charCode <= 122)){
			var letter = String.fromCharCode(charCode);
			
			myGame.guess(letter.toLowerCase());
		}
		
	};
}
//call function globally
function randBetween(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};
//call variables globally
var globalGuessCount = 7;
var myGame = new Game();
var myWords = wordList;
var waiting = true;
var winScore = 0;
var loseScore = 0;
var DJstage = 0;



function addPictures(guessCount) {
  switch (guessCount) {
    case 0:
      $('#DJstage').children("img").remove();
      $('#DJstage').append('<img src="assets/images/dj0.jpg">');
      break;
    case 1:
      $('#DJstage').children("img").remove();
      $('#DJstage').append('<img src="assets/images/dj1.jpg">');
      break;
    case 2:
       $('#DJstage').children("img").remove();
      $('#DJstage').append('<img src="assets/images/dj2.jpg">');
      break;
    case 3:
       $('#DJstage').children("img").remove();
      $('#DJstage').append('<img src="assets/images/dj3.jpg">');
      break;
    case 4:
       $('#DJstage').children("img").remove();
      $('#DJstage').append('<img src="assets/images/dj4.jpg">');
      break;
    case 5:
       $('#DJstage').children("img").remove();
      $('#DJstage').append('<img src="assets/images/dj5.jpg">');
      break;
    case 6:
       $('#DJstage').children("img").remove();
      $('#DJ').append('<img src="assets/images/dj6.jpg">');
      break;
    case 7:
      $('#DJstage').children("img").remove();
      $('#DJstage').append('<img src="assets/images/dj7.jpg">');
      break;
  }
}


