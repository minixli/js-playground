function A() {
  return inherit(A.methods);
}

A.methods = {
  m: function() { console.log('m be invoked'); }
}

function inherit(methods) {
  function f() {}
  f.prototype = methods;
  console.log(f.prototype.__proto__.constructor);
  return new f();
}

var a = new A();
a.m();
console.log(a instanceof Object);
console.log(a.constructor === Object.prototype.constructor);
