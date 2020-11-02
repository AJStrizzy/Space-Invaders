const shipImg = "Ship1.jpg";
const healthDisplay = document.getElementById("game-lives");
const score = document.getElementById("game-score");
const startButton = document.getElementById("game-start");
const game = document.getElementById("game");

const computedStyle = getComputedStyle(game);
const height = computedStyle.height;
const width = computedStyle.width;
// game.height = height.replace('px', '');
// game.width = width.replace('px', '');

const ctx = game.getContext('2d');

// const ship = document.createElement("img");




class Sprite {
    constructor(x, y, color, width, height) {
        this.x = x
        this.y = y
        this.color = color
        this.width = width
        this.height = height
        this.alive = true
    }

    render() {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
}

const player = new Sprite(143, 120, 'white', 15, 15)
console.log(player)

document.getElementById('game-start').addEventListener('click', function() {
    player.render();
    setInterval(rePaint, 1000/200)
})

document.addEventListener('keyup', function(evt){
    if (evt.key === 'd' && player.x < 284){
        player.x += 10
    } else if (evt.key === 'a' && player.x > 3) {
        player.x -= 10
    }
    console.log(player)
})


function rePaint() {
    ctx.clearRect(0, 0, game.width, game.height)

    player.render()
    
}

 //60 fps
   