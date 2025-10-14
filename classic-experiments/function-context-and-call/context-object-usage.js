var valuemap = {
  map: {
    'u': undefined,
    'n': null,
    't': true,
    'f': false,
    '#1': 1,
    '"Hi, JS!': 'Hi, JS!',
    '@100': {}
  }
};

valuemap.foreach = function(f, ctx) {
  for (var s in this.map)
    f.call(ctx, this.map[s]);
}

var values = [];
valuemap.foreach(function(v) {
  this.push(v);
}, values);

console.log(values);
