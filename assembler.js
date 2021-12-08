const validOpcodes = [
    "DAT",
    "NOP",
    "LDA",
    "STA",
    "PUSH",
    "POP",
    "ADD",
    "SUB",
    "INC",
    "DEC",
    "AND",
    "OR",
    "XOR",
    "JMP",
    "BRA",
    "JP",
    "BRP",
    "JZ",
    "BRZ",
    "CLF"
];

const opcodesToMachineCode = {
    "DAT":"0000",
    "NOP":"0000",
    "LDA":"0001",
    "STA":"0010",
    "PUSH":"0011",
    "POP":"0100",
    "ADD":"0101",
    "SUB":"0110",
    "INC":"0111",
    "DEC":"1000",
    "AND":"1001",
    "OR":"1010",
    "XOR":"1011",
    "JMP":"1100",
    "BRA":"1100",
    "JP":"1101",
    "BRP":"1101",
    "JZ":"1110",
    "BRZ":"1110",
    "CLF":"1111"
};

const hexToBinary = {
    "0":"0000",
    "1":"0001",
    "2":"0010",
    "3":"0011",
    "4":"0100",
    "5":"0101",
    "6":"0110",
    "7":"0111",
    "8":"1000",
    "9":"1001",
    "A":"1010",
    "B":"1011",
    "C":"1100",
    "D":"1101",
    "E":"1110",
    "F":"1111"
};

function assemble() {
    var machineCode = Array(256).fill('000000000000');;
    var input = document.getElementById("code").value.split("\n");
    var hasErrors = false;
    var error = "";
    var errorLine = -1;
    for (var i = 0; i < input.length; i++) {
        if (input[i] == "") continue;
        if (input[i].includes(";")) {
            if (input[i][0] == ";") continue;
            input[i] = input[i].split(" ;"[0]);
        }
        var components = input[i].split(" ");
        if (components.length != 1 && components.length != 2) {
            error = `ERROR ON LINE ${i + 1}`;
            hasErrors = true;
            errorLine = i;
            break;
        }
        var opcode = components[0];
        var operand = components[1];
        if (validOpcodes.includes(opcode)) {
            if (opcode == "NOP" || opcode == "CLF" || opcode == "PUSH" || opcode == "POP") {
                machineCode[i] = opcodesToMachineCode[opcode] + "00000000";
                continue;
            } else if (opcode == "DAT") {
                if (operand[0]  == "%") {
                    var binaryString = "";
                    for (var j = 1; j < operand.length; j++) {
                        binaryString += operand[j];
                    }
                    console.log(binaryString);
                    if (!RegExp("[01]{8}").test(binaryString)) {
                        error = `ERROR ON LINE ${i + 1}: Provided data must be 8-bit Binary (e.g %00110010) or 2 digit Hex (e.g #7F)`;
                        hasErrors = true;
                        errorLine = i;
                        break;
                    } else {
                        machineCode[i] = opcodesToMachineCode[opcode] + binaryString;
                    }
                } else if (operand[0] == "#") {
                    var hexString = "";
                    for (var j = 1; j < operand.length; j++) {
                        hexString += operand[j];
                    }
                    if (!RegExp("[0123456789ABCDEF]{2}").test(hexString)) {
                        error = `ERROR ON LINE ${i + 1}: Provided data must be 8-bit Binary (e.g %00110010) or 2 digit Hex (e.g #7F)`;
                        hasErrors = true;
                        errorLine = i;
                        break;
                    } else {
                        machineCode[i] = opcodesToMachineCode[opcode] + hexToBinary[hexString[0]] + hexToBinary[hexString[1]];
                    }
                } else {
                    error = `ERROR ON LINE ${i + 1}: Provided data must be 8-bit Binary (e.g %00110010) or 2 digit Hex (e.g #7F)`;
                    hasErrors = true;
                    errorLine = i;
                    break;
                }
            }
        } else {
            error = `ERROR ON LINE ${i + 1}: ${opcode} is not a valid OPCODE`;
            hasErrors = true;
        }
    }
    if (!hasErrors) {
        automatons[selectedAutomaton].instructions = document.getElementById("code").value.split("\n");
        automatons[selectedAutomaton].machineCode = machineCode;
        console.log(machineCode);
        loadAutomaton(automatons[selectedAutomaton]);
    } else {
        console.log(error);
    }
}