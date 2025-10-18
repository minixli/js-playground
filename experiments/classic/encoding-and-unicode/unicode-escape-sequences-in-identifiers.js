// Use special characters in identifiers, this would print "1".
var 𠜎 = 1;
console.log(𠜎);

// This would print "𠜎".
console.log("\ud841\udf0e");

// This would cause an error, cuz only 16-bit codepoint could be
// used in identifiers.
// var \ud841\udf0e = 1;

// Enter <C-v>u{00e9} in Vim's insert mode to get character é. 
var é = 2;  // same as `var \u00e9 = 2;`
// This would print "2".
console.log(é);

// Enter <C-v>u{0065}<C-v>u{0301} in Vim's insert mode to get character é. 
var é = 3;  // same as `var \u0065\u0301 = 3`
// This would print "3".
console.log(é);

// This would print "2".
console.log(\u00e9);
// This would print "3".
console.log(\u0065\u0301);
