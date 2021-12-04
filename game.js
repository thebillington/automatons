var numberOfGridSquares = 32;

var gridSize;

var walls = [
    {x:15, y:15},
    {x:15, y:16},
    {x:16, y:15},
    {x:16, y:16}
];

function setup() {
    createCanvas(800, 800);
    gridSize = width/32;
}

function draw() {
    clear();
    drawGrid();
    drawWalls();
}

function drawGrid() {
    for (var i = 0; i <= numberOfGridSquares; i++) {
        line(gridSize * i, 0, gridSize * i, height);
        line(0, gridSize * i, width, gridSize * i);
    }
}

function drawWalls() {
    for (var i = 0; i < walls.length; i++) {
        fill(0);
        rect(walls[i].x * gridSize, walls[i].y * gridSize, gridSize, gridSize);
    }
}