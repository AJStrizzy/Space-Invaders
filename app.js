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

const ship = document.createElement("img");



class Player {
    constructor(x, y, img, width, height) {
        this.x = width/2
        this.y = height - 20
        this.img = img
        this.width = width
        this.height = height
        this.alive = true
    }

    render() {

    }
}