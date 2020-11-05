const healthDisplay = document.getElementById("game-lives");
const score = document.getElementById("game-score");
const startButton = document.getElementById("game-start");
const game = document.getElementById("game");


const image = document.getElementById('user');
const image2 = document.getElementById('enemy');
const computedStyle = getComputedStyle(game);
const height = computedStyle.height;
const width = computedStyle.width;
console.log(height, width)
// game.height = height.replace("px", "")
// game.width = width.replace("px", "")
const ctx = game.getContext('2d');

document.getElementById('game-start').addEventListener('click', function() {
    setInterval(rePaint, 1000/60)
})

const left = 'left';
const right = 'right';


class Aliens {
    constructor(x, y, width, height) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.alive = true
        this.speed = 0.3
        this.direction = 'left'
    }
    
    render() {
        ctx.drawImage(image2, this.x -= this.speed,  this.y, this.width, this.height) 
    }

}


// chgDir(){
//     if(this.x = 10) {
//         this.speed *= -1
//     }
// }


const arrAliens = [];
for (let row = 0; row < 4; row++) {
    for(let col = 0; col < 8; col++) {
        const alien = new Aliens (
            col * 27 + 46, row * 13 + 7, 18, 8
        )
        arrAliens.push(alien)
    }
}



class Sprite {
    constructor(x, y, width, height) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        // this.speed = 0
        this.alive = true
    }

    render() {
        ctx.drawImage(image, this.x, this.y, this.width, this.height)
        // ctx.update(this.x += this.speed)
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
        ctx.fillRect(this.x, this.y += this.speed, this.width, this.height)
    }
}

const arrBullets = [];
document.addEventListener('keydown', function(evt) {
    if (evt.key === 'a') {
        const bullet = new Bullets(player.x - 1 + (player.width/2), player.y - 7, 'white', 2, 6)
        arrBullets.push(bullet)
    }
}) 














document.addEventListener('keydown', function(evt) {
    if (evt.key === 'ArrowRight' && player.x < 270){
        player.x += 10
    } else if (evt.key === 'ArrowLeft' && player.x > 6) {
        player.x -= 10
    } else if (evt.keyCode === 32) {
       console.log(bullet)
    }
})





// function rightBoundary() {
//     if(player.x >= 270) {
//         player.speed -= 2
//     }
//     return player.speed
// }




   




function rePaint() {
    ctx.clearRect(0, 0, game.width, game.height)

    player.render()
    arrAliens.forEach(function (par){
        par.render()
    })
    
    

   
    arrBullets.forEach(function (par) {
        par.render()
    })

    

    // rightBoundary()
}