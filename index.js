const canvas = document.querySelector('canvas');
//pull in context
const ctx = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

ctx.fillRect(0, 0, canvas.width, canvas.height);

const gravity = .3;
const jump = 10;
const move = 3;

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
    imageSrc: './img/samuraiMack/Idle.png',
    framesMax: 8,
    scale: 2,
    offset: {
        x: 170,
        y: 143
    },
    sprites: {
        idle: {
            imageSrc: './img/samuraiMack/Idle.png',
            framesMax: 8
        },
        run: {
            imageSrc: './img/samuraiMack/Run.png',
            framesMax: 8
        },
        retreat: {
            imageSrc: './img/samuraiMack/Take Hit.png',
            framesMax: 4
        },
        jump: {
            imageSrc: './img/samuraiMack/Jump.png',
            framesMax: 2
        },
        fall: {
            imageSrc: './img/samuraiMack/Fall.png',
            framesMax: 2
        },
        attack1: {
            imageSrc: './img/samuraiMack/Attack1.png',
            framesMax: 6
        }, 
        takeHit: {
            imageSrc: './img/samuraiMack/Take Hit - white silhouette.png',
            framesMax: 4
        },
        death: {
            imageSrc: './img/samuraiMack/Death.png',
            framesMax: 6
        }
    },
    hitBox: {
        offset: {
            x: 50,
            y: -30
        },
        width: 150,
        height: 130
    },
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
    imageSrc: './img/kenji/Idle.png',
    framesMax: 4,
    scale: 2,
    offset: {
        x: 180,
        y: 156
    },
    sprites: {
        idle: {
            imageSrc: './img/kenji/Idle.png',
            framesMax: 4
        },
        run: {
            imageSrc: './img/kenji/Run.png',
            framesMax: 8
        },
        retreat: {
            imageSrc: './img/kenji/run.png',
            framesMax: 8
        },
        jump: {
            imageSrc: './img/kenji/Jump.png',
            framesMax: 2
        },
        fall: {
            imageSrc: './img/kenji/Fall.png',
            framesMax: 2
        },
        attack1: {
            imageSrc: './img/kenji/Attack1.png',
            framesMax: 4
        },
        takeHit: {
            imageSrc: './img/kenji/Take Hit.png',
            framesMax: 3
        },
        death: {
            imageSrc: './img/kenji/Death.png',
            framesMax: 7
        }
    },
    hitBox: {
        offset: {
            x: -150,
            y: -20
        },
        width: 150,
        height: 120
    }

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
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    playerOne.update()
    playerTwo.update()

    playerOne.velocity.x = 0;
    playerTwo.velocity.x = 0;

    // playerOne movement
    if (keys.a.pressed && playerOne.lastKeyPressed === 'a') {
        playerOne.velocity.x = -(move)
        playerOne.switchSprite('retreat')
    } else if (keys.d.pressed && playerOne.lastKeyPressed === 'd') {
        playerOne.velocity.x = (move)
        playerOne.switchSprite('run')
    } else {
        playerOne.switchSprite('idle')    
    }

    // playerOne jumping
    if (playerOne.velocity.y < 0) {
        playerOne.switchSprite('jump')
    } else if (playerOne.velocity.y > 0) {
        playerOne.switchSprite('fall')
    }
    
    // playerTwo movement
    if (keys.ArrowLeft.pressed && playerTwo.lastKeyPressed === 'ArrowLeft') {
        playerTwo.velocity.x = -(move)
        playerTwo.switchSprite('run')
    } else if (keys.ArrowRight.pressed && playerTwo.lastKeyPressed === 'ArrowRight') {
        playerTwo.velocity.x = (move)
        playerTwo.switchSprite('retreat')
     } else {
        playerTwo.switchSprite('idle')    
    }

    // playerTwo jumping 
    if (playerTwo.velocity.y < 0) {
        playerTwo.switchSprite('jump')
    } else if (playerTwo.velocity.y > 0) {
        playerTwo.switchSprite('fall')
    }

    // collision detection p1
    if (hitCollision({
        player1: playerOne,
        player2: playerTwo
    })
        && playerOne.isAttacking && playerOne.framesCurrent === 4)
    {
        playerOne.isAttacking = false
        playerTwo.takeHit()
        
        gsap.to('#playerTwoHealth', {
            width: playerTwo.health + '%'
        })
    }

    if (playerOne.isAttacking && playerOne.framesCurrent === 4) {
        playerOne.isAttacking = false
    }
    
    // collision detection p2
    if (hitCollision({
        player1: playerTwo,
        player2: playerOne
    })
        && playerTwo.isAttacking && playerTwo.framesCurrent === 2)
    {
        playerTwo.isAttacking = false
        playerOne.takeHit()

        gsap.to('#playerOneHealth', {
            width: playerOne.health + '%'
        })
    }

    if (playerTwo.isAttacking && playerTwo.framesCurrent === 2) {
        playerTwo.isAttacking = false
    }

    // end game if health drops to 0
    if (playerOne.health <= 0 || playerTwo.health <= 0) {
        determineWinner({playerOne, playerTwo, timerId})
    }
}

animate()

window.addEventListener('keydown', (event) => {
    if (!playerOne.isDead) {
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
        }
    }

    if (!playerTwo.isDead) {
        // playerTwo keys
        switch (event.key) {
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

