const readline = require('readline');

// Set up readline interface to interact with the user
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Function to flip the coin
function flipCoin() {
  const outcomes = ['Heads', 'Tails'];
  const randomIndex = Math.floor(Math.random() * 2);
  return outcomes[randomIndex];
}

// Function to ask user for their guess and handle the result
function playGame() {
  rl.question('Guess the coin flip! (Heads/Tails): ', (guess) => {
    const flipResult = flipCoin();
    
    // Check if the guess matches the flip result
    if (guess.toLowerCase() === flipResult.toLowerCase()) {
      console.log(`You guessed correctly! The coin landed on ${flipResult}.`);
    } else {
      console.log(`Sorry, you guessed wrong. The coin landed on ${flipResult}.`);
    }

    // Ask the user if they want to play again
    rl.question('Do you want to play again? (yes/no): ', (answer) => {
      if (answer.toLowerCase() === 'yes') {
        playGame();  // Replay the game
      } else {
        console.log('Thanks for playing!');
        rl.close();  // Close the readline interface
      }
    });
  });
}

// Start the game
playGame();
