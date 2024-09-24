function hitCollision({ player1, player2 }) {
    return (
        player1.hitBox.position.x + player1.hitBox.width >= player2.position.x &&
        player1.hitBox.position.x <= player2.position.x + player2.width &&
        player1.hitBox.position.y + player1.hitBox.height >= player2.position.y &&
        player1.hitBox.position.y <= player2.position.y + player2.height
    )
}

function determineWinner({ playerOne, playerTwo, timerId }) {
    clearTimeout(timerId)
    document.querySelector('#displayResult').style.display = 'flex'
    if (playerOne.health === playerTwo.health) {
        document.querySelector('#displayResult').innerHTML = 'Draw!';
    } else if (playerOne.health > playerTwo.health) {
        document.querySelector('#displayResult').innerHTML = 'P1 Wins!';
    } else if (playerOne.health < playerTwo.health) {
        document.querySelector('#displayResult').innerHTML = 'P2 Wins!';
    }
}

let timer = 60
let timerId
function decreaseTimer() {
    timerId = setTimeout(decreaseTimer, 1000)
    if (timer > 0) {
        timer--
        document.querySelector('#timer').innerHTML = timer
    }

    if (timer === 0) {
        determineWinner({playerOne, playerTwo})
    }
}