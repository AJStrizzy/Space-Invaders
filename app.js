const healthDisplay = document.getElementById("game-lives");
const score = document.getElementById("game-score");
const startButton = document.getElementById("game-start");
const game = document.getElementById("game");
//fix score/gameover bug
//make reset game button work
//make enemies shoot
//make lives work

const image = document.getElementById('user');
const image2 = document.getElementById('enemy');
const computedStyle = getComputedStyle(game);
const height = computedStyle.height;
const width = computedStyle.width;

// game.height = height.replace("px", "")
// game.width = width.replace("px", "")
const ctx = game.getContext('2d');

document.getElementById('game-start').addEventListener('click', function() {
    setInterval(rePaint, 1000/60)
})

document.getElementById('game-start').addEventListener('click', function() {
    startButton.style.fontSize = "medium"
    startButton.innerHTML = "Defeat the alien horde!"
})


class Aliens {
    constructor(x, y, width, height) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.alive = true
        this.speed = .5
        this.direction = 'left'
    }
    
    render() {
        ctx.drawImage(image2, this.x -= this.speed,  this.y, this.width, this.height) 
    }

}



function boundaries() {
    if(player.x <= 3) {
        player.speed *= 0
    } else if (player.x >= 272) {
        player.speed *= 0
    }
}

const arrAliens = [];
for (let row = 0; row < 5; row++) {
    for(let col = 0; col < 9; col++) {
        const alien = new Aliens (
            col * 25 + 46, row * 13 + 7, 18, 8
        )
        arrAliens.push(alien)
    }
}



function changeDirection () {
    arrAliens.forEach(function(alien) {
    if (alien.x >= 270) {
        arrAliens.forEach(function(a) {
            a.speed *= -1
            a.y += 2
            a.x -= 2 // should be .4
        }) } else if (alien.x <= 15) {
        arrAliens.forEach(function(a) {
            a.speed *= -1
            a.y += 2 //should be .4
            a.x += 2
    }) }
})
}

let startScore = 0
function scoreUpdate() {
    score.innerHTML = "Score:" + startScore
    if(arrAliens.length === 0) {
        score.innerHTML = "YOU WIN!"
        startButton.style.fontSize = "large"
        startButton.innerHTML = "Play Again!"
        player.y -= .7
    }
} 

function gameOver () {
    score.innerHTML = "YOU LOSE!"
    startButton.innerHTML = "Fly again"
    player.alive = false
}


class Sprite {
    constructor(x, y, width, height) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.speed = 0
        this.alive = true
    }

    render() {
        ctx.drawImage(image, this.x += this.speed, this.y, this.width, this.height)
    }
}

const player = new Sprite(138, 128, 24, 16)

document.addEventListener('keydown', function(evt) {
    if (evt.key === 'ArrowRight' && player.x < 270 && player.speed === 0) {
        player.speed += 1.5
    } else if (evt.key === 'ArrowLeft' && player.x > 6 && player.speed === 0)  {
        player.speed -= 1.5
    } else if (evt.key === 'ArrowLeft' && player.x > 6 && player.speed > 0)  {
        player.speed *= -1
    } else if (evt.key === 'ArrowRight' && player.x < 270 && player.speed < 0)  {
        player.speed *= -1
    } 
})

document.addEventListener('keyup', function(evt) {
    if (evt.key === 'ArrowRight') {
        player.speed *= 0
    } else if (evt.key === 'ArrowLeft')  {
        player.speed *= 0
    } 
})



class Bullets {
    constructor(x, y, color, width, height) {
        this.x = x
        this.y = y
        this.color = color
        this.width = width
        this.height = height
        this.speed = -2.5
        this.alive = true
    }
    render() {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y += this.speed, this.width, this.height)
    }
}
let fireStatus = 1
const arrBullets = [];
document.addEventListener('keydown', function(evt) {
    
    if (evt.key === 'a' && fireStatus === 1 || evt.key === 'A' && fireStatus === 1) {
        const bullet = new Bullets(player.x - 1 + (player.width/2), player.y - 5, 'white', 2, 6)
        arrBullets.push(bullet)
        fireStatus *= -1
        setTimeout(fireReady, 350);
    }
}) 


function fireReady() {
    fireStatus *= -1
}



function alienBoom() {
    for(a = 0; a < arrAliens.length; a++) {
        for(b = 0; b < arrBullets.length; b++) {
           if(arrBullets[b].x >= arrAliens[a].x - 3 && arrBullets[b].x <=arrAliens[a].x +17
            && arrBullets[b].y >= arrAliens[a].y - 5 && arrBullets[b].y <=arrAliens[a].y +9) {
                arrAliens.splice(a,1)
                arrBullets.splice(b,1)
                startScore += 50
            }
        }
    }
}


function playerBoom() {
    for(a = 0; a < arrAliens.length; a++) {
           if(player.x >= arrAliens[a].x - 3 && player.x <=arrAliens[a].x +17
            && player.y >= arrAliens[a].y - 5 && player.y <=arrAliens[a].y +9) {
                gameOver()
            }
        }
    }








function rePaint() {
    ctx.clearRect(0, 0, game.width, game.height)
    if(player.alive === true) {
        player.render()
    }
    arrAliens.forEach(function (par){
        par.render()
    })
    arrBullets.forEach(function (par) {
        par.render()
    })
    boundaries()
    changeDirection()
    alienBoom()
    scoreUpdate()
    playerBoom()
}

