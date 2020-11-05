const healthDisplay = document.getElementById("game-lives");
const score = document.getElementById("game-score");
const startButton = document.getElementById("game-start");
const game = document.getElementById("game");


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

const left = 'left';
const right = 'right';


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





const arrAliens = [];
for (let row = 0; row < 5; row++) {
    for(let col = 0; col < 9; col++) {
        const alien = new Aliens (
            col * 25 + 46, row * 13 + 7, 18, 8
        )
        arrAliens.push(alien)
    }
}

// const leftAlien = 40;
// arrAliens.forEach(function (place) {
// if (place.x < leftAlien) {
//     leftAlien.push(place)
//     }
// })

// console.log (leftAlien.x)
// const rightAlien = [0];
// arrAliens.forEach(function (place) {
// if (place.x > rightAlien) {
//     rightAlien.push(place)
//     }
// })

// console.log(rightAlien.x)
// function changeDirection () {
//     if (leftAlien.x <= 5) {
//         arrAliens.speed *= -1 && arrAliens.y + 5
//     } else if (rightAlien.x >= 70) {
//             arrAliens.speed *= -1 && arrAliens.y + 5
//      }
// }



// console.log(rightAlien)


// function changeDir () {
//     for (var i = 0; i <= arrAliens.length; i++)
//     if (arrAliens[i].x > 60) {
//         console.log(arrAliens[i].x)
//         arrAliens.speed *= -1
//     } else if (arrAliens[i].x < 5) {
//         arrAliens.speed *= -1
//     }
// }

function changeDirection () {
    arrAliens.forEach(function(alien) {
    if (alien.x >= 265) {
        arrAliens.forEach(function(a) {
            a.speed *= -1
        }) } else if (alien.x <= 20) {
        arrAliens.forEach(function(a) {
            a.speed *= -1
    }) }
})
}

// function changeD () {
//     arrAliens.forEach(function(alien) {
//     if (alien.x >= 265) {
//         alien.y += .01
//     } else if (alien.x <= 20) {
//        alien.y += .01
//     }
// })
// }









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

const player = new Sprite(138, 128, 24, 16)



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

const arrBullets = [];
document.addEventListener('keydown', function(evt) {
    if (evt.key === 'a') {
        const bullet = new Bullets(player.x - 1 + (player.width/2), player.y - 5, 'white', 2, 6)
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


function rePaint() {
    ctx.clearRect(0, 0, game.width, game.height)

    player.render()
    arrAliens.forEach(function (par){
        par.render()
    })
    
    

   
    arrBullets.forEach(function (par) {
        par.render()
    })

    changeDirection()

    
}