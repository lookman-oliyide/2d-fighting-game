const canvas = document.querySelector('canvas');
//pull in context
const ctx = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

ctx.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.1;

class Sprite {
    constructor({position, velocity}) {
        this.position = position
        this.velocity = velocity
        this.height = 150
        this.lastKeyPressed
    }

    draw() {
        ctx.fillStyle = 'red';
        ctx.fillRect(this.position.x, this.position.y, 50, this.height);
    }

    update() {
        this.draw();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        
        if (this.position.y + this.height + this.velocity.y >= canvas.height) {
            this.velocity.y = 0//set sprite to fall until it reaches ground level
        } else {
            this.velocity.y += gravity//apply gravity to sprite
        }
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
    }
})

console.log(player);

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

let lastKeyPressed;

function animate() {
    window.requestAnimationFrame(animate)
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    player.update()
    enemy.update()

    player.velocity.x = 0;
    enemy.velocity.x = 0;

    if (keys.a.pressed && lastKeyPressed === 'a') {
        player.velocity.x = -1
    } else if (keys.d.pressed && lastKeyPressed === 'd') {
        player.velocity.x = 1
    } else if (keys.ArrowLeft.pressed && enemy.lastKeyPressed === 'ArrowLeft') {
        enemy.velocity.x = -1
    } else if (keys.ArrowRight.pressed && enemy.lastKeyPressed === 'ArrowRight') {
        enemy.velocity.x = 1
    }
}

animate()


