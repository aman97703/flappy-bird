# Flappy Bird Game

A simple Flappy Bird clone built using HTML5, CSS, and JavaScript. This game allows the player to control a bird that must navigate through pipes by pressing the spacebar or clicking the mouse. The game ends when the bird collides with a pipe or the ground.

## Features

- **Smooth animation**: The bird flies with gravity, and pipes continuously move from right to left.
- **Collision detection**: The game detects when the bird hits a pipe or the ground, triggering a "Game Over" state.
- **Dynamic pipes**: Pipes are placed randomly at intervals and feature a gap that the bird must pass through.
- **Game Over screen**: When the player loses, a fancy "Game Over" message appears with fading, pulsing effects and a display of the final score.
- **Score tracking**: The game keeps track of the player's score based on the number of pipes passed.

## Setup

1. Clone this repository to your local machine:
    ```bash
    git clone https://github.com/aman97703/flappy-bird.git
    ```

2. Open the `index.html` file in your web browser to start the game.

## How to Play

- **Start the Game**: The game starts automatically when the page is loaded.
- **Control the Bird**:
  - Press the **Spacebar** or **Click the mouse** to make the bird fly upward.
  - The bird will fall due to gravity when no action is taken.
- **Game Over**: The game ends if the bird hits a pipe or the ground. Press **Spacebar** to restart the game after it's over.

## Files

- **index.html**: The main HTML structure of the game.
- **style.css**: Basic styles for the game (optional, if styling is needed).
- **script.js**: The JavaScript code that powers the game.
- **assets/**: Folder containing images used for the bird and pipes:
  - `flappybird.png`: Image for the bird.
  - `toppipe.png`: Image for the top pipe.
  - `bottompipe.png`: Image for the bottom pipe.

## Game Logic Overview

The game is powered by a simple physics engine using the following parameters:

- **Gravity**: The bird falls over time due to gravity.
- **Velocity**: The bird's vertical speed is controlled by user input (Spacebar or mouse click).
- **Collision Detection**: The game checks if the bird overlaps with pipes or the ground.
- **Score**: The score increments when the bird successfully passes a pipe.

### Game Over Screen

When the game ends, a "Game Over" message appears in the center of the screen with the following features:

- **Fading effect**: The "Game Over" text fades in.
- **Pulsing effect**: The text size pulses slightly to make it more dynamic.
- **Text shadow**: The text is highlighted with a yellow shadow.
- **Final score**: Displays the player's score below the "Game Over" text.
