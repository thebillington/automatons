function loadLineNumbers() {
    var nums = "";
    for (var i = 0; i < 256; i++) {
        nums += `${i}\n`;
    }
    document.getElementById("instructions-editor").value = nums;
    document.getElementById("ram-editor").value = nums;
}

function loadAutomaton(automaton) {
    document.getElementById("a").value = automaton.registers["a"];
    document.getElementById("b").value = automaton.registers["b"];
    document.getElementById("c").value = automaton.registers["c"];
    document.getElementById("f").value = automaton.registers["f"];
    document.getElementById("hl").value = automaton.registers["hl"];
    document.getElementById("pc").value = automaton.registers["pc"];
    document.getElementById("opcode").value = automaton.registers["opcode"];
    document.getElementById("operand").value = automaton.registers["operand"];

    var instructions = "";
    var machineCode = "";
    for (var i = 0; i < automaton.instructions.length; i++) {
        if (automaton.instructions[i] == '') continue;
        instructions += `${automaton.instructions[i]}\n`;
        machineCode += `${automaton.machineCode[i]}\n`;
    }
    document.getElementById("code").value = instructions;
    document.getElementById("assembled").value = machineCode;
}