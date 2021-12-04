var numberOfGridSquares = 32;

var gridSize;

var selectedAutomaton = -1;
var automatons = [{x:0, y:0}];

var walls = [
    {x:15, y:15},
    {x:15, y:16},
    {x:16, y:15},
    {x:16, y:16}
];

function setup() {
	var cnv = createCanvas(600, 600);
	cnv.parent("cnv");
    gridSize = width/32;
}

function draw() {
    clear();
    drawGrid();
    drawWalls();
    drawAutomatons();
}

function mouseClicked() {
    var clickedGridX = parseInt(mouseX / gridSize);
    var clickedGridY = parseInt(mouseY / gridSize);
    if (checkClickedLocation(clickedGridX, clickedGridY) == "none") {
        automatons.push({x:clickedGridX, y:clickedGridY});
    }
}

function checkClickedLocation(x, y) {
    for (var i = 0; i < automatons.length; i++) {
        if (automatons[i].x == x && automatons[i].y == y) {
            selectedAutomaton = i;
            return "automaton";
        }
    }
    selectedAutomaton = -1;
    for (var i = 0; i < walls.length; i++) {
        if (walls[i].x == x && walls[i].y == y) {
            return "wall";
        }
    }
    return "none";
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

function drawAutomatons() {
    for (var i = 0; i < automatons.length; i++) {
        fill(221, 160, 221);
        if (selectedAutomaton == i) {
            fill(255, 0, 0);
        }
        rect(automatons[i].x * gridSize, automatons[i].y * gridSize, gridSize, gridSize);
    }
}