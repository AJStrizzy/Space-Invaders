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
const damageSound = document.getElementById('player-damage')
const alienShooting = document.getElementById("enemy-sound")

// fix button glitch after beating boss
// add health points to boss
let alienFireRate = 1300
let playerFireRate = 0
let points = 50
let level = 1
let levelStatus = 'Next Level'
let yspeed = 0
let alienSpeed = .5
let alienWidth = 33
let alienHeight = 17
let changeDirectionx1 = 490
let changeDirectionx2 = 25
let bossHealth = 20
const bg1 = 'bg1.jpg'
const bg2 = 'bg2.jpg'
const bg3 = 'bg3.jpg'
const bg4 = 'bg4.jpg'
const bg5 = 'bg5.jpg'


const image1 = document.getElementById('user');
const image2 = document.getElementById('enemy');
const computedStyle = getComputedStyle(game);
const height = computedStyle.height;
const width = computedStyle.width;
let gmLive = 1;
game.height = height.replace("px", "")
game.width = width.replace("px", "")
const ctx = game.getContext('2d');
let counter = 0
let alienBulletX = 14
let alienBulletY = 12
let alienBulletHeight = 8
let alienBulletWidth = 3

// function drawBgImg(img) {
//     let bgImg = new Image();
//     bgImg.src = img;
//     ctx.drawImage(bgImg, 0, 0);
// }

// function spaceOption1(){
//     drawBgImg(bg1)
// }
//  function spaceOption2(){
//     drawBgImg(bg2)
// }
// function spaceOption3(){
//     drawBgImg(bg3)
// }
// function spaceOption4(){
//     drawBgImg(bg4)
// }
// function spaceOption5(){
//     drawBgImg(bg5)
// }

// function background() {
//     if(counter===0){
//          spaceOption1()
//          counter = 1;
//         }else if(counter === 1){
//             spaceOption2()
//             counter = 2;
//         }else if(counter === 2){
//             spaceOption3()
//             counter = 3;
//         }else if(counter === 3){
//             spaceOption4()
//             counter = 4;
//         }else{
//             spaceOption5()
//          counter = 0;
//     }
// }

function bgMusic() {
    backSound.play()
}




// Start Game



document.getElementById('game-start').addEventListener('click', function(){
    if(document.getElementById('game-start').textContent === 'Start Game') {
        startGame()
    } else if (document.getElementById('game-start').textContent === 'Try Again') {
        reset()
    } else if (document.getElementById('game-start').textContent === 'Next Level' && level <= 3) {
        levelUp()
    } else if (document.getElementById('game-start').textContent === 'Next Level' && level === 4) {
        bossLevel()
    } else if (document.getElementById('game-start').textContent === 'Play Again' && level === 5) {
        playAgain()
    }
    })

function startGame () {
    clearInterval(interval)
    alienFireRate = 1300
    alienSpeed = .50
    interval()
    startSound.play()
    setTimeout(bgMusic, 1250)
    startButton.style.fontSize = "medium"
    startButton.innerHTML = "Level " + level
            setInterval(fire, alienFireRate) 
    }



function reset() {
    clearInterval(interval)
    alienFireRate = 1300
    alienSpeed = .50
    gmLive = 1
    winSoundCheck = 1
    level = 1
    player.alive = true
    player.yspeed = 0
    player.x = 247
    player.y = 350
    playerHealth = 3
    startScore = 0
    score.innerHTML = "Score:" + startScore
    healthDisplay.innerHTML = "❤ ❤ ❤"
    arrAliens.splice(0, arrAliens.length)
    arrAlienBullets.splice(0, arrAlienBullets.length)
    arrBullets.splice(0, arrBullets.length)
    
    for (let row = 0; row < 5; row++) {
    for(let col = 0; col < 10; col++) {
        const alien = new Aliens (
            col * 45 + 46, row * 27 + 25, 33,17
        )
        arrAliens.push(alien)
        }
    }    
    startSound.play()
    setTimeout(bgMusic, 1250)
    startButton.style.fontSize = "medium"
    startButton.innerHTML = "Level " + level
            
}


function levelUp() {
    clearInterval(interval)
    gameWinSound.pause()
    gmLive = 1
    winSoundCheck = 1
    player.alive = true
    player.yspeed = 0
    player.x = 247
    player.y = 350
    alienSpeed += .20
    alienFireRate -= 300
    points += 50
    level += 1
    score.innerHTML = "Score:" + startScore
    arrAliens.splice(0, arrAliens.length)
    arrAlienBullets.splice(0, arrAlienBullets.length)
    arrBullets.splice(0, arrBullets.length)
    
    for (let row = 0; row < 5; row++) {
    for(let col = 0; col < 10; col++) {
        const alien = new Aliens (
            col * 45 + 46, row * 27 + 25, 33,17
        )
        arrAliens.push(alien)
        }
    }
    startSound.play()
    setTimeout(bgMusic, 1250)
    startButton.style.fontSize = "medium"
    startButton.innerHTML = "Level " + level
            
}

function bossLevel() {
    clearInterval(interval)
    if (bossHealth === 0) {
        bossDefeated()
    }
    gameWinSound.pause()
    gmLive = 1
    winSoundCheck = 1
    player.alive = true
    player.yspeed = 0
    player.x = 247
    player.y = 350
    startButton.innerHTML = "Final Level"
    alienSpeed = 3
    alienFireRate = 250
    alienBulletHeight = 24
    alienBulletWidth = 10
    alienBulletX = 160
    alienBulletY = 160
    alienWidth = 350
    alienHeight = 185
    changeDirectionx1 = 220
    points += 50
    level += 1
    score.innerHTML = "Score:" + startScore
    arrAliens.splice(0, arrAliens.length)
    arrAlienBullets.splice(0, arrAlienBullets.length)
    arrBullets.splice(0, arrBullets.length)
    
    for (let row = 0; row < 1; row++) {
    for(let col = 0; col < 1; col++) {
        const alien = new Aliens (
            col * 45 + 200, row * 27 + 30, 350, 185
        )
        arrAliens.push(alien)
        }
}
}

function playAgain() {
    clearInterval(interval)
    alienFireRate = 1300
    startScore = 0
    alienSpeed = .50
    gmLive = 1
    winSoundCheck = 1
    level = 1
    player.alive = true
    player.yspeed = 0
    player.x = 247
    player.y = 350
    playerHealth = 3
    startScore = 0
    score.innerHTML = "Score:" + startScore
    healthDisplay.innerHTML = "❤ ❤ ❤"
    arrAlienBullets.splice(0, arrAlienBullets.length)
    arrBullets.splice(0, arrBullets.length)
    
    for (let row = 0; row < 5; row++) {
    for(let col = 0; col < 10; col++) {
        const alien = new Aliens (
            col * 45 + 46, row * 27 + 25, 33,17
        )
        arrAliens.push(alien)
        }
    }    
    startSound.play()
    setTimeout(bgMusic, 1250)
    startButton.style.fontSize = "medium"
    startButton.innerHTML = "Level " + level
            
}



// Player set up
class Sprite {
    constructor(x, y, width, height) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.speed = 0
        this.yspeed = yspeed
        this.alive = true
    }

    render() {
        ctx.drawImage(image1, this.x += this.speed, this.y += this.yspeed, this.width, this.height)
    }
}
let playerHealth = 3
const player = new Sprite(247, 350, 51, 45)

// Creates left and right boundaries for player
function boundaries() {
    if(player.x <= 2) {
        player.speed *= 0
    } else if (player.x >= 495) {
        player.speed *= 0
    }
}

// Movement conditions for player
document.addEventListener('keydown', function(evt) {
    if (evt.key === 'ArrowRight' && player.x < 495 && player.speed === 0 && gmLive === 1) {
        player.speed += 2.5
    } else if (evt.key === 'ArrowLeft' && player.x > 2 && player.speed === 0 && gmLive === 1)  {
        player.speed -= 2.5
    } else if (evt.key === 'ArrowLeft' && player.x > 2 && player.speed > 0 && gmLive === 1)  {
        player.speed *= -1
    } else if (evt.key === 'ArrowRight' && player.x < 495 && player.speed < 0 && gmLive === 1)  {
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


//Aliens
class Aliens {
    constructor(x, y, width, height) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.alive = true
        this.speed = alienSpeed
        this.yspeed = 0
    }
    
    render() {
        ctx.drawImage(image2, this.x -= this.speed,  this.y -= this.yspeed, this.width, this.height) 
    }

}

const arrAliens = [];
for (let row = 0; row < 5; row++) {
    
    for(let col = 0; col < 10; col++) {
        const alien = new Aliens (
            col * 45 + 46, row * 27 + 25, 33,17
        )
        arrAliens.push(alien)
        }
    }


class AlienBullets {
    constructor(x, y, color, width, height) {
        this.x = x
        this.y = y
        this.color = color
        this.width = width
        this.height = height
        this.speed = 2.3
        this.alive = true
    }
    render() {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y += this.speed, this.width, this.height)
    }
}

    const arrAlienBullets = [];
   
    

    function fire() {
        if(gmLive === 1) {
        const getBottomAliens = () => {
            const bottomAliens = [];
            let groupedByX = {};
            arrAliens.forEach((alien) => {
                if (!groupedByX[alien.x]) {
                    groupedByX[alien.x] = [alien.y,alien];
                } else if (alien.y > groupedByX[alien.x][0]) {
                    groupedByX[alien.x] = [alien.y,alien];
                }
            }) 
            for (let key in groupedByX) {
                bottomAliens.push(groupedByX[key][1]);
            }
            return bottomAliens;
        }
        const getRandomAlien = (aliensList) => {
            return aliensList[
                parseInt(Math.random() * aliensList.length)
            ];
        };
        const bottomAliens = getBottomAliens();
        const randomAlien = getRandomAlien(bottomAliens);
        const alienBullet = new AlienBullets(randomAlien.x + alienBulletX, randomAlien.y + alienBulletY, 'red', alienBulletWidth, alienBulletHeight)       
        if (gmLive === 1) {
            arrAlienBullets.push(alienBullet)
            alienShooting.play()
        }
    }
}

    





//Set up alien movement pattern
function changeDirection () {
    arrAliens.forEach(function(alien) {
    if (alien.x >= changeDirectionx1) {
        arrAliens.forEach(function(a) {
            a.speed *= -1
            a.y += 10 //8
            a.x -= 2 
        }) } else if (alien.x <= changeDirectionx2) {
        arrAliens.forEach(function(a) {
            a.speed *= -1
            a.y += 10
            a.x += 2
    }) }
})
}

//updates score + provides winning game condition
let winSoundCheck = 1
let startScore = 0
function scoreUpdate() {
   if(gmLive === 1) {
       score.innerHTML = "Score:" + startScore
   }
    if(arrAliens.length === 0) {
        score.innerHTML = "YOU WIN!"
        startButton.style.fontSize = "large"
        startButton.innerHTML = levelStatus
        player.yspeed -= 1
        player.speed = 0
        backSound.pause()
        if(winSoundCheck === 1){
        gameWinSound.play()
        winSoundCheck *= -1
        gmLive *= -1
        arrAlienBullets[a] = 0
        }
    }
} 

// Provides losing game condition
function gameOver () {
   if(player.alive === true){
    score.innerHTML = "YOU LOSE!"
    startButton.innerHTML = "Try Again"
    backSound.pause()
    gmLive *= -1
    healthDisplay.style.fontSize = "Large"
    healthDisplay.innerHTML = "☠ ☠ ☠"
    arrAliens.forEach(function(a) {
        a.yspeed += 1
        a.speed = 0
    })
   }
}


// Set up player projeciles
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

// Sets up firing conditions
let fireStatus = true
const arrBullets = [];
document.addEventListener('keydown', function(evt) {
    if (evt.key === 'a' && fireStatus === true && gmLive === 1|| evt.key === 'A' && fireStatus === true && gmLive === 1) {
        const bullet = new Bullets(player.x - 1 + (player.width/2), player.y - 5, 'white', 3.5, 16)
        arrBullets.push(bullet)
        fireStatus = !fireStatus
        setTimeout(fireReady, playerFireRate);
        fireSound.play()
    }
}) 


function fireReady() {
    fireStatus = !fireStatus
}


//sets up alien hit conditions
function alienSound() {
    enemyHitSound.play()
}

function alienBoom() {
    for(a = 0; a < arrAliens.length; a++) {
        for(b = 0; b < arrBullets.length; b++) {
            if(arrBullets[b].x < arrAliens[a].x + 33
                && arrBullets[b].x + 3.5 > arrAliens[a].x
                && arrBullets[b].y < arrAliens[a].y + 21
                && arrBullets[b].y + 17 > arrAliens[a].y && level < 5) {
                arrAliens.splice(a,1)
                arrBullets.splice(b,1)
                startScore += points
                enemyHitSound.pause()
                setTimeout(alienSound, 50)
                } else if (arrBullets[b].x < arrAliens[a].x + 350
                    && arrBullets[b].x + 3.5 > arrAliens[a].x
                    && arrBullets[b].y < arrAliens[a].y + 185
                    && arrBullets[b].y + 17 > arrAliens[a].y && level === 5) {
                    bossHealth -= 1
                    arrBullets.splice(b,1)
                    startScore += points
                    enemyHitSound.pause()
                    setTimeout(alienSound, 50)
                    
                
                    
                }
            }
        }
    }
function bossDefeated() {
    
        startButton.innerHTML = 'Aliens Exterminated'
        arrAliens.splice[a,1]
    
}

//sets up lost game conditions
let gameSoundCheck = 1
function playerBoom() {
    for(a = 0; a < arrAliens.length; a++) {
           if(player.x < arrAliens[a].x + alienWidth  
                && player.x + player.width > arrAliens[a].x
                && player.y + player.height > arrAliens[a].y 
                && player.y < arrAliens[a].y + alienHeight && gmLive === 1) {
                gameOver()
                player.yspeed -= 1
                player.speed = 0
                if(gameSoundCheck === 1) {
                    gameOverSound.play()
                    gameSoundCheck *= -1
                } 
            } else if(arrAliens[a].y >= 390 && gmLive === 1) {
                gameOver()
                player.alive = false
                if(gameSoundCheck === 1) {
                    gameOverSound.play()
                    gameSoundCheck *= -1
                }
            }
        }
    }

function playerDeath() {
    if(playerHealth === 0 && gmLive === 1) {
        gameOver()
        player.alive = false
        if(gameSoundCheck === 1) {
            gameOverSound.play()
            gameSoundCheck *= -1
        }
    }
}

function bulletBoundaries() {
    for( let b = 0; b < arrBullets.length; b++) {
        if(arrBullets[b].y <= -10) {
            arrBullets.splice(b,1)
        }
    }
    for( let a = 0; a < arrAlienBullets.length; a++) {
        if(arrAlienBullets[a].y >= 420 ) {
            arrAlienBullets.splice(a,1)
        }
    }
}
function damageAnimation() {
    player.alive = true
}

function playerDamage() {
    for(a = 0; a < arrAlienBullets.length; a++) {
        if(player.x < arrAlienBullets[a].x + 3  
             && player.x + player.width > arrAlienBullets[a].x
             && player.y + player.height > arrAlienBullets[a].y 
             && player.y < arrAlienBullets[a].y +8) {
            if(player.alive === true && gmLive === 1) {
                playerHealth -= 1 }
             if (playerHealth === 2 && gmLive === 1) {
                healthDisplay.innerHTML = "❤ ❤"
                damageSound.play()
             } else if (playerHealth === 1 && gmLive ===1) {
                healthDisplay.innerHTML = "❤"
                damageSound.play()
             }
             arrAlienBullets.splice(a,1)
             if(player.alive === true && playerHealth >= 1 && gmLive === 1) {
                 player.alive = false
             setTimeout(damageAnimation, 120) 
            }
        }
    }
}
function interval() {
    setInterval(rePaint, 1000/60)
}

//refreshes and constantly updates all relevant functions

function rePaint() {
    ctx.clearRect(0, 0, game.width, game.height)
    // background()
    
    if(player.alive === true) {
        player.render()
    }
    if(arrAliens !== 0) {
    arrAliens.forEach(function (par){
        par.render()
    })
}
    if(arrBullets !== 0){
    arrBullets.forEach(function (par) {
        par.render()
    })
}
    if(arrAlienBullets !== 0) {
    arrAlienBullets.forEach(function (par) {
        par.render()
    })
    }


    
    bulletBoundaries()
    boundaries()
    changeDirection()
    alienBoom()
    scoreUpdate()
    playerBoom()
    playerDamage()
    playerDeath()
}




