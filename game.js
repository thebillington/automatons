var numberOfGridSquares = 32;

var gridSize;

var selectedAutomaton = -1;
var automatons = [
    new Automaton(0, 0),
];

var walls = [
    new Wall(15, 15),
    new Wall(15, 16),
    new Wall(16, 15),
    new Wall(16, 16),
];

function setup() {
	var cnv = createCanvas(600, 600);
	cnv.parent("cnv");
    cnv.mouseClicked(mouseClickedOnCanvas);
    gridSize = width/32;
    selectAutomaton(0);
}

function draw() {
    clear();
    drawGrid();
    drawWalls();
    drawAutomatons();
}

function step() {
    for (var i = 0; i < automatons.length; i++) {
        automatons[i].fetchDecode();
        automatons[i].execute();
    }
    loadAutomaton(automatons[selectedAutomaton]);
}

function mouseClickedOnCanvas() {
    var clickedGridX = parseInt(mouseX / gridSize);
    var clickedGridY = parseInt(mouseY / gridSize);
    if (checkClickedLocation(clickedGridX, clickedGridY) == "none") {
        automatons.push( new Automaton(clickedGridX, clickedGridY) );
        selectAutomaton(automatons.length - 1);
    }
}

function selectAutomaton(n) {
    selectedAutomaton = n;
    loadAutomaton(automatons[n]);
}

function checkClickedLocation(x, y) {
    for (var i = 0; i < automatons.length; i++) {
        if (automatons[i].x == x && automatons[i].y == y) {
            selectAutomaton(i);
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