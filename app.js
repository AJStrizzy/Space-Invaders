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
const healthSound = document.getElementById("healthsound")
const boostUpSound = document.getElementById('boostup')
const boostDownSound = document.getElementById("boostdown")
const bossSound = document.getElementById('bossSound')


// fix button glitch after beating boss
let bossShooting = 1
let alienRender = 1
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

const boostImage = document.getElementById('boostboost')
const heartImage = document.getElementById('heart')
const image1 = document.getElementById('user');
const image2 = document.getElementById('enemy1');
const image3 = document.getElementById('enemy2')
const image4 = document.getElementById('enemy3')
const image5 = document.getElementById('enemy4')
const image6 = document.getElementById('enemy5')
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
let alienImage = image2

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
    if (gmLive === 1) {
        setInterval(fire, alienFireRate) 
    setInterval(health, 15000)
    setInterval(boost, 23000)
    }
    }



function reset() {
    clearInterval(interval)
    alienFireRate = 1300
    bossHealth = 20
    bossShooting = 1
    alienImage = image2
    alienSpeed = .50
    gmLive = 1
    winSoundCheck = 1
    level = 1
    alienBulletHeight = 8
    alienBulletWidth = 3
    alienBulletX = 14
    alienBulletY = 12
    alienWidth = 33
    alienHeight = 17
    changeDirectionx1 = 490
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
    if(level === 1) {
        alienImage = image3
    } else if (level === 2) {
        alienImage = image4 
    } else if( level ===3) {
        alienImage = image5
    }
        
        
    
    
    gmLive = 1
    winSoundCheck = 1
    player.alive = true
    player.yspeed = 0
    player.x = 247
    player.y = 350
    alienSpeed += .15
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
            col * 45 + 46, row * 27 + 25, 35,20
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
   
    alienImage = image6
    gameWinSound.pause()
    gmLive = 1
    winSoundCheck = 1
    player.alive = true
    player.yspeed = 0
    player.x = 247
    player.y = 350
    startButton.innerHTML = "Final Level"
    alienFireRate = 250
    alienBulletHeight = 24
    alienBulletWidth = 10
    alienBulletX = 160
    alienBulletY = 160
    alienWidth = 350
    alienHeight = 185
    alienSpeed = 2
    changeDirectionx1 = 205
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
    bossHealth = 20
    alienImage = image2
    bossShooting = 1
    startScore = 0
    alienSpeed = .50
    gmLive = 1
    winSoundCheck = 1
    level = 1
    alienBulletHeight = 8
    alienBulletWidth = 3
    alienBulletX = 14
    alienBulletY = 12
    alienWidth = 33
    alienHeight = 17
    changeDirectionx1 = 490
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
        ctx.drawImage(alienImage, this.x -= this.speed,  this.y -= this.yspeed, this.width, this.height) 
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
        if (gmLive === 1 && bossHealth > 0) {
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
        score.innerHTML = "Level Clear!"
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
    if (evt.key === 'a' && fireStatus === true && gmLive === 1 && bossShooting === 1|| evt.key === 'A' && fireStatus === true && gmLive === 1 && bossShooting === 1) {
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
function bssSound() {
    bossSound.play()
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
                    && arrBullets[b].y + 17 > arrAliens[a].y && level === 5 && bossHealth > 0) {
                    bossHealth -= 1
                    alienRender = 0
                    setTimeout(alienRenderBack, 40)
                    arrBullets.splice(b,1)
                    startScore += points
                    enemyHitSound.pause()
                    setTimeout(alienSound, 50)
                    } else if (arrBullets[b].x < arrAliens[a].x + 350
                        && arrBullets[b].x + 3.5 > arrAliens[a].x
                        && arrBullets[b].y < arrAliens[a].y + 185
                        && arrBullets[b].y + 17 > arrAliens[a].y && level === 5 && bossHealth <= 0) {
                        bossShooting = 0    
                        alienRender = 0
                        arrBullets.splice(b,1)
                        alienSpeed *= -1
                        startScore += points


                        setTimeout(alienRenderBack, 40)
                        setTimeout(bossAnimation, 80)
                        setTimeout(alienRenderBack, 120)
                        setTimeout(bossAnimation, 160)
                        setTimeout(alienRenderBack, 200)
                        setTimeout(bossAnimation, 240)
                        setTimeout(alienRenderBack, 280)
                        setTimeout(bossAnimation, 320)
                        setTimeout(alienRenderBack, 360)
                        setTimeout(bossAnimation, 400)
                        setTimeout(alienRenderBack, 440)
                        setTimeout(bossAnimation, 480)
                        setTimeout(alienRenderBack, 520)
                        setTimeout(bossAnimation, 560)
                        setTimeout(alienRenderBack, 600)
                        setTimeout(bossAnimation, 640)
                        setTimeout(alienRenderBack, 680)
                        setTimeout(bossAnimation, 720)
                        setTimeout(alienRenderBack, 760)
                        setTimeout(bossAnimation, 800)
                        setTimeout(alienRenderBack, 840)
                        setTimeout(bossAnimation, 880)
                        setTimeout(alienRenderBack, 920)
                        setTimeout(bossAnimation, 960)
                        setTimeout(alienRenderBack, 1000)
                        setTimeout(alienRenderBack, 1040)
                        setTimeout(bossAnimation, 1080)
                        setTimeout(alienRenderBack, 1120)
                        setTimeout(bossAnimation, 1160)
                        setTimeout(alienRenderBack, 1200)
                        setTimeout(bossAnimation, 1240)
                        setTimeout(alienRenderBack, 1280)
                        setTimeout(bossAnimation, 1320)
                        setTimeout(alienRenderBack, 1360)
                        setTimeout(bossAnimation, 1400)
                        setTimeout(alienRenderBack, 1440)
                        setTimeout(bossAnimation, 1480)
                        setTimeout(alienRenderBack, 1520)
                        setTimeout(bossAnimation, 1560)
                        setTimeout(alienRenderBack, 1600)
                        setTimeout(bossAnimation, 1640)
                        setTimeout(alienRenderBack, 1680)
                        setTimeout(bossAnimation, 1720)
                        setTimeout(alienRenderBack, 1760)
                        setTimeout(bossAnimation, 1800)
                        setTimeout(alienRenderBack, 1840)
                        setTimeout(bossAnimation, 1880)
                        setTimeout(alienRenderBack, 1920)
                        setTimeout(bossAnimation, 1960)
                        setTimeout(alienRenderBack, 2000)

                        setTimeout(bossDefeat, 2040)
                        setTimeout(bssSound, 2040)
                        setTimeout(gameWinStatus, 2040)
                        }
            }
        }
    }
    function bossAnimation() {
        alienRender = 0
    }
    function alienRenderBack() {
        alienRender = 1
    }
    function bossDefeat() {
        arrAliens.splice(0,1)
    }
    function gameWinStatus() {
        levelStatus = "Play Again"
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
const arrBoost = []
class Boosts {
    constructor(x, y, width, height) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.alive = true
        this.speed = 1
    }
    
    render() {
        ctx.drawImage(boostImage, this.x,  this.y += this.speed, this.width, this.height) 
    }

}
function boost() {
const randBoost = 5 + (parseInt(Math.random() * 490))

    const boost = new Boosts(randBoost, 0, 17,17)       
        if (gmLive === 1) {
            arrBoost.push(boost)
        }
    }





const arrHearts = []
class Hearts {
    constructor(x, y, width, height) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.alive = true
        this.speed = 1
    }
    
    render() {
        ctx.drawImage(heartImage, this.x,  this.y += this.speed, this.width, this.height) 
    }

}
function health() {
const randHeart = 5 + (parseInt(Math.random() * 490))

    const heart = new Hearts(randHeart, 0, 17,17)       
        if (gmLive === 1) {
            arrHearts.push(heart)
        }
    }

function healthUp() {
    for(a = 0; a < arrHearts.length; a++) {
        if(player.x < arrHearts[a].x + 17 
             && player.x + player.width > arrHearts[a].x
             && player.y + player.height > arrHearts[a].y 
             && player.y < arrHearts[a].y + 17) {
            if(player.alive === true && gmLive === 1 && playerHealth < 3) {
                playerHealth += 1 }
             if (playerHealth === 3 && gmLive === 1) {
                healthDisplay.innerHTML = "❤ ❤ ❤"
                healthSound.play()
             } else if (playerHealth === 2 && gmLive ===1) {
                healthDisplay.innerHTML = "❤ ❤"
                healthSound.play()
             }
             arrHearts.splice(a,1)
             if(player.alive === true && playerHealth >= 1 && gmLive === 1) {
                 player.alive = false
             setTimeout(damageAnimation, 120) 
            }
        }
    }
}

function boostSound() {
    boostDownSound.play()
}

function boostUp() {
    for(a = 0; a < arrBoost.length; a++) {
        if(player.x < arrBoost[a].x + 17 
             && player.x + player.width > arrBoost[a].x
             && player.y + player.height > arrBoost[a].y 
             && player.y < arrBoost[a].y +17) {
                arrBoost.splice(a,1)
                playerFireRate = 0
                setTimeout(speedUp, 5000)
                boostUpSound.play()
                setTimeout(boostSound, 5000)
                if(player.alive === true && playerHealth >= 1 && gmLive === 1) {
                    player.alive = false
                setTimeout(damageAnimation, 120) 
                }
            }
        }
    }

function speedUp() {
    playerFireRate = 350
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
    if(arrAliens !== 0 && alienRender === 1) {
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
    if(arrHearts !== 0) {
        arrHearts.forEach(function (par){
            par.render()
        })
    }

    if(arrBoost !== 0) {
        arrBoost.forEach(function (par){
            par.render()
        })
    }

    
    

    healthUp()
    boostUp()
    bulletBoundaries()
    boundaries()
    changeDirection()
    alienBoom()
    scoreUpdate()
    playerBoom()
    playerDamage()
    playerDeath()
}




