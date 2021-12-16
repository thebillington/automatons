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

        this.stack = [];

        this.instructions = [];
        this.machineCode = Array(256).fill('000000000000');;
        this.ram = Array(256).fill('00000000');
    }

    updateRegisters() {
        this.ram[247] = this.registers["a"];
        this.ram[248] = this.registers["b"];
        this.ram[249] = this.registers["c"];
        this.ram[250] = this.registers["f"];
        this.ram[251] = this.registers["pc"];
        this.ram[252] = this.registers["hl"];
    }

    fetchDecode() {
        var pc = binaryStringToDenary(this.registers["pc"]);
        var instruction = this.machineCode[pc];
        this.registers["opcode"] = instruction.substring(0,4);
        this.registers["operand"] = instruction.substring(4,instruction.length);
        this.registers["pc"] = denaryToBinaryString(pc + 1);
    }

    execute() {
        this.updateRegisters();
        if (this.registers["opcode"] == "0000") {
            // NOP
        } else if (this.registers["opcode"] == "0001") { // LDA
            if (validRegisterMemoryMap.includes(this.registers["operand"])) {
                this.registers["a"] = this.registers[memoryRegisterMap[this.registers["operand"]]];
            } else {
                if (binaryStringToDenary(this.registers["operand"]) > 253) {
                    this.registers["operand"] = this.registers["hl"];
                }
                this.registers["a"] = this.ram[binaryStringToDenary(this.registers["operand"])];
            }
        } else if (this.registers["opcode"] == "0010") { // STA
            if (validRegisterMemoryMap.includes(this.registers["operand"])) {
                this.registers[memoryRegisterMap[this.registers["operand"]]] = this.registers["a"];
            }
            if (binaryStringToDenary(this.registers["operand"]) > 253) {
                this.registers["operand"] = this.registers["hl"];
            }
            this.ram[binaryStringToDenary(this.registers["operand"])] = this.registers["a"];
        } else if (this.registers["opcode"] == "0011") { // PUSH
            this.stack.push(this.registers["a"]);
            this.registers["a"] = "00000000";
        } else if (this.registers["opcode"] == "0100") { // POP
            this.registers["a"] = this.stack.pop();
        } else if (this.registers["opcode"] == "0101") { // ADD
            var a = -1;
            var operand = -1;
            if (validRegisterMemoryMap.includes(this.registers["operand"])) {
                a = binaryStringToDenary(this.registers["a"]);
                operand = binaryStringToDenary(this.registers[memoryRegisterMap[this.registers["operand"]]]);
            } else {
                if (binaryStringToDenary(this.registers["operand"]) > 253) {
                    this.registers["operand"] = this.registers["hl"];
                }
                a = binaryStringToDenary(this.registers["a"]);
                operand = binaryStringToDenary(this.ram[binaryStringToDenary(this.registers["operand"])]);
            }
            var sum = a + operand;
            sum = sum % 256;
            this.registers["a"] = denaryToBinaryString(sum);
        } else if (this.registers["opcode"] == "0110") { // SUB
            if (validRegisterMemoryMap.includes(this.registers["operand"])) {
                a = binaryStringToDenary(this.registers["a"]);
                operand = binaryStringToDenary(this.registers[memoryRegisterMap[this.registers["operand"]]]);
            } else {
                if (binaryStringToDenary(this.registers["operand"]) > 253) {
                    this.registers["operand"] = this.registers["hl"];
                }
                a = binaryStringToDenary(this.registers["a"]);
                operand = binaryStringToDenary(this.ram[binaryStringToDenary(this.registers["operand"])]);
            }
            var sum = a - operand;
            while (sum < 0) sum += 256;
            this.registers["a"] = denaryToBinaryString(sum);
        } else if (this.registers["opcode"] == "0111") { // INC
            
        } else if (this.registers["opcode"] == "1000") { // DEC
            
        } else if (this.registers["opcode"] == "1001") { // AND
            
        } else if (this.registers["opcode"] == "1010") { // OR
            
        } else if (this.registers["opcode"] == "1011") { // XOR
            
        } else if (this.registers["opcode"] == "1100") { // JMP
            this.registers["pc"] = this.registers["operand"];
        } else if (this.registers["opcode"] == "1101") { // JZ
            if (this.registers["a"] == "00000000") {
                this.registers["pc"] = this.registers["operand"];
            }
        } else if (this.registers["opcode"] == "1110") { // LSL
            
        } else if (this.registers["opcode"] == "1111") { // LSR
            
        }
    }
}