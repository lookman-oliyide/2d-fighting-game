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
        this.framesHold = 20
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
        offset = { x: 0, y: 0 },
        sprites,
        hitBox = {
            offset: {},
            width: undefined,
            height: undefined
        }
    }){
        super({
            position,
            imageSrc,
            scale,
            framesMax,
            offset
        })

        this.velocity = velocity
        this.height = 100
        this.width = 50
        this.lastKeyPressed
        this.colour = colour
        this.hitBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset: hitBox.offset,
            width: hitBox.width,
            height: hitBox.height,
        }
        this.isAttacking
        this.health = 100
        this.framesCurrent = 0
        this.framesElapsed = 0
        this.framesHold = 10
        this.sprites = sprites
        this.isDead = false

        for (const sprite in this.sprites) {
            sprites[sprite].image = new Image()
            sprites[sprite].image.src = sprites[sprite].imageSrc
        }

        console.log(this.sprites)
    }

    update() {
        this.draw();
        if (!this.isDead) {
            this.animateFrames();
        }
        
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        
        
        this.hitBox.position.x = this.position.x + this.hitBox.offset.x
        this.hitBox.position.y = this.position.y + this.hitBox.offset.y
        
        // ctx.fillStyle = 'red'
        // ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
        // ctx.fillStyle = 'black'
        // ctx.fillRect(this.hitBox.position.x, this.hitBox.position.y, this.hitBox.width, this.hitBox.height)
        
        if (this.position.y + this.height + this.velocity.y >= canvas.height - 94) {
            this.velocity.y = 0//set sprite to fall until it reaches ground level
            // this.position.y = 332
        } else {
            this.velocity.y += gravity//apply gravity to sprite
        }
    }

    attack() {
        this.switchSprite('attack1')
        this.isAttacking = true;
    }

    takeHit() {
        this.health -= 10;
        
        if (this.health <= 0) {
            this.switchSprite('death');
        } else {
            this.switchSprite('takeHit');     
        }
    }

    switchSprite(sprite) {
        // override all other animation with death animation
        if (this.image === this.sprites.death.image) {
            if (this.framesCurrent === this.sprites.death.framesMax - 1)
                this.isDead = true;
            return
        }
        // override all other animation except death with attack animation
        if (
            this.image === this.sprites.attack1.image && //while attack img/animation is active
            this.framesCurrent < this.sprites.attack1.framesMax - 1 // return, else switch
        ) return

        // override animation when player gets hit
        if (
            this.image === this.sprites.takeHit.image &&
            this.framesCurrent < this.sprites.takeHit.framesMax - 1
        ) return

        switch (sprite) {
            case 'idle':
                if (this.image != this.sprites.idle.image) {
                    this.image = this.sprites.idle.image
                    this.framesMax = this.sprites.idle.framesMax
                }
                break;
            case 'run':
                if (this.image != this.sprites.run.image) {
                    this.image = this.sprites.run.image
                    this.framesMax = this.sprites.run.framesMax
                    this.framesCurrent = 0
                }
                break;
            case 'retreat':
                if (this.image != this.sprites.retreat.image) {
                    this.image = this.sprites.retreat.image
                    this.framesMax = this.sprites.retreat.framesMax
                    this.framesCurrent = 0
                }
                break;
            case 'jump':
                if (this.image != this.sprites.jump.image) {
                    this.image = this.sprites.jump.image
                    this.framesMax = this.sprites.jump.framesMax
                    this.framesCurrent = 0
                }
                break;
            case 'fall':
                if (this.image != this.sprites.fall.image) {
                    this.image = this.sprites.fall.image
                    this.framesMax = this.sprites.fall.framesMax
                    this.framesCurrent = 0
                }
                break;
            case 'attack1':
                if (this.image != this.sprites.attack1.image) {
                    this.image = this.sprites.attack1.image
                    this.framesMax = this.sprites.attack1.framesMax
                    this.framesCurrent = 0
                }
                break;
            case 'takeHit':
                if (this.image != this.sprites.takeHit.image) {
                    this.image = this.sprites.takeHit.image
                    this.framesMax = this.sprites.takeHit.framesMax
                    this.framesCurrent = 0
                }
                break;
            case 'death':
                if (this.image != this.sprites.death.image) {
                    this.image = this.sprites.death.image
                    this.framesMax = this.sprites.death.framesMax
                    this.framesCurrent = 0
                }
                break;   
        }
    }

} 