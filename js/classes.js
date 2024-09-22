class Sprite {
    constructor({position, imageSrc, scale = 1, framesMax = 1, offset = {x: 0, y: 0}}) {
        this.position = position
        this.height = 150
        this.width = 50
        this.image = new Image()
        this.image.src = imageSrc
        this.scale = scale
        this.framesMax = framesMax
        this.framesCurrent = 0
        this.framesElapsed = 0
        this.framesHold = 10
        this.offset = offset
    }

    draw() {
        ctx.drawImage(
            this.image,
            this.framesCurrent * (this.image.width / this.framesMax), //framesCurrent = 0 for static images, > 0 for animated
            0,
            this.image.width / this.framesMax,
            this.image.height,
            this.position.x - this.offset.x,
            this.position.y - this.offset.y,
            (this.image.width / this.framesMax) * this.scale,
            this.image.height * this.scale
        )
    }

    animateFrames() {
        this.framesElapsed++; //count for total frames elapsed

        if (this.framesElapsed % this.framesHold === 0) { //slow down animation by framehold
            if (this.framesCurrent < this.framesMax - 1) {
                this.framesCurrent++; // if framesMax > 1, increment framesCurrent
            } else {
                this.framesCurrent = 0;
            }
        }
    }

    update() {
        this.draw();
        this.animateFrames()
    }
} 

class Fighter extends Sprite {
    constructor({
        position,
        velocity,
        colour = 'red',
        imageSrc,
        scale = 1,
        framesMax = 1,
        offset = {x: 0, y: 0}
    }){
        super({
            position,
            imageSrc,
            scale,
            framesMax,
            offset
        })

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
        this.health = 100
        this.framesCurrent = 0
        this.framesElapsed = 0
        this.framesHold = 10
    }

    update() {
        this.draw();
        this.animateFrames();
        
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        this.hitBox.position.x = this.position.x + this.hitBox.offset.x
        this.hitBox.position.y = this.position.y
        
        if (this.position.y + this.height + this.velocity.y >= canvas.height - 94) {
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