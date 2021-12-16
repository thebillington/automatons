function binaryStringToDenary(binary) {
    var total = 0;
    var currentColumn = 1;
    for (var i = binary.length - 1; i > -1; i--) {
        if (binary[i] == "1") total += currentColumn;
        currentColumn *= 2;
    }
    return total;
}


function denaryToBinaryString(denary) {
    var binary = "";
    var currentColumn = 128;
    for (var i = 0; i < 8; i++) {
        if (denary >= currentColumn) {
            binary += "1";
            denary -= currentColumn;
        } else {
            binary += "0";
        }
        currentColumn /= 2;
    }
    return binary;
}