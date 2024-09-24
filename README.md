# Multiplayer Fighting Game

A simple multiplayer fighting game where two characters battle each other. Each player controls one character using basic movements such as back, forward, jump, and attack. The game can be played locally with two players.

## Features
- **Local multiplayer**: Two players can control their characters on the same machine.
- **Simple controls**: Players can move backward, forward, jump, and attack.
- **Health system**: Each character has a health bar that depletes when hit by the opponent. The first player to reduce their opponent's health to zero wins.

## Play the Game Online

The game is hosted on [Netlify](https://www.netlify.com/). You can play it online by visiting the following link:

**[Play the Multiplayer Fighting Game here](https://builddojo-2d-fighting-game.netlify.app/)**

## Gameplay
- **Player 1 Controls**:
  - Move Left: `A`
  - Move Right: `D`
  - Jump: `W`
  - Attack: `Space`

- **Player 2 Controls**:
  - Move Left: `←` (Left Arrow)
  - Move Right: `→` (Right Arrow)
  - Jump: `↑` (Up Arrow)
  - Attack: `Control`

## Getting Started

### Installation

1. Clone this repository to your local machine:
   ```bash
   git clone [https://github.com/lookman-oliyide/2d-fighting-game.git]
2. Navigate to the project directory:
   ```bash
   cd multiplayer-fighting-game
3. Open the index.html file in your browser to run the game locally.
   Alternatively, you can use a local web server if needed:
   ```bash
   npx serve

## Folder Structure
- **index.html**: The main HTML file that renders the game.
- **style.css**: The stylesheet for the game's UI.
- **main.js**: The JavaScript file handling game logic, including player controls, movement, and collision detection.

## Game Design

### Characters

Each player controls a character that can:

- **Move**: Characters can move left and right.
- **Jump**: Characters can perform a jump to avoid attacks.
- **Attack**: Characters can perform a simple attack to deal damage to the opponent.

### Health System

Each character starts with a set amount of health (100 points). When a character is hit, they lose health points. The game ends when one character’s health reaches zero.

### Screenshots

![Alt text](/relative/path/to/img.jpg?raw=true "Optional Title")

### Built With

- HTML, CSS, and JavaScript: Core technologies used to build the game.
- Hosted on Netlify.

### Contributing

Feel free to contribute by opening issues or submitting pull requests to enhance the game!

### Acknowledgments

Thanks to all the open-source libraries and tutorials that helped make this project possible!
