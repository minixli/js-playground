printCharLen("é");    // UTF-16 encoding: 00E9
printCharLen("é");    // UTF-16 encoding: 0065 0301
printCharLen("𝑒");    // UTF-16 encoding: D835 DC52
printCharLen("笑");   // UTF-16 encoding: 7B11
printCharLen("𠜎");   // UTF-16 encoding: D841 DF0E

function printCharLen(c) {
  console.log("length of character " + c + ": " + c.length);
}
