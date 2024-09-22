const canvas = document.querySelector('canvas');
//pull in context
const ctx = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

ctx.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.5;
const jump = 12;
const move = 4;

const background = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    imageSrc: './img/background.png'
})

const shop = new Sprite({
    position: {
        x: 630,
        y: 160
    },
    imageSrc: './img/shop.png',
    scale: 2.5,
    framesMax: 6,
})

const playerOne = new Fighter({
    position: {
        x: 200,
        y: 0
    },
    velocity: {
        x: 0,
        y: 0
    },
    offset: {
        x: 0,
        y: 0
    },
    imageSrc: './img/samuraiMack/Idle.png',
    framesMax: 8,
    scale: 2,
    offset: {
        x: 215,
        y: 93
    }
})

const playerTwo = new Fighter({
    position: {
        x: 800,
        y: 0
    },
    velocity: {
        x: 0,
        y: 0
    },
    colour: 'green',
    offset: {
        x: -50,
        y: 0
    }
    // imageSrc: './img/samuraiMack/Idle.png',
    // framesMax: 8

})

const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    w: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowUp: {
        pressed: false
    }
}

decreaseTimer()

function animate() {
    window.requestAnimationFrame(animate)
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    background.update()
    shop.update()
    playerOne.update()
    // playerTwo.update()

    playerOne.velocity.x = 0;
    playerTwo.velocity.x = 0;

    // player movement
    if (keys.a.pressed && playerOne.lastKeyPressed === 'a') {
        playerOne.velocity.x = -(move)
    } else if (keys.d.pressed && playerOne.lastKeyPressed === 'd') {
        playerOne.velocity.x = (move)
    }
    
    // playerTwo movement
    if (keys.ArrowLeft.pressed && playerTwo.lastKeyPressed === 'ArrowLeft') {
        playerTwo.velocity.x = -(move)
    } else if (keys.ArrowRight.pressed && playerTwo.lastKeyPressed === 'ArrowRight') {
        playerTwo.velocity.x = (move)
    }

    // collision detection
    if (hitCollision({
        player1: playerOne,
        player2: playerTwo
    }) &&
        playerOne.isAttacking)
    {
        playerOne.isAttacking = false
        playerTwo.health -= 10
        document.querySelector('#playerTwoHealth').style.width = playerTwo.health + '%'
    }

    if (hitCollision({
        player1: playerTwo,
        player2: playerOne
    }) &&
        playerTwo.isAttacking)
    {
        playerTwo.isAttacking = false
        playerOne.health -= 10
        document.querySelector('#playerOneHealth').style.width = playerOne.health + '%'
    }

    // end game if health drops to 0
    if (playerOne.health <= 0 || playerTwo.health <= 0) {
        determineWinner({playerOne, playerTwo, timerId})
    }
}

animate()

window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'a':
            keys.a.pressed = true;
            playerOne.lastKeyPressed = 'a';
            break;
        case 'd':
            keys.d.pressed = true;
            playerOne.lastKeyPressed = 'd';
            break;
        case 'w':
            playerOne.velocity.y = -(jump);
            break;
        case ' ':
            playerOne.attack();
            break;
        // playerTwo keys
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true;
            playerTwo.lastKeyPressed = 'ArrowLeft';
            break;
        case 'ArrowRight':
            keys.ArrowRight.pressed = true;
            playerTwo.lastKeyPressed = 'ArrowRight';
            break;
        case 'ArrowUp':
            playerTwo.velocity.y = -(jump);
            break;
        case 'Control':
            playerTwo.attack();
            break;
    }
    console.log(event.key);
})

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'a':
            keys.a.pressed = false;
            break
        case 'd':
            keys.d.pressed = false;
            break
        case 'w':
            keys.d.pressed = false;
            break
        // playerTwo keys
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false;
            break;
        case 'ArrowRight':
            keys.ArrowRight.pressed = false;
            break;
    }
    console.log(event.key);
})

