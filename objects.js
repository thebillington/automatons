class Wall {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Automaton {
    constructor(x, y) {
        this.x = x;
        this.y = y;

        this.iRegister = "0000";
        this.oRegister = "0000";
        this.fRegister = "0000";

        this.instructions = "";
    }
}