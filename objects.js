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

        this.registers = {
            "a": "00000000",
            "b": "00000000",
            "c": "00000000",
            "f": "00000000",
            "pc": "00000000",
            "hl": "00000000",
            "opcode": "0000",
            "operand": "00000000"
        };

        this.instructions = [];
        this.machineCode = Array(256).fill('000000000000');;
        this.ram = Array(256).fill('00000000');
    }
}