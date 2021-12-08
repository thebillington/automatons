function loadLineNumbers() {
    var nums = "";
    for (var i = 1; i <= 256; i++) {
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
    document.getElementById("code").value = automaton.instructions;
}