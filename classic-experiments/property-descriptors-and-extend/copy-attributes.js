var extend = require('./utils.js').extend;

var p = Object.defineProperties({}, {
  i: { value: 1, writable: false, configurable: false, enumerable: true }
});
var o = extend({}, p);

console.log(Object.getOwnPropertyDescriptor(p, 'i'));
console.log(Object.getOwnPropertyDescriptor(o, 'i'));
