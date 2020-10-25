var input
var computer
var winStatus
var elements;
elements = new Array('Rock','Paper','Scissors')


function myFunction() {
  var input = prompt("Type 1, 2 or 3 (Rock, Paper or Scissors)" );
  var computer = Math.floor(Math.random()*3);
  if (input != null) {

    //This sets the input to work with the array
    input--

    //Creating the "Draw possibilities"
    if ((computer == 0 && input == 0) || (computer == 1 && input ==1) || (computer == 2 && input == 2)){
      winStatus = ", so its a draw!"
    }

    //Creating the "Win possibilities"
    else if((computer == 0 && input == 1) || (computer == 1 && input == 2) || (computer == 2 && input == 0)) {
    winStatus = ", so you win!"
    }

    //Creating the "Lose possibilities"
    else if((computer == 0 && input == 2) || (computer == 1 && input == 0) || (computer == 2 && input == 1)) {
    winStatus = ", so you lose!"
    }
    else if (input != 1 || 2 || 3) {
    winStatus = ", so you lose, make sure you choose a number between 1 and 3 next time"
}

    document.getElementById("Start").innerHTML = "You chose " + elements[input] + " and the computer chose " + elements[computer] +  winStatus
}
}

/*console.log("Id like to play a game")
console.log("This is a simple game of rock, paper, scissors and the game is a best of 3")
console.log("1 = Rock, 2 = Paper, 3 = Scissors")*/
