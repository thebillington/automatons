class Wall {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

const memoryRegisterMap = {
    "11110111":"a",
    "11111000":"b",
    "11111001":"c",
    "11111010":"f",
    "11111011":"pc",
    "11111100":"hl"
};

const validRegisterMemoryMap = [
    "11110111",
    "11111000",
    "11111001",
    "11111010",
    "11111011",
    "11111100"
];

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

    fetchDecode() {
        var pc = binaryStringToDenary(this.registers["pc"]);
        var instruction = this.machineCode[pc];
        this.registers["opcode"] = instruction.substring(0,4);
        this.registers["operand"] = instruction.substring(4,instruction.length);
        this.registers["pc"] = denaryToBinaryString(pc + 1);
    }

    execute() {
        // LDA
        if (this.registers["opcode"] == "0001") {
            // Check if the operand relates to a register
            if (validRegisterMemoryMap.includes(this.registers["operand"])) {
                this.registers["a"] = this.registers[memoryRegisterMap[this.registers["operand"]]];
            } else {
                if (binaryStringToDenary(this.registers["operand"]) > 253) {
                    this.registers["operand"] = this.registers["hl"];
                }
                this.registers["a"] = this.ram[binaryStringToDenary(this.registers["operand"])];
            }
        }
    }
}