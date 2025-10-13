var o = {
  'primitive': {
    'undefined': undefined,
    'null': null,
    'boolean': true,
    'string': ['', '0', 'Hello, JS!'],
    'number': [ 0, 1, -1, NaN, Infinity, -Infinity ]
  },
  'object': {
    'Date': new Date,
    'Function': new Function,
    'RegExp': new RegExp,
    'Error': new Error
  }
};

var serialized = JSON.stringify(o);
console.log(serialized);

var restored = JSON.parse(serialized);
console.log(restored);
