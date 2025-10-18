var acc = { $i: 0 };

acc.__defineGetter__('i', function() { return this.$i++; });
acc.__defineSetter__('i', function() {  this.$i = num; });

console.log(acc.__lookupGetter__('i'));
console.log(acc.__lookupSetter__('i'));

console.log(acc.i);
console.log(acc.i);
console.log(acc.i);
