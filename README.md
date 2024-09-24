# Multiplayer-fighting-game

Multiplayer Fighting Game

A simple multiplayer fighting game where two characters battle each other. Each player controls one character using basic movements such as back, forward, jump, and attack. The game can be played locally with two players.
Features

    Local multiplayer: Two players can control their characters on the same machine.
    Simple controls: Players can move backward, forward, jump, and attack.
    Health system: Each character has a health bar that depletes when hit by the opponent. The first player to reduce their opponent's health to zero wins.

Gameplay

    Player 1 Controls:
        Move Left: A
        Move Right: D
        Jump: W
        Attack: Space

    Player 2 Controls:
        Move Left: Left Arrow
        Move Right: Right Arrow
        Jump: Up Arrow
        Attack: Enter

Getting Started
Prerequisites

    Ensure you have Python installed (if using a Python-based framework such as Pygame).
    For other frameworks, check their installation requirements.

Installation

    Clone this repository to your local machine:

    bash

git clone https://github.com/yourusername/multiplayer-fighting-game.git

Navigate to the project directory:

bash

cd multiplayer-fighting-game

Install the dependencies (if using Pygame):

bash

    pip install -r requirements.txt

Running the Game

To start the game, run the main script:

bash

python main.py

The game will launch in a window where two players can control their characters.
Game Design
Characters

Each player controls a character that can:

    Move: Characters can move left and right.
    Jump: Characters can perform a jump to avoid attacks.
    Attack: Characters can perform a simple attack to deal damage to the opponent.

Health System

Each character starts with a set amount of health (e.g., 100 points). When a character is hit, they lose health points. The game ends when one character’s health reaches zero.
Screenshots

(Add screenshots of your game here to showcase the gameplay)
Built With

    Pygame - A cross-platform set of Python modules designed for writing video games (optional depending on the framework).
    You can substitute Pygame with any other language or framework depending on your design.

Contributing

Feel free to contribute by opening issues or submitting pull requests to enhance the game!
License

This project is licensed under the MIT License - see the LICENSE file for details.
Acknowledgments

    Thanks to all the open-source libraries and tutorials that helped make this project possible!

[Link to game ->](https://builddojo-2d-fighting-game.netlify.app/)
