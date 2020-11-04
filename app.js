const healthDisplay = document.getElementById("game-lives");
const score = document.getElementById("game-score");
const startButton = document.getElementById("game-start");
const game = document.getElementById("game");


const image = document.getElementById('user');
const image2 = document.getElementById('enemy');
const computedStyle = getComputedStyle(game);
const height = computedStyle.height;
const width = computedStyle.width;

const ctx = game.getContext('2d');

document.getElementById('game-start').addEventListener('click', function() {
    setInterval(rePaint, 1000/60)
})



class Aliens {
    constructor(x, y, width, height) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.alive = true
    }

    render() {
        ctx.drawImage(image2, this.x, this.y, this.width, this.height)
    }
}

// const alien = new Aliens(140, 10, 18, 8)



const arrAliens = [];
for (let row = 0; row < 4; row++) {
    for(let col = 0; col < 8; col++) {
        const alien = new Aliens (
            col * 27 + 46, row * 13 + 7, 18, 8
        )
        arrAliens.push(alien)
    }
}

console.log(arrAliens)

class Sprite {
    constructor(x, y, width, height) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.alive = true
    }

    render() {
        ctx.drawImage(image, this.x, this.y, this.width, this.height)
    }
}

const player = new Sprite(138, 125, 24, 16)



class Bullets {
    constructor(x, y, color, width, height) {
        this.x = x
        this.y = y
        this.color = color
        this.width = width
        this.height = height
        this.speed = -1.5
        this.alive = true
    }
    render() {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)
        ctx.update(this.y = this.y +this.speed)
    }
}

const bullet = new Bullets(player.x - 1 + (player.width/2), player.y - 7, 'white', 2, 6)
console.log(bullet)







document.addEventListener('keydown', function(evt) {
    if (evt.key === 'ArrowRight' && player.x < 270){
        player.x += 10
    } else if (evt.key === 'ArrowLeft' && player.x > 6) {
        player.x -= 10
    } else if (evt.keyCode === 32) {
       console.log(bullet)
    }
})






   




function rePaint() {
    ctx.clearRect(0, 0, game.width, game.height)

    player.render()
    // arrAliens.render()
    arrAliens.forEach(function (par){
        par.render()
    })
    

    bullet.render()
    
}