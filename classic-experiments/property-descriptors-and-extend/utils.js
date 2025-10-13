function extend(o, p) {
  for (prop in p) {
    o[prop] = p[prop];
  }
  return o;
}

exports.extend = extend;
