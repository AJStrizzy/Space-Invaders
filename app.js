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


const alien = new Aliens(140, 10, 20, 20)



// const arrAliens = [];
// for (let row = 0; row < 3; row++) {
//     for(let col = 0; col < 4; col++) {
//         const alien = new Aliens ({
//             x: col * 20,
//             y: row * 20,
//         })
//         arrAliens.push[alien]
//     }
// }




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

document.getElementById('game-start').addEventListener('click', function() {
    player.render();
    alien.render()
    setInterval(rePaint, 1000/500)
})



document.addEventListener('keydown', function(evt) {
    if (evt.key === 'ArrowRight' && player.x < 270){
        player.x += 10
    } else if (evt.key === 'ArrowLeft' && player.x > 6) {
        player.x -= 10
    } else if (evt.keyCode === 32) {
    console.log("shoot")
    }
})


function rePaint() {
    ctx.clearRect(0, 0, game.width, game.height)

    player.render()
    alien.render()
    
}


   