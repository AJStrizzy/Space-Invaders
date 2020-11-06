const healthDisplay = document.getElementById("game-lives");
const score = document.getElementById("game-score");
const startButton = document.getElementById("game-start");
const game = document.getElementById("game");
const enemyHitSound = document.getElementById("enemy-hit");
const startSound = document.getElementById('start-sound');
const fireSound = document.getElementById('fire');
const gameOverSound = document.getElementById('game-over');
const gameWinSound = document.getElementById('win-sound');
const backSound = document.getElementById('back-sound')


//fix score/gameover bug
//make reset game button work
//make enemies shoot
//make lives work
//stop bullets after game over
//scrolling backgroun
//fix bottom css overhang

const image = document.getElementById('user');
const image2 = document.getElementById('enemy');
const computedStyle = getComputedStyle(game);
const height = computedStyle.height;
const width = computedStyle.width;

game.height = height.replace("px", "")
game.width = width.replace("px", "")
const ctx = game.getContext('2d');

function bgMusic() {
    backSound.play()
}



document.getElementById('game-start').addEventListener('click', function() {
    setInterval(rePaint, 1000/60)
    startSound.play()
    setTimeout(bgMusic(), 5000) /// timeout not working

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
        this.speed = .45 
        this.direction = 'left'
    }
    
    render() {
        ctx.drawImage(image2, this.x -= this.speed,  this.y, this.width, this.height) 
    }

}

const arrAliens = [];
for (let row = 0; row < 5; row++) {
    for(let col = 0; col < 10; col++) {
        const alien = new Aliens (
            col * 45 + 46, row * 27 + 20, 33,17
        )
        arrAliens.push(alien)
    }
}



function changeDirection () {
    arrAliens.forEach(function(alien) {
    if (alien.x >= 490) {
        arrAliens.forEach(function(a) {
            a.speed *= -1
            a.y += 10 //8
            a.x -= 2 
        }) } else if (alien.x <= 25) {
        arrAliens.forEach(function(a) {
            a.speed *= -1
            a.y += 10
            a.x += 2
    }) }
})
}

let winSoundCheck = 1
let startScore = 0
function scoreUpdate() {
    score.innerHTML = "Score:" + startScore
    if(arrAliens.length === 0) {
        score.innerHTML = "YOU WIN!"
        startButton.style.fontSize = "large"
        startButton.innerHTML = "Play Again!"
        player.y -= 1
        backSound.pause()
        if(winSoundCheck === 1){
        gameWinSound.play()
        winSoundCheck *= -1
        }
    }
} 

function gameOver () {
    score.innerHTML = "YOU LOSE!"
    startButton.innerHTML = "Fly again"
    player.alive = false
    backSound.pause()
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

const player = new Sprite(247, 350, 51, 45)

function boundaries() {
    if(player.x <= 2) {
        player.speed *= 0
    } else if (player.x >= 495) {
        player.speed *= 0
    }
}

document.addEventListener('keydown', function(evt) {
    if (evt.key === 'ArrowRight' && player.x < 495 && player.speed === 0) {
        player.speed += 2.5
    } else if (evt.key === 'ArrowLeft' && player.x > 2 && player.speed === 0)  {
        player.speed -= 2.5
    } else if (evt.key === 'ArrowLeft' && player.x > 2 && player.speed > 0)  {
        player.speed *= -1
    } else if (evt.key === 'ArrowRight' && player.x < 495 && player.speed < 0)  {
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
        this.speed = -7
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
        const bullet = new Bullets(player.x - 1 + (player.width/2), player.y - 5, 'white', 3.5, 16)
        arrBullets.push(bullet)
        fireStatus *= -1
        setTimeout(fireReady, 350);
        fireSound.play()
    }
}) 


function fireReady() {
    fireStatus *= -1
}



function alienBoom() {
    for(a = 0; a < arrAliens.length; a++) {
        for(b = 0; b < arrBullets.length; b++) {
            if(arrBullets[b].x < arrAliens[a].x + 33
                && arrBullets[b].x + 3.5 > arrAliens[a].x
                && arrBullets[b].y < arrAliens[a].y + 21
                && arrBullets[b].y + 17 > arrAliens[a].y) {
                arrAliens.splice(a,1)
                arrBullets.splice(b,1)
                startScore += 50
                enemyHitSound.play()

            }
        }
    }
}

let gameSoundCheck = 1
function playerBoom() {
    for(a = 0; a < arrAliens.length; a++) {
           if(player.x < arrAliens[a].x + 33  
                && player.x + player.width > arrAliens[a].x
                && player.y + player.height > arrAliens[a].y 
                && player.y < arrAliens[a].y +17) {
                gameOver()
                
                if(gameSoundCheck === 1) {
                    gameOverSound.play()
                    gameSoundCheck *= -1
                }
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

