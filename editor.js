function loadAutomaton(automatron) {
    document.getElementById("iRegister").value = automatron.iRegister;
    document.getElementById("oRegister").value = automatron.oRegister;
    document.getElementById("fRegister").value = automatron.fRegister;
    document.getElementById("code").value = automatron.instructions;
}