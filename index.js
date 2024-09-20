const canvas = document.querySelector('canvas');
//pull in context
const ctx = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

ctx.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.7;
const jump = 20;
const move = 5;

class Sprite {
    constructor({position, velocity, colour = 'red', offset}) {
        this.position = position
        this.velocity = velocity
        this.height = 150
        this.width = 50
        this.lastKeyPressed
        this.colour = colour
        this.hitBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset,
            width: 100,
            height: 50,
        }
        this.isAttacking
    }

    draw() {
        // draw the sprite
        ctx.fillStyle = this.colour;
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height); 

        // hit box
        if (this.isAttacking) {
            ctx.fillStyle = 'blue';
            ctx.fillRect(this.hitBox.position.x, this.hitBox.position.y, this.hitBox.width, this.hitBox.height);
        }

    }

    update() {
        this.draw();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        this.hitBox.position.x = this.position.x + this.hitBox.offset.x
        this.hitBox.position.y = this.position.y
        
        if (this.position.y + this.height + this.velocity.y >= canvas.height) {
            this.velocity.y = 0//set sprite to fall until it reaches ground level
        } else {
            this.velocity.y += gravity//apply gravity to sprite
        }
    }

    attack() {
        this.isAttacking = true;
        setTimeout(() => {
            this.isAttacking = false;
        }, 100) // set isAttacking back to false after 100ms
    }

} 

const player = new Sprite({
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
    }
})

const enemy = new Sprite({
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

function hitCollision({ player1, player2 }) {
    return (
        player1.hitBox.position.x + player1.hitBox.width >= player2.position.x &&
        player1.hitBox.position.x <= player2.position.x + player2.width &&
        player1.hitBox.position.y + player1.hitBox.height >= player2.position.y &&
        player1.hitBox.position.y <= player2.position.y + player2.height
    )
}

function animate() {
    window.requestAnimationFrame(animate)
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    player.update()
    enemy.update()

    player.velocity.x = 0;
    enemy.velocity.x = 0;

    // player movement
    if (keys.a.pressed && player.lastKeyPressed === 'a') {
        player.velocity.x = -(move)
    } else if (keys.d.pressed && player.lastKeyPressed === 'd') {
        player.velocity.x = (move)
    }
    
    // enemy movement
    if (keys.ArrowLeft.pressed && enemy.lastKeyPressed === 'ArrowLeft') {
        enemy.velocity.x = -(move)
    } else if (keys.ArrowRight.pressed && enemy.lastKeyPressed === 'ArrowRight') {
        enemy.velocity.x = (move)
    }

    // collision detection
    if (hitCollision({
        player1: player,
        player2: enemy
    }) &&
        player.isAttacking)
    {
        player.isAttacking = false
        console.log('hero slash');
    }

    if (hitCollision({
        player1: enemy,
        player2: player
    }) &&
        enemy.isAttacking)
    {
        player.isAttacking = false
        console.log('villian slash');
    }
}

animate()

window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'a':
            keys.a.pressed = true;
            player.lastKeyPressed = 'a';
            break;
        case 'd':
            keys.d.pressed = true;
            player.lastKeyPressed = 'd';
            break;
        case 'w':
            player.velocity.y = -(jump);
            break;
        case ' ':
            player.attack();
            break;
        // enemy keys
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true;
            enemy.lastKeyPressed = 'ArrowLeft';
            break;
        case 'ArrowRight':
            keys.ArrowRight.pressed = true;
            enemy.lastKeyPressed = 'ArrowRight';
            break;
        case 'ArrowUp':
            enemy.velocity.y = -(jump);
            break;
        case 'Control':
            enemy.attack();
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
        // enemy case
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false;
            break;
        case 'ArrowRight':
            keys.ArrowRight.pressed = false;
            break;
    }
    console.log(event.key);
})

